import { CountryAdministrativeData } from '../../types/geo';
import { japanData } from './japan';
import { usaData } from './usa';
import { ukData } from './uk';
import { germanyData } from './germany';
import { franceData } from './france';
import { italyData } from './italy';
import { canadaData } from './canada';
import { applySelection } from '../selection/apply';
import { japanSelection } from '../selection/japan';
import { usaSelection } from '../selection/usa';
import { ukSelection } from '../selection/uk';
import { germanySelection } from '../selection/germany';
import { franceSelection } from '../selection/france';
import { italySelection } from '../selection/italy';
import { canadaSelection } from '../selection/canada';

// 韓国 (southKorea.ts, public/data/south-korea.json) は第2階層が未完成のため未登録。
// 17市道の整備後に再登録する。
// 第3階層は、元データに第3階層の選定基準（docs/ROADMAP.md）を適用して導出する。
export const COUNTRIES: Record<string, CountryAdministrativeData> = {
  japan: applySelection(japanData, japanSelection),
  usa: applySelection(usaData, usaSelection),
  uk: applySelection(ukData, ukSelection),
  germany: applySelection(germanyData, germanySelection),
  france: applySelection(franceData, franceSelection),
  italy: applySelection(italyData, italySelection),
  canada: applySelection(canadaData, canadaSelection),
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

