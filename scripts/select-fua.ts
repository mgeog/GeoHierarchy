/**
 * data-src/fua-attributes.json から、基準 R3（FUA 人口 100 万以上、または国内上位 20）に
 * 該当する FUA を抽出して src/data/fua-selected.json に書き出す。
 * 実行: bun scripts/select-fua.ts            （書き出し）
 *       bun scripts/select-fua.ts --check    （同期確認のみ。差異があれば終了コード 1）
 */
import fs from 'node:fs';
import path from 'node:path';

export const R3_MIN_POPULATION = 1_000_000;
export const R3_TOP_N = 20;

interface Fua { id: number; name: string; iso: string; fuaPop2015: number; fuaAreaKm2: number; ucPop2015: number; ucAreaKm2: number; commutingPop2015: number }

export function selectFuas(all: Fua[]): Fua[] {
  const byIso = new Map<string, Fua[]>();
  for (const f of all) byIso.set(f.iso, [...(byIso.get(f.iso) ?? []), f]);
  const out: Fua[] = [];
  for (const list of byIso.values()) {
    list.sort((a, b) => b.fuaPop2015 - a.fuaPop2015);
    list.forEach((f, i) => { if (f.fuaPop2015 >= R3_MIN_POPULATION || i < R3_TOP_N) out.push(f); });
  }
  return out;
}

const root = path.resolve(import.meta.dirname, '..');
export function buildSelectedJson(): string {
  const src = JSON.parse(fs.readFileSync(path.join(root, 'data-src/fua-attributes.json'), 'utf8'));
  const selected = selectFuas(src.fuas).map(({ id, name, iso, fuaPop2015, fuaAreaKm2, ucPop2015, ucAreaKm2, commutingPop2015 }) => ({ id, name, iso, fuaPop2015, fuaAreaKm2, ucPop2015, ucAreaKm2, commutingPop2015 }));
  return JSON.stringify({ source: src.source, rule: `FUA 人口 ${R3_MIN_POPULATION.toLocaleString()} 以上、または国内上位 ${R3_TOP_N}`, fuas: selected }, null, 1) + '\n';
}

if (import.meta.main) {
  const dest = path.join(root, 'src/data/fua-selected.json');
  const next = buildSelectedJson();
  if (process.argv.includes('--check')) {
    const cur = fs.existsSync(dest) ? fs.readFileSync(dest, 'utf8') : '';
    if (cur !== next) { console.error('src/data/fua-selected.json が data-src と同期していません。bun scripts/select-fua.ts を実行してください'); process.exit(1); }
    console.log('fua-selected.json: 同期済み');
  } else {
    fs.writeFileSync(dest, next);
    console.log(`${JSON.parse(next).fuas.length} 件を書き出しました: ${dest}`);
  }
}
