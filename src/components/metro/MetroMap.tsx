import React, { useMemo } from 'react';
import { MetroArea } from '../../data/metro';
import { ProjectedMetro, niceScaleKm } from '../../utils/metroProjection';

export interface MetroMapItem {
  metro: MetroArea;
  projected: ProjectedMetro;
  color: string;
}

interface Props {
  items: MetroMapItem[];
  layout: 'overlay' | 'side';
}

const width = (p: ProjectedMetro) => p.bounds[1][0] - p.bounds[0][0];
const height = (p: ProjectedMetro) => p.bounds[1][1] - p.bounds[0][1];

/**
 * 都市圏の同縮尺の比較図。座標の単位は km なので、重ねても並べても、大きさをそのまま比べられる。
 * 「重ねる」は、各都市圏の重心を一致させる。「並べる」は、同じ大きさのマスに 1 つずつ置く。
 */
export const MetroMap: React.FC<Props> = ({ items, layout }) => {
  const view = useMemo(() => {
    if (items.length === 0) return null;
    if (layout === 'overlay') {
      const x0 = Math.min(...items.map((i) => i.projected.bounds[0][0]));
      const x1 = Math.max(...items.map((i) => i.projected.bounds[1][0]));
      const y0 = Math.min(...items.map((i) => i.projected.bounds[0][1]));
      const y1 = Math.max(...items.map((i) => i.projected.bounds[1][1]));
      const pad = Math.max(x1 - x0, y1 - y0) * 0.08;
      const w = x1 - x0 + pad * 2;
      const h = y1 - y0 + pad * 2;
      return {
        viewBox: `${x0 - pad} ${y0 - pad} ${w} ${h}`,
        w,
        h,
        originX: x0 - pad,
        originY: y0 - pad,
        placements: items.map(() => ({ dx: 0, dy: 0 })),
        cell: 0,
      };
    }
    const cell = Math.max(...items.map((i) => Math.max(width(i.projected), height(i.projected)))) * 1.25;
    const cols = items.length <= 2 ? items.length : 2;
    const rows = Math.ceil(items.length / cols);
    // 縮尺バーを、マスの外（下の余白）に置いて、ラベルと重ならないようにする
    const margin = cell * 0.14;
    return {
      viewBox: `0 0 ${cols * cell} ${rows * cell + margin}`,
      w: cols * cell,
      h: rows * cell + margin,
      originX: 0,
      originY: 0,
      cell,
      placements: items.map((it, idx) => {
        const cx = (idx % cols) * cell + cell / 2;
        const cy = Math.floor(idx / cols) * cell + cell / 2;
        const bx = (it.projected.bounds[0][0] + it.projected.bounds[1][0]) / 2;
        const by = (it.projected.bounds[0][1] + it.projected.bounds[1][1]) / 2;
        return { dx: cx - bx, dy: cy - by };
      }),
    };
  }, [items, layout]);

  if (!view) {
    return (
      <div className="flex items-center justify-center aspect-[4/3] rounded-xl border border-dashed border-stone-300 dark:border-stone-700 text-sm text-stone-500">
        表から都市圏を選ぶと、同じ縮尺で表示します
      </div>
    );
  }

  const unit = Math.max(view.w, view.h);
  const scaleKm = niceScaleKm(unit * 0.28);
  const barY = view.originY + view.h - unit * 0.035;
  const barX = view.originX + unit * 0.035;
  const ordered = layout === 'overlay' ? [...items.keys()].sort((a, b) => width(items[b].projected) * height(items[b].projected) - width(items[a].projected) * height(items[a].projected)) : [...items.keys()];

  const summary = items
    .map((i) => `${i.metro.label}（約${Math.round(i.metro.areaKm2).toLocaleString()}km²）`)
    .join('、');

  return (
    <svg
      viewBox={view.viewBox}
      role="img"
      aria-label={`同縮尺で比べた都市圏の形：${summary}`}
      className="w-full aspect-[4/3] rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800"
      preserveAspectRatio="xMidYMid meet"
    >
      {ordered.map((idx) => {
        const it = items[idx];
        const { dx, dy } = view.placements[idx];
        return (
          <g key={it.metro.fuaId} transform={`translate(${dx} ${dy})`}>
            <path d={it.projected.d} fill={it.color} fillOpacity={layout === 'overlay' ? 0.3 : 0.4} stroke={it.color} strokeWidth={1.6} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            {it.projected.city && (
              <circle cx={it.projected.city[0]} cy={it.projected.city[1]} r={unit * 0.007} fill="#fff" stroke={it.color} strokeWidth={2} vectorEffect="non-scaling-stroke" />
            )}
          </g>
        );
      })}
      {layout === 'side' &&
        items.map((it, idx) => {
          const cols = items.length <= 2 ? items.length : 2;
          const x = (idx % cols) * view.cell + view.cell / 2;
          const y = Math.floor(idx / cols) * view.cell + view.cell * 0.94;
          return (
            <text key={it.metro.fuaId} x={x} y={y} textAnchor="middle" fontSize={view.cell * 0.05} fontWeight={700} fill={it.color}>
              {it.metro.label}
            </text>
          );
        })}
      <g aria-hidden="true">
        <line x1={barX} x2={barX + scaleKm} y1={barY} y2={barY} stroke="#44403c" strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
        <line x1={barX} x2={barX} y1={barY - unit * 0.01} y2={barY + unit * 0.01} stroke="#44403c" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        <line x1={barX + scaleKm} x2={barX + scaleKm} y1={barY - unit * 0.01} y2={barY + unit * 0.01} stroke="#44403c" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        <text x={barX + scaleKm / 2} y={barY - unit * 0.016} textAnchor="middle" fontSize={unit * 0.03} fill="#44403c" fontWeight={600}>
          {scaleKm.toLocaleString()} km
        </text>
      </g>
    </svg>
  );
};
