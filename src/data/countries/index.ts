import { CountryAdministrativeData } from '../../types/geo';
import { japanData } from './japan';
import { usaData } from './usa';
import { ukData } from './uk';
import { germanyData } from './germany';
import { franceData } from './france';
import { italyData } from './italy';
import { canadaData } from './canada';
import { chinaData } from './china';
import { indiaData } from './india';
import { southKoreaData } from './southKorea';
import { applySelection } from '../selection/apply';
import { applyStatistics } from '../statistics';
import { japanSelection } from '../selection/japan';
import { usaSelection } from '../selection/usa';
import { ukSelection } from '../selection/uk';
import { germanySelection } from '../selection/germany';
import { franceSelection } from '../selection/france';
import { italySelection } from '../selection/italy';
import { canadaSelection } from '../selection/canada';
import { chinaSelection } from '../selection/china';
import { indiaSelection } from '../selection/india';
import { southKoreaSelection } from '../selection/southKorea';

// 第3階層は、元データに第3階層の選定基準（docs/ROADMAP.md）を適用して導出する。
export const COUNTRIES: Record<string, CountryAdministrativeData> = {
  japan: applyStatistics(applySelection(japanData, japanSelection)),
  usa: applyStatistics(applySelection(usaData, usaSelection)),
  uk: applyStatistics(applySelection(ukData, ukSelection)),
  germany: applyStatistics(applySelection(germanyData, germanySelection)),
  france: applyStatistics(applySelection(franceData, franceSelection)),
  italy: applyStatistics(applySelection(italyData, italySelection)),
  canada: applyStatistics(applySelection(canadaData, canadaSelection)),
  china: applyStatistics(applySelection(chinaData, chinaSelection)),
  india: applyStatistics(applySelection(indiaData, indiaSelection)),
  'south-korea': applyStatistics(applySelection(southKoreaData, southKoreaSelection)),
};

export const COUNTRY_LIST: { id: string; name: string; flag: string; continent: string; isG7: boolean }[] = [
  { id: 'japan', name: '日本 (Japan)', flag: '🇯🇵', continent: 'アジア', isG7: true },
  { id: 'usa', name: 'アメリカ合衆国 (USA)', flag: '🇺🇸', continent: '北米', isG7: true },
  { id: 'uk', name: 'イギリス (UK)', flag: '🇬🇧', continent: 'ヨーロッパ', isG7: true },
  { id: 'germany', name: 'ドイツ (Germany)', flag: '🇩🇪', continent: 'ヨーロッパ', isG7: true },
  { id: 'france', name: 'フランス (France)', flag: '🇫🇷', continent: 'ヨーロッパ', isG7: true },
  { id: 'italy', name: 'イタリア (Italy)', flag: '🇮🇹', continent: 'ヨーロッパ', isG7: true },
  { id: 'canada', name: 'カナダ (Canada)', flag: '🇨🇦', continent: '北米', isG7: true },
  { id: 'china', name: '中華人民共和国 (China)', flag: '🇨🇳', continent: 'アジア', isG7: false },
  { id: 'india', name: 'インド (India)', flag: '🇮🇳', continent: 'アジア', isG7: false },
  { id: 'south-korea', name: '大韓民国 (South Korea)', flag: '🇰🇷', continent: 'アジア', isG7: false },
];

export function getCountryData(id: string): CountryAdministrativeData {
  return COUNTRIES[id] || COUNTRIES['japan'];
}

