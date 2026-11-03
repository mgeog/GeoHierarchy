import { CountryAdministrativeData, SubDivision } from '../types/geo';

/** GeoJSON の地物名と照合しうる、第2階層のキー（完全一致のみ・大文字小文字は区別しない） */
export function subDivisionKeys(sub: SubDivision): string[] {
  return [sub.name, sub.nameEn, sub.nameLocal, sub.code, sub.id, ...(sub.aliases ?? [])]
    .filter((k): k is string => Boolean(k))
    .map((k) => k.trim().toLowerCase());
}

export type FeatureIndex = Map<string, SubDivision>;

export function buildFeatureIndex(country: CountryAdministrativeData): FeatureIndex {
  const index: FeatureIndex = new Map();
  for (const sub of country.subDivisions) {
    for (const key of subDivisionKeys(sub)) {
      if (!index.has(key)) index.set(key, sub);
    }
  }
  return index;
}

/** 異なる第2階層が同じキーを持つ場合（照合が曖昧になる）を列挙する */
export function findKeyCollisions(country: CountryAdministrativeData): string[] {
  const owner = new Map<string, string>();
  const collisions: string[] = [];
  for (const sub of country.subDivisions) {
    for (const key of new Set(subDivisionKeys(sub))) {
      const prev = owner.get(key);
      if (prev && prev !== sub.id) collisions.push(`"${key}": ${prev} と ${sub.id}`);
      else owner.set(key, sub.id);
    }
  }
  return collisions;
}

/** GeoJSON 地物の properties から、対応する第2階層を引く（完全一致のみ） */
export function matchSubDivision(
  properties: Record<string, unknown> | null | undefined,
  country: CountryAdministrativeData,
  index: FeatureIndex,
): SubDivision | undefined {
  const label = properties?.[country.geoJsonNameProp ?? 'name'];
  if (label == null) return undefined;
  return index.get(String(label).trim().toLowerCase());
}
