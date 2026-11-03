import fuaSelected from './fua-selected.json';
import { COUNTRIES, COUNTRY_LIST } from './countries';

/** 都市圏比較の対象（GHS-FUA R2019A のうち、第3階層の基準 R3 に該当する FUA） */
export interface MetroArea {
  fuaId: number;
  /** 画面に出す名称（日本語） */
  label: string;
  /** GHSL 上の名称（原データのまま） */
  ghslName: string;
  countryId: string;
  countryName: string;
  flag: string;
  /** 代表都市（第3階層）の ID と座標 [lon, lat] */
  cityId: string;
  cityCoordinates: [number, number];
  population: number;
  areaKm2: number;
  /** 人口密度（人/km²） */
  density: number;
  coreOnlyPopulation: number;
  coreOnlyAreaKm2: number;
  commutingPopulation: number;
  /** 順位（1 が最大） */
  populationRank: number;
  populationRankInCountry: number;
  areaRank: number;
  densityRank: number;
  /** 利用上の注意 */
  note?: string;
}

interface FuaRow {
  id: number;
  name: string;
  iso: string;
  fuaPop2015: number;
  fuaAreaKm2: number;
  ucPop2015: number;
  ucAreaKm2: number;
  commutingPop2015: number;
}

/**
 * 名称・注記の補正。GHSL は、複数の都市を統合した FUA に主要都市の名前を付けるほか、
 * 国境をまたぐ FUA を片側の国に割り当てる。誤解を招くものだけ上書きする。
 */
const OVERRIDES: Record<number, { label?: string; note?: string }> = {
  5129: { label: '東京圏', note: '東京・横浜・川崎・さいたま・千葉などが連続した都市圏。' },
  3956: { label: '京阪神（大阪・京都・神戸）', note: 'GHSL では「Osaka [Kyoto]」。大阪・京都・神戸などを一体とした都市圏。' },
  4532: { label: '名古屋圏' },
  5005: { label: '高崎・前橋', note: 'GHSL では「Takasaki [Maebashi]」。複数の都市の統合。' },
  4367: { label: '大津・守山（滋賀）', note: 'GHSL では「Moriyama [Otsu]」。' },
  7244: { label: 'ニューヨーク大都市圏' },
  6433: { label: 'ミネアポリス・セントポール', note: 'GHSL では「Minneapolis [Saint Paul]」。双子都市の統合。' },
  1255: { label: 'サンフランシスコ・ベイエリア', note: 'GHSL 上の名称は「San Jose」。サンフランシスコ、オークランド、サンノゼなどを含む。' },
  536: { label: 'ライン・ルール（ドルトムント）', note: 'GHSL では「Dortmund」。デュースブルク、エッセン、ボーフムなどが連続したライン・ルール地域を、1 つの都市圏として扱っている。' },
  3454: { label: 'ヴェネツィア本土部（メストレ）', note: 'GHSL では「Mestre」。ヴェネツィア市（コムーネ）の本土側にあたる。' },
  2204: { label: 'サンディエゴ', note: 'GHSL では「Tijuana」。メキシコのティファナと一体の越境都市圏のうち、米国側。' },
  1996: { label: 'ウィンザー（オンタリオ州）', note: 'GHSL では「Detroit」。米国デトロイトと一体の越境都市圏のうち、カナダ側。' },
};

function rank(values: number[], v: number): number {
  return values.filter((x) => x > v).length + 1;
}

function build(): MetroArea[] {
  const reps = new Map<number, { cityId: string; name: string; coordinates: [number, number]; countryId: string }>();
  for (const [countryId, c] of Object.entries(COUNTRIES)) {
    for (const sub of c.subDivisions) {
      for (const m of sub.municipalities) {
        if (m.fuaId !== undefined) reps.set(m.fuaId, { cityId: m.id, name: m.name, coordinates: m.coordinates, countryId });
      }
    }
  }
  const flags = new Map(COUNTRY_LIST.map((c) => [c.id, c]));
  const rows = fuaSelected.fuas as FuaRow[];

  const base = rows.flatMap((f) => {
    const rep = reps.get(f.id);
    if (!rep) return [];
    const country = flags.get(rep.countryId);
    const o = OVERRIDES[f.id];
    return [
      {
        fuaId: f.id,
        label: o?.label ?? `${rep.name}圏`,
        ghslName: f.name,
        countryId: rep.countryId,
        countryName: country?.name.replace(/\s*\(.*\)$/, '') ?? rep.countryId,
        flag: country?.flag ?? '',
        cityId: rep.cityId,
        cityCoordinates: rep.coordinates,
        population: f.fuaPop2015,
        areaKm2: f.fuaAreaKm2,
        density: f.fuaPop2015 / f.fuaAreaKm2,
        coreOnlyPopulation: f.ucPop2015,
        coreOnlyAreaKm2: f.ucAreaKm2,
        commutingPopulation: f.commutingPop2015,
        note: o?.note,
      },
    ];
  });

  const pops = base.map((m) => m.population);
  const areas = base.map((m) => m.areaKm2);
  const dens = base.map((m) => m.density);
  return base.map((m) => ({
    ...m,
    populationRank: rank(pops, m.population),
    populationRankInCountry: rank(base.filter((x) => x.countryId === m.countryId).map((x) => x.population), m.population),
    areaRank: rank(areas, m.areaKm2),
    densityRank: rank(dens, m.density),
  }));
}

export const METRO_AREAS: MetroArea[] = build();
export const METRO_BY_ID = new Map(METRO_AREAS.map((m) => [m.fuaId, m]));
export const METRO_SOURCE = {
  citation: 'European Commission, Joint Research Centre. GHSL: GHS-FUA R2019A（GHS_FUA_UCDB2015_GLOBE_R2019A）',
  licence: 'CC BY 4.0',
  year: 2015,
};

/** 人口を「○万人」で表す（億を超える場合は「○.○億人」） */
export function formatPopulation(n: number): string {
  if (n >= 1e8) return `${(n / 1e8).toFixed(2)}億人`;
  return `${Math.round(n / 1e4).toLocaleString()}万人`;
}
