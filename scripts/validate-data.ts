/**
 * 国別データの整合性検証。違反があれば終了コード 1 を返す。
 * 実行: bun run validate
 */
import fs from 'node:fs';
import path from 'node:path';
import { COUNTRIES } from '../src/data/countries/index.ts';

const publicDir = path.resolve(import.meta.dirname, '../public');
let errorCount = 0;
let warnCount = 0;
const err = (id: string, msg: string) => { errorCount++; console.error(`  ✗ [${id}] ${msg}`); };
const warn = (id: string, msg: string) => { warnCount++; console.warn(`  △ [${id}] ${msg}`); };

for (const [countryId, c] of Object.entries(COUNTRIES)) {
  console.log(`\n${countryId}`);
  const macroIds = new Set(c.macroRegions.map((m) => m.id));
  const subIds = new Set(c.subDivisions.map((s) => s.id));
  const munis = c.subDivisions.flatMap((s) => s.municipalities.map((m) => ({ m, s })));

  // ID の一意性
  const allIds = [...c.macroRegions.map((m) => m.id), ...c.subDivisions.map((s) => s.id), ...munis.map((x) => x.m.id)];
  allIds.filter((x, i) => allIds.indexOf(x) !== i).forEach((x) => err(countryId, `ID 重複: ${x}`));

  // 親子関係
  for (const s of c.subDivisions) {
    if (!macroIds.has(s.macroRegionId)) err(countryId, `第2階層 ${s.id}: 未定義の広域区分 ${s.macroRegionId}`);
    if (!s.capitalCity) err(countryId, `第2階層 ${s.id}: 首府が未設定`);
    if (!s.population) warn(countryId, `第2階層 ${s.id}: 人口が未設定`);
    if (!s.areaKm2) warn(countryId, `第2階層 ${s.id}: 面積が未設定`);
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
    if (!m.population) warn(countryId, `第3階層 ${m.id}: 人口が未設定`);
  }

  // GeoJSON と第2階層の 1 対 1 対応（完全一致のみ。部分一致には依存しない）
  if (c.geoJsonUrl) {
    const gj = JSON.parse(fs.readFileSync(path.join(publicDir, c.geoJsonUrl), 'utf8'));
    const key = new Map<string, string>();
    for (const s of c.subDivisions) {
      for (const k of [s.name, s.nameEn, s.nameLocal, s.code, s.id, ...(s.aliases ?? [])]) {
        if (k) key.set(k.toLowerCase(), s.id);
      }
    }
    const hit = new Map<string, string[]>();
    for (const f of gj.features) {
      const label = String(f.properties?.[c.geoJsonNameProp ?? 'name'] ?? '(名称なし)');
      const sid = key.get(label.trim().toLowerCase());
      if (!sid) { err(countryId, `GeoJSON 地物 "${label}" に対応する第2階層がない`); continue; }
      hit.set(sid, [...(hit.get(sid) ?? []), label]);
    }
    for (const s of c.subDivisions) {
      const h = hit.get(s.id);
      if (!h) err(countryId, `第2階層 ${s.id} に対応する GeoJSON 地物がない`);
      else if (h.length > 1) err(countryId, `第2階層 ${s.id} に GeoJSON 地物が複数対応: ${h.join(' | ')}`);
    }
  }
  console.log(`  広域 ${c.macroRegions.length} / 第2階層 ${c.subDivisions.length} / 第3階層 ${munis.length}`);
}

console.log(`\n結果: エラー ${errorCount} 件, 警告 ${warnCount} 件`);
process.exit(errorCount > 0 ? 1 : 0);
