import { CountryAdministrativeData, SubDivision } from '../types/geo';
import raw from './statistics.json';

export interface StatSource {
  agency: string;
  title: string;
  /** 基準日（ISO 8601）。公表資料に基準日が明記されない面積などは null */
  date: string | null;
  areaBasis?: 'total' | 'land';
}

interface StatUnit {
  population: number;
  areaKm2: number;
  populationSource: string;
  areaSource: string;
}

export const STAT_META = { retrieved: raw.retrieved, via: raw.via };
export const STAT_SOURCES = raw.sources as Record<string, StatSource>;
const UNITS = raw.units as Record<string, StatUnit>;

/**
 * 第2階層の人口・面積を、出典と基準日つきの統計値で置き換える。
 * 広域区分（第1階層）の人口は、所属する第2階層の合計から導出する。
 */
export function applyStatistics(country: CountryAdministrativeData): CountryAdministrativeData {
  const subDivisions: SubDivision[] = country.subDivisions.map((sub) => {
    const u = UNITS[sub.id];
    if (!u) return sub;
    return {
      ...sub,
      population: u.population,
      areaKm2: u.areaKm2,
      populationSource: u.populationSource,
      areaSource: u.areaSource,
    };
  });
  const populationBySub = new Map(subDivisions.map((s) => [s.id, s.population ?? 0]));
  const macroRegions = country.macroRegions.map((mr) => ({
    ...mr,
    population: mr.subDivisionIds.reduce((sum, id) => sum + (populationBySub.get(id) ?? 0), 0),
  }));
  return { ...country, subDivisions, macroRegions };
}
