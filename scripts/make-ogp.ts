/**
 * OGP 画像（1200x630）の元になる HTML を生成する。
 * 実行: bun scripts/make-ogp.ts <出力するHTMLのパス>
 * その HTML を 1200x630 で撮影し、public/ogp.png として保存する（Playwright など）。
 * 図柄は、都市圏比較と同じ投影（同縮尺の正積方位図法）で描いた、東京・ニューヨーク・ロンドン・パリ。
 */
import fs from 'node:fs';
import path from 'node:path';
import { projectMetro, type MetroFeature } from '../src/utils/metroProjection.ts';
import { METRO_BY_ID } from '../src/data/metro.ts';

const root = path.resolve(import.meta.dirname, '..');
const gj = JSON.parse(fs.readFileSync(path.join(root, 'public/data/fua.json'), 'utf8')) as { features: (MetroFeature & { properties: { id: number } })[] };
const picks = [
  { id: 5129, color: '#38bdf8' },
  { id: 7244, color: '#fb923c' },
  { id: 5288, color: '#34d399' },
  { id: 2702, color: '#f472b6' },
];
const items = picks.map((p) => {
  const f = gj.features.find((x) => x.properties.id === p.id)!;
  return { ...p, metro: METRO_BY_ID.get(p.id)!, projected: projectMetro(f, METRO_BY_ID.get(p.id)!.cityCoordinates) };
});
const cell = Math.max(...items.map((i) => Math.max(i.projected.bounds[1][0] - i.projected.bounds[0][0], i.projected.bounds[1][1] - i.projected.bounds[0][1]))) * 1.18;
const cells = items
  .map((it, idx) => {
    const cx = (idx % 2) * cell + cell / 2;
    const cy = Math.floor(idx / 2) * cell + cell / 2;
    const bx = (it.projected.bounds[0][0] + it.projected.bounds[1][0]) / 2;
    const by = (it.projected.bounds[0][1] + it.projected.bounds[1][1]) / 2;
    return `<g transform="translate(${cx - bx} ${cy - by})"><path d="${it.projected.d}" fill="${it.color}" fill-opacity=".38" stroke="${it.color}" stroke-width="2.2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></g>
    <text x="${cx}" y="${Math.floor(idx / 2) * cell + cell * 0.97}" text-anchor="middle" font-size="${cell * 0.058}" font-weight="700" fill="${it.color}">${it.metro.label}</text>`;
  })
  .join('\n');

const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><style>
html,body{margin:0;width:1200px;height:630px;background:#1c1917;font-family:"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif;color:#fafaf9;overflow:hidden}
.wrap{display:flex;height:630px;align-items:center;padding:0 64px;gap:48px;box-sizing:border-box}
.txt{flex:1}
h1{font-size:76px;margin:0;letter-spacing:-1px}
h1 small{display:block;font-size:22px;color:#fbbf24;letter-spacing:6px;margin-bottom:10px;font-weight:700}
p{font-size:30px;line-height:1.55;color:#d6d3d1;margin:22px 0 0}
.chips{margin-top:30px;display:flex;gap:12px;flex-wrap:wrap}
.chips span{border:2px solid #57534e;border-radius:999px;padding:6px 18px;font-size:22px;color:#e7e5e4}
svg{width:520px;height:520px;flex:none}
</style></head><body><div class="wrap"><div class="txt">
<h1><small>EDUMAP</small>GeoHierarchy</h1>
<p>世界の行政区画と都市を、<br>3つの階層で学ぶ地図アプリ</p>
<div class="chips"><span>G7＋中国・インド</span><span>地図クイズ</span><span>368都市圏を同縮尺で比較</span></div>
</div>
<svg viewBox="0 0 ${cell * 2} ${cell * 2}" preserveAspectRatio="xMidYMid meet">${cells}</svg></div></body></html>`;
const out = process.argv[2];
if (!out) throw new Error('出力先の HTML パスを指定してください');
fs.writeFileSync(out, html);
console.log(`wrote ${out}`);
