import { MapTheme } from '../../types/geo';

// 背景地図のタイル提供元（APIキー不要のもの）。帰属表示は Leaflet の attribution に出す。
export const BASEMAP_TILES = {
  osm: {
    name: 'オープンストリートマップ (標準 OSM)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abc',
    maxZoom: 19,
  },
  osmFr: {
    name: 'OSM フランス (高視認性・行政界明瞭)',
    url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap France | &copy; OpenStreetMap contributors',
    subdomains: 'abc',
    maxZoom: 19,
  },
  topo: {
    name: 'OpenTopoMap (地形・等高線・山岳)',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map: &copy; OSM contributors, SRTM | Style: &copy; OpenTopoMap',
    subdomains: 'abc',
    maxZoom: 17,
  },
  satellite: {
    name: 'リアル衛星写真 (Esri Satellite)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics',
    subdomains: 'abc',
    maxZoom: 18,
  },
  esriTopo: {
    name: '自然地形図 (Esri Topographic)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, DeLorme, NAVTEQ',
    subdomains: 'abc',
    maxZoom: 18,
  },
  gray: {
    name: '淡色シンプル背景 (Esri Light Gray)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, HERE, Garmin',
    subdomains: 'abc',
    maxZoom: 16,
  },
} as const;

export type BasemapKey = keyof typeof BASEMAP_TILES;

/** 配色テーマに合う既定の背景地図 */
export function basemapForTheme(theme: MapTheme): BasemapKey {
  switch (theme) {
    case 'blueprint':
      return 'satellite';
    case 'minimal':
      return 'gray';
    case 'textbook':
      return 'esriTopo';
    default:
      return 'osm';
  }
}
