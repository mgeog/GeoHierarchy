export type AdminLevel = 1 | 2 | 3;

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
  pathD?: string; // pre-projected or geoJSON coordinates
  geoCoordinates?: number[][][]; // MultiPolygon / Polygon [[[lon, lat], ...]]
  population?: number;
  areaKm2?: number;
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
  // Projection settings
  projectionConfig: {
    type: 'mercator' | 'albers' | 'conicConformal' | 'transverseMercator';
    center?: [number, number];
    rotate?: [number, number, number];
    parallels?: [number, number];
    scaleMultiplier: number;
  };
}

export type MapMode = 'explore' | 'quiz' | 'compare';

export type HierarchyDisplayMode = 'auto' | 1 | 2 | 3;

export type MapTheme = 'educational' | 'textbook' | 'blueprint' | 'minimal';
