import { CountryAdministrativeData } from '../../types/geo';
import { japanData } from './japan';
import { usaData } from './usa';
import { ukData } from './uk';
import { germanyData } from './germany';
import { franceData } from './france';
import { italyData } from './italy';
import { canadaData } from './canada';

// 韓国 (southKorea.ts, public/data/south-korea.json) は第2階層が未完成のため未登録。
// 17市道の整備後に再登録する。
export const COUNTRIES: Record<string, CountryAdministrativeData> = {
  japan: japanData,
  usa: usaData,
  uk: ukData,
  germany: germanyData,
  france: franceData,
  italy: italyData,
  canada: canadaData,
};

export const COUNTRY_LIST: { id: string; name: string; flag: string; continent: string; isG7: boolean }[] = [
  { id: 'japan', name: '日本 (Japan)', flag: '🇯🇵', continent: 'アジア', isG7: true },
  { id: 'usa', name: 'アメリカ合衆国 (USA)', flag: '🇺🇸', continent: '北米', isG7: true },
  { id: 'uk', name: 'イギリス (UK)', flag: '🇬🇧', continent: 'ヨーロッパ', isG7: true },
  { id: 'germany', name: 'ドイツ (Germany)', flag: '🇩🇪', continent: 'ヨーロッパ', isG7: true },
  { id: 'france', name: 'フランス (France)', flag: '🇫🇷', continent: 'ヨーロッパ', isG7: true },
  { id: 'italy', name: 'イタリア (Italy)', flag: '🇮🇹', continent: 'ヨーロッパ', isG7: true },
  { id: 'canada', name: 'カナダ (Canada)', flag: '🇨🇦', continent: '北米', isG7: true },
];

export function getCountryData(id: string): CountryAdministrativeData {
  return COUNTRIES[id] || COUNTRIES['japan'];
}

