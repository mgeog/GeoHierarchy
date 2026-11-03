import { geoAzimuthalEqualArea, geoBounds, geoCentroid, geoPath } from 'd3-geo';
import type { Feature, MultiPolygon, Polygon } from 'geojson';

/** 地球の平均半径（km）。投影の単位を km にするために使う */
export const EARTH_RADIUS_KM = 6371.0088;

export interface ProjectedMetro {
  /** SVG パス。座標の単位は km、原点は都市圏の重心。x は東、y は南が正 */
  d: string;
  /** パスの外接矩形 [[x0, y0], [x1, y1]]（km） */
  bounds: [[number, number], [number, number]];
  /** 代表都市の位置（km）。投影範囲外なら null */
  city: [number, number] | null;
}

export type MetroFeature = Feature<Polygon | MultiPolygon>;

/**
 * 都市圏を、それぞれの重心を中心とする正積方位図法（ランベルト）で投影する。
 * 全都市圏が同じ縮尺（1 単位 = 1 km）なので、並べても重ねても、大きさを公平に比べられる。
 * 都市圏の大きさ（数十〜百数十 km）では、歪みは無視できる。
 */
export function projectMetro(feature: MetroFeature, cityLonLat?: [number, number]): ProjectedMetro {
  const [lon, lat] = geoCentroid(feature);
  const projection = geoAzimuthalEqualArea()
    .rotate([-lon, -lat])
    .scale(EARTH_RADIUS_KM)
    .translate([0, 0])
    .precision(0.05);
  const path = geoPath(projection);
  const d = path(feature) ?? '';
  const b = path.bounds(feature);
  const city = cityLonLat ? projection(cityLonLat) : null;
  return { d, bounds: b as [[number, number], [number, number]], city: city ?? null };
}

/** 緯度経度の外接矩形（球面上）。範囲確認用 */
export function lonLatBounds(feature: MetroFeature) {
  return geoBounds(feature);
}

/** スケールバーの長さ（km）を、1・2・5 × 10^n の区切りのよい値から選ぶ */
export function niceScaleKm(maxKm: number): number {
  if (!(maxKm > 0)) return 1;
  const exp = Math.floor(Math.log10(maxKm));
  const base = 10 ** exp;
  for (const m of [5, 2, 1]) {
    if (m * base <= maxKm) return m * base;
  }
  return base;
}
