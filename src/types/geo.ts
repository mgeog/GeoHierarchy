export type AdminLevel = 1 | 2 | 3;

/**
 * 第3階層の選定基準（docs/ROADMAP.md 参照）
 * R1: 国の首都 / R2: 第2階層の首府 / R2p: 首府を持たない第2階層の代表都市（地域内で FUA 人口が最大）
 * R3: FUA 人口 100 万以上、または国内の FUA 人口上位 20 都市の中心都市
 */
export type SelectionCriterion = 'R1' | 'R2' | 'R2p' | 'R3';

/** A: 共通基準を満たす都市（クイズの既定対象） / B: 国別の追加枠（補助的に表示） */
export type CityTier = 'A' | 'B';

export interface Municipality {
  id: string;
  name: string;
  nameLocal: string;
  nameEn: string;
  level: 3;
  subDivisionId: string; // parent level 2
  macroRegionId: string; // parent level 1
  coordinates: [number, number]; // [lon, lat]
  population?: number;
  isCapital?: boolean;
  isPrefecturalCapital?: boolean; // or state capital
  designation?: string; // e.g., "政令指定都市", "County Seat", "Kreisfreie Stadt", "特別区"
  description?: string;
  trivia?: string;
  notableFor?: string[];
  // --- 選定レイヤー（src/data/selection）から導出される項目 ---
  tier?: CityTier;
  criteria?: SelectionCriterion[];
  /** GHS-FUA R2019A の eFUA_ID（R3 の代表都市のみ） */
  fuaId?: number;
  /** 当該 FUA の 2015 年人口（1km 格子からの推計値） */
  metroPopulation?: number;
}

export interface SubDivision {
  id: string;
  code: string;
  name: string;
  nameLocal: string;
  nameEn: string;
  level: 2;
  macroRegionId: string; // parent level 1
  capitalCity: string;
  centroid: [number, number]; // [lon, lat]
  population?: number;
  areaKm2?: number;
  /** 人口・面積の出典 ID（src/data/statistics.json の sources） */
  populationSource?: string;
  areaSource?: string;
  color?: string;
  description?: string;
  mnemonic?: string; // 暗記・特徴のポイント
  aliases?: string[]; // alternative names for matching
  municipalities: Municipality[];
}

export interface MacroRegion {
  id: string;
  name: string;
  nameLocal: string;
  nameEn: string;
  level: 1;
  centroid: [number, number];
  color: string;
  description: string;
  subDivisionIds: string[];
  population?: number;
}

export interface CountryAdministrativeData {
  id: string;
  name: string;
  nameLocal: string;
  nameEn: string;
  flag: string;
  center: [number, number]; // [lon, lat]
  defaultZoom: number;
  zoomLevels: {
    level1: number;
    level2: number;
    level3: number;
  };
  geoJsonUrl?: string;
  geoJsonNameProp?: string;
  systemDescription: string; // e.g., "日本の地方自治制度：広域地方、47都道府県、1,700以上の市区町村"
  levelNames: {
    level1: { ja: string; local: string; desc: string };
    level2: { ja: string; local: string; desc: string };
    level3: { ja: string; local: string; desc: string };
  };
  macroRegions: MacroRegion[];
  subDivisions: SubDivision[];
}

export type MapMode = 'explore' | 'quiz' | 'compare';

export type HierarchyDisplayMode = 'auto' | 1 | 2 | 3;

export type MapTheme = 'educational' | 'textbook' | 'blueprint' | 'minimal';

export type EntityType = 'macro' | 'subdivision' | 'municipality';

export interface SelectedEntity {
  type: EntityType;
  item: MacroRegion | SubDivision | Municipality;
}

export interface QuizTarget {
  level: AdminLevel;
  id: string;
  name: string;
}

export interface AnswerFeedback {
  correct: boolean;
  id: string;
}
