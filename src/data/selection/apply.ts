import {
  CountryAdministrativeData,
  Municipality,
  SelectionCriterion,
  SubDivision,
} from '../../types/geo';
import fuaSelected from '../fua-selected.json';

/** 第3階層の選定レイヤー。元データ（国別 .ts）を書き換えずに、基準の適用結果を与える。 */
export interface CountrySelection {
  /** GHS-FUA の Cntry_ISO（ISO 3166-1 alpha-3） */
  iso3: string;
  /** R1: 国の首都の都市 ID */
  nationalCapital: string;
  /** R2 / R2p: 第2階層 ID → 首府（または代表都市）の都市 ID */
  capitals: Record<string, string>;
  /**
   * 首府が他の第2階層にある場合（例：インドのパンジャーブ州・ハリヤーナー州の共同首府チャンディーガルは、連邦直轄領にある）。
   * 第2階層 ID → 首府の都市 ID。都市側の基準は、本来の所属先の capitals で付与される。
   */
  sharedCapitals?: Record<string, string>;
  /** capitals のうち、制度上の首府ではなく R2p（地域内 FUA 最大）で選んだ第2階層 ID */
  representativeSubs?: string[];
  /** R3: 都市 ID → GHS-FUA の eFUA_ID（中心都市として代表させる FUA） */
  fua: Record<string, number>;
  /** 元データに無い第2階層（例：米国の連邦区） */
  subDivisionAdditions?: SubDivision[];
  /** 元データに無い都市（第2階層 ID ごと） */
  additions?: Record<string, Municipality[]>;
}

interface FuaRow { id: number; name: string; iso: string; fuaPop2015: number }
const FUA_BY_ID = new Map<number, FuaRow>((fuaSelected.fuas as FuaRow[]).map((f) => [f.id, f]));

export function applySelection(
  raw: CountryAdministrativeData,
  sel: CountrySelection,
): CountryAdministrativeData {
  const representative = new Set(sel.representativeSubs ?? []);

  const subDivisions: SubDivision[] = [
    ...raw.subDivisions,
    ...(sel.subDivisionAdditions ?? []),
  ].map((sub) => ({
    ...sub,
    municipalities: [...sub.municipalities, ...(sel.additions?.[sub.id] ?? [])].map(
      (m): Municipality => {
        const criteria: SelectionCriterion[] = [];
        const isNational = sel.nationalCapital === m.id;
        const isSubCapital = sel.capitals[sub.id] === m.id;
        if (isNational) criteria.push('R1');
        if (isSubCapital) criteria.push(representative.has(sub.id) ? 'R2p' : 'R2');
        const fuaId = sel.fua[m.id];
        const fua = fuaId !== undefined ? FUA_BY_ID.get(fuaId) : undefined;
        if (fua) criteria.push('R3');
        return {
          ...m,
          isCapital: isNational,
          isPrefecturalCapital: isSubCapital && !isNational,
          criteria,
          tier: criteria.length > 0 ? 'A' : 'B',
          ...(fua ? { fuaId: fua.id, metroPopulation: fua.fuaPop2015 } : {}),
        };
      },
    ),
  }));

  const macroRegions = raw.macroRegions.map((mr) => {
    const added = (sel.subDivisionAdditions ?? [])
      .filter((s) => s.macroRegionId === mr.id)
      .map((s) => s.id);
    return added.length ? { ...mr, subDivisionIds: [...mr.subDivisionIds, ...added] } : mr;
  });

  return { ...raw, macroRegions, subDivisions };
}
