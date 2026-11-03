import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { geoArea } from 'd3-geo';
import { EARTH_RADIUS_KM, MetroFeature, niceScaleKm, projectMetro } from '../metroProjection';
import { METRO_AREAS, METRO_BY_ID, formatPopulation } from '../../data/metro';
import fuaSelected from '../../data/fua-selected.json';

const geojson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../public/data/fua.json'), 'utf8')) as {
  features: (MetroFeature & { properties: { id: number } })[];
};

describe('metro data', () => {
  it('選定された全 FUA に、代表都市と境界がある', () => {
    expect(METRO_AREAS.length).toBe(fuaSelected.fuas.length);
    const geoIds = new Set(geojson.features.map((f) => f.properties.id));
    for (const m of METRO_AREAS) expect(geoIds.has(m.fuaId)).toBe(true);
  });
  it('順位が 1 から始まり、東京圏が人口最大', () => {
    const top = METRO_AREAS.find((m) => m.populationRank === 1);
    expect(top?.fuaId).toBe(5129);
    expect(METRO_BY_ID.get(5129)?.populationRankInCountry).toBe(1);
  });
  it('人口の表記', () => {
    expect(formatPopulation(36470000)).toBe('3,647万人');
    expect(formatPopulation(123456789)).toBe('1.23億人');
  });
});

describe('projectMetro', () => {
  it('境界の面積が属性表の面積と 3% 以内で一致する（単純化の劣化がない）', () => {
    for (const f of geojson.features) {
      const attr = METRO_BY_ID.get(f.properties.id)!.areaKm2;
      const area = geoArea(f) * EARTH_RADIUS_KM ** 2;
      expect(Math.abs(area / attr - 1)).toBeLessThan(0.03);
    }
  });
  it('正積方位図法なので、投影後の面積が球面上の面積と一致する', () => {
    const f = geojson.features.find((x) => x.properties.id === 5129)!;
    const p = projectMetro(f);
    const [[x0, y0], [x1, y1]] = p.bounds;
    // 外接矩形の面積は、都市圏の面積以上で、極端に大きくはない
    const sphere = geoArea(f) * EARTH_RADIUS_KM ** 2;
    expect((x1 - x0) * (y1 - y0)).toBeGreaterThan(sphere);
    expect((x1 - x0) * (y1 - y0)).toBeLessThan(sphere * 6);
  });
  it('代表都市が都市圏の範囲内（原点から 200km 以内）に投影される', () => {
    for (const f of geojson.features) {
      const m = METRO_BY_ID.get(f.properties.id)!;
      if (m.fuaId === 3454) continue; // ヴェネツィア：島部の点が本土側の境界の外にある（意図した差）
      const p = projectMetro(f, m.cityCoordinates);
      expect(p.city).not.toBeNull();
      expect(Math.hypot(p.city![0], p.city![1])).toBeLessThan(200);
    }
  });
});

describe('niceScaleKm', () => {
  it('1・2・5 の区切りに丸める', () => {
    expect(niceScaleKm(130)).toBe(100);
    expect(niceScaleKm(240)).toBe(200);
    expect(niceScaleKm(70)).toBe(50);
    expect(niceScaleKm(9)).toBe(5);
    expect(niceScaleKm(0)).toBe(1);
  });
});
