/**
 * 国別データの整合性検証。違反があれば終了コード 1 を返す。
 * 実行: bun run validate
 */
import fs from 'node:fs';
import path from 'node:path';
import { geoArea, geoContains } from 'd3-geo';
import { COUNTRIES } from '../src/data/countries/index.ts';
import { buildFeatureIndex, findKeyCollisions, matchSubDivision } from '../src/utils/featureMatching.ts';
import { japanSelection } from '../src/data/selection/japan.ts';
import { usaSelection } from '../src/data/selection/usa.ts';
import { ukSelection } from '../src/data/selection/uk.ts';
import { germanySelection } from '../src/data/selection/germany.ts';
import { franceSelection } from '../src/data/selection/france.ts';
import { italySelection } from '../src/data/selection/italy.ts';
import { canadaSelection } from '../src/data/selection/canada.ts';
import type { CountrySelection } from '../src/data/selection/apply.ts';
import stat from '../src/data/statistics.json' with { type: 'json' };
import fuaSelected from '../src/data/fua-selected.json' with { type: 'json' };
import { buildSelectedJson } from './select-fua.ts';

const SELECTIONS: Record<string, CountrySelection> = {
  japan: japanSelection, usa: usaSelection, uk: ukSelection, germany: germanySelection,
  france: franceSelection, italy: italySelection, canada: canadaSelection,
};

const publicDir = path.resolve(import.meta.dirname, '../public');
let errorCount = 0;
let warnCount = 0;
const err = (id: string, msg: string) => { errorCount++; console.error(`  ✗ [${id}] ${msg}`); };
const warn = (id: string, msg: string) => { warnCount++; console.warn(`  △ [${id}] ${msg}`); };

// FUA 選定結果が属性表と同期していること
if (buildSelectedJson() !== fs.readFileSync(path.resolve(import.meta.dirname, '../src/data/fua-selected.json'), 'utf8')) {
  err('fua', 'src/data/fua-selected.json が data-src/fua-attributes.json と同期していません（bun scripts/select-fua.ts）');
}

// 都市圏の境界（public/data/fua.json）：選定 FUA と 1 対 1 で、面積が属性表と一致し、容量が予算内であること
{
  console.log('\nfua-geometry');
  const file = path.join(publicDir, 'data/fua.json');
  const gj = JSON.parse(fs.readFileSync(file, 'utf8')) as { features: ({ type: 'Feature'; properties: { id: number }; geometry: never })[] };
  const rows = new Map((fuaSelected.fuas as { id: number; name: string; fuaAreaKm2: number }[]).map((f) => [f.id, f]));
  const seen = new Set<number>();
  for (const f of gj.features) {
    const row = rows.get(f.properties.id);
    if (!row) { err('fua-geometry', `選定されていない FUA ${f.properties.id} の境界がある`); continue; }
    if (seen.has(f.properties.id)) err('fua-geometry', `FUA ${f.properties.id} の境界が重複`);
    seen.add(f.properties.id);
    const area = geoArea(f) * 6371.0088 ** 2;
    if (Math.abs(area / row.fuaAreaKm2 - 1) > 0.03) err('fua-geometry', `${row.name} (${row.id}): 境界の面積 ${Math.round(area)} km² が属性表の ${row.fuaAreaKm2} km² と 3% 以上乖離`);
  }
  for (const id of rows.keys()) if (!seen.has(id)) err('fua-geometry', `FUA ${id} (${rows.get(id)!.name}) の境界がない`);
  const kb = fs.statSync(file).size / 1024;
  if (kb > 800) err('fua-geometry', `fua.json が ${Math.round(kb)} KB（予算 800 KB 超）`);
  console.log(`  ${gj.features.length} 件 / ${Math.round(kb)} KB`);
}

for (const [countryId, c] of Object.entries(COUNTRIES)) {
  console.log(`\n${countryId}`);
  const sel = SELECTIONS[countryId];
  if (!sel) err(countryId, '選定レイヤー（src/data/selection）が未定義');
  const macroIds = new Set(c.macroRegions.map((m) => m.id));
  const subIds = new Set(c.subDivisions.map((s) => s.id));
  const munis = c.subDivisions.flatMap((s) => s.municipalities.map((m) => ({ m, s })));
  const noPop: string[] = [];

  // ID の一意性
  const allIds = [...c.macroRegions.map((m) => m.id), ...c.subDivisions.map((s) => s.id), ...munis.map((x) => x.m.id)];
  allIds.filter((x, i) => allIds.indexOf(x) !== i).forEach((x) => err(countryId, `ID 重複: ${x}`));

  // 親子関係
  for (const s of c.subDivisions) {
    if (!macroIds.has(s.macroRegionId)) err(countryId, `第2階層 ${s.id}: 未定義の広域区分 ${s.macroRegionId}`);
    if (!s.capitalCity) err(countryId, `第2階層 ${s.id}: 首府が未設定`);
    if (!s.population || !s.areaKm2) err(countryId, `第2階層 ${s.id}: 人口または面積が未設定`);
    const sources = stat.sources as Record<string, unknown>;
    if (!s.populationSource || !(s.populationSource in sources)) err(countryId, `第2階層 ${s.id}: 人口の出典が未設定または未定義`);
    if (!s.areaSource || !(s.areaSource in sources)) err(countryId, `第2階層 ${s.id}: 面積の出典が未設定または未定義`);
    if (s.municipalities.length === 0) warn(countryId, `第2階層 ${s.id}: 第3階層が 0 件`);
  }
  for (const mr of c.macroRegions) {
    for (const sid of mr.subDivisionIds) if (!subIds.has(sid)) err(countryId, `広域区分 ${mr.id}: 未定義の第2階層 ${sid}`);
    const actual = c.subDivisions.filter((s) => s.macroRegionId === mr.id).map((s) => s.id).sort().join();
    if (actual !== [...mr.subDivisionIds].sort().join()) err(countryId, `広域区分 ${mr.id}: subDivisionIds と子の macroRegionId が不一致`);
  }
  for (const { m, s } of munis) {
    if (m.subDivisionId !== s.id) err(countryId, `第3階層 ${m.id}: subDivisionId=${m.subDivisionId} が親 ${s.id} と不一致`);
    if (m.macroRegionId !== s.macroRegionId) err(countryId, `第3階層 ${m.id}: macroRegionId が親と不一致`);
    const [lon, lat] = m.coordinates;
    if (!(Math.abs(lat) <= 90 && Math.abs(lon) <= 180)) err(countryId, `第3階層 ${m.id}: 座標が範囲外`);
    if (!m.population && !m.metroPopulation) noPop.push(m.id);
    if (!m.tier || !m.criteria) err(countryId, `第3階層 ${m.id}: tier / criteria が導出されていない`);
    if (m.tier === 'A' && m.criteria?.length === 0) err(countryId, `第3階層 ${m.id}: Tier A だが基準に該当しない`);
  }

  if (noPop.length) warn(countryId, `人口も都市圏人口も未設定の第3階層 ${noPop.length} 件（追加都市の市域人口は出典確認待ち）: ${noPop.slice(0, 6).join(', ')}${noPop.length > 6 ? ' ほか' : ''}`);

  // 選定基準の検査
  if (sel) {
    const r1 = munis.filter(({ m }) => m.criteria?.includes('R1'));
    if (r1.length !== 1) err(countryId, `R1（国の首都）が ${r1.length} 件（1 件であるべき）`);
    if (!munis.some(({ m }) => m.id === sel.nationalCapital)) err(countryId, `nationalCapital ${sel.nationalCapital} が存在しない`);
    for (const s of c.subDivisions) {
      const mid = sel.capitals[s.id];
      if (!mid) { err(countryId, `第2階層 ${s.id}: 首府（R2 / R2p）が未指定`); continue; }
      if (!s.municipalities.some((m) => m.id === mid)) err(countryId, `第2階層 ${s.id}: 首府 ${mid} が当該第2階層に存在しない`);
    }
    for (const sid of Object.keys(sel.capitals)) if (!subIds.has(sid)) err(countryId, `capitals に未定義の第2階層 ${sid}`);
    // R3: 選定された各 FUA にちょうど 1 つの代表都市
    const selected = (fuaSelected.fuas as { id: number; iso: string; name: string }[]).filter((f) => f.iso === sel.iso3);
    const selectedIds = new Set(selected.map((f) => f.id));
    for (const f of selected) {
      const reps = Object.entries(sel.fua).filter(([, fid]) => fid === f.id);
      if (reps.length !== 1) err(countryId, `FUA ${f.id} (${f.name}) の代表都市が ${reps.length} 件（1 件であるべき）`);
    }
    for (const [mid, fid] of Object.entries(sel.fua)) {
      if (!selectedIds.has(fid)) err(countryId, `代表都市 ${mid}: FUA ${fid} は選定対象でない`);
      if (!munis.some(({ m }) => m.id === mid)) err(countryId, `代表都市 ${mid} が存在しない`);
    }
    const tierA = munis.filter(({ m }) => m.tier === 'A').length;
    console.log(`  Tier A ${tierA} / Tier B ${munis.length - tierA}（R3 対象 FUA ${selected.length}）`);
  }

  // GeoJSON と第2階層の 1 対 1 対応（アプリと同じ照合関数・完全一致のみ）
  findKeyCollisions(c).forEach((x) => err(countryId, `第2階層のキーが衝突: ${x}`));
  if (c.geoJsonUrl) {
    const gj = JSON.parse(fs.readFileSync(path.join(publicDir, c.geoJsonUrl), 'utf8'));
    const featureIndex = buildFeatureIndex(c);
    const hit = new Map<string, string[]>();
    for (const f of gj.features) {
      const label = String(f.properties?.[c.geoJsonNameProp ?? 'name'] ?? '(名称なし)');
      const sub = matchSubDivision(f.properties, c, featureIndex);
      if (!sub) { err(countryId, `GeoJSON 地物 "${label}" に対応する第2階層がない`); continue; }
      hit.set(sub.id, [...(hit.get(sub.id) ?? []), label]);
    }
    for (const s of c.subDivisions) {
      const h = hit.get(s.id);
      if (!h) err(countryId, `第2階層 ${s.id} に対応する GeoJSON 地物がない`);
      else if (h.length > 1) err(countryId, `第2階層 ${s.id} に GeoJSON 地物が複数対応: ${h.join(' | ')}`);
    }
  }

  if (c.geoJsonUrl) {
    const gj = JSON.parse(fs.readFileSync(path.join(publicDir, c.geoJsonUrl), 'utf8'));
    const featureIndex = buildFeatureIndex(c);
    const featureOf = new Map<string, unknown>();
    for (const f of gj.features) {
      const sub = matchSubDivision(f.properties, c, featureIndex);
      if (sub) featureOf.set(sub.id, f);
    }
    for (const { m, s } of munis) {
      const f = featureOf.get(s.id);
      if (f && !geoContains(f as Parameters<typeof geoContains>[0], m.coordinates)) warn(countryId, `第3階層 ${m.id} (${m.nameEn}) の座標が第2階層 ${s.id} のポリゴン外（簡略化境界による誤差の可能性）`);
    }
  }
  console.log(`  広域 ${c.macroRegions.length} / 第2階層 ${c.subDivisions.length} / 第3階層 ${munis.length}`);
}

console.log(`\n結果: エラー ${errorCount} 件, 警告 ${warnCount} 件`);
process.exit(errorCount > 0 ? 1 : 0);
