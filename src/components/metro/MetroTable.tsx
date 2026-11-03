import React from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { MetroArea, formatPopulation } from '../../data/metro';

export type SortKey = 'label' | 'population' | 'areaKm2' | 'density' | 'coreOnlyPopulation';
export type SortDir = 'asc' | 'desc';

interface Props {
  rows: MetroArea[];
  /** 選択中の fuaId → 色 */
  selected: Map<number, string>;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
  onToggle: (fuaId: number) => void;
}

const COLUMNS: { key: SortKey; label: string; numeric: boolean }[] = [
  { key: 'label', label: '都市圏', numeric: false },
  { key: 'population', label: '人口', numeric: true },
  { key: 'areaKm2', label: '面積 (km²)', numeric: true },
  { key: 'density', label: '密度 (人/km²)', numeric: true },
  { key: 'coreOnlyPopulation', label: '中心域の人口', numeric: true },
];

export const MetroTable: React.FC<Props> = ({ rows, selected, sortKey, sortDir, onSort, onToggle }) => (
  <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800">
    <table className="w-full text-xs">
      <caption className="sr-only">都市圏の人口・面積・人口密度の一覧。見出しのボタンで並べ替え、行のボタンで比較に追加できます。</caption>
      <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300">
        <tr>
          <th scope="col" className="px-2 py-2 w-10 text-left">
            <span className="sr-only">比較に追加</span>
          </th>
          {COLUMNS.map((c) => {
            const active = sortKey === c.key;
            return (
              <th
                key={c.key}
                scope="col"
                aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                className={`px-2 py-2 font-semibold whitespace-nowrap ${c.numeric ? 'text-right' : 'text-left'}`}
              >
                <button onClick={() => onSort(c.key)} className="inline-flex items-center gap-1 cursor-pointer hover:text-stone-900 dark:hover:text-white">
                  {c.label}
                  {active ? sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" /> : <ArrowUpDown className="w-3 h-3 opacity-40" />}
                </button>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
        {rows.map((m) => {
          const color = selected.get(m.fuaId);
          return (
            <tr key={m.fuaId} className={color ? 'bg-stone-50 dark:bg-stone-800/40' : ''}>
              <td className="px-2 py-1.5">
                <button
                  onClick={() => onToggle(m.fuaId)}
                  aria-pressed={Boolean(color)}
                  aria-label={`${m.label}を比較${color ? 'から外す' : 'に追加'}`}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${color ? 'border-transparent text-white' : 'border-stone-300 dark:border-stone-600'}`}
                  style={color ? { backgroundColor: color } : undefined}
                >
                  {color ? '✓' : ''}
                </button>
              </td>
              <td className="px-2 py-1.5 whitespace-nowrap">
                <span className="mr-1">{m.flag}</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{m.label}</span>
                {m.note && <span className="ml-1 text-[10px] text-amber-700 dark:text-amber-400" title={m.note}>注</span>}
              </td>
              <td className="px-2 py-1.5 text-right tabular-nums">{formatPopulation(m.population)}</td>
              <td className="px-2 py-1.5 text-right tabular-nums">{Math.round(m.areaKm2).toLocaleString()}</td>
              <td className="px-2 py-1.5 text-right tabular-nums">{Math.round(m.density).toLocaleString()}</td>
              <td className="px-2 py-1.5 text-right tabular-nums">{formatPopulation(m.coreOnlyPopulation)}</td>
            </tr>
          );
        })}
        {rows.length === 0 && (
          <tr>
            <td colSpan={COLUMNS.length + 1} className="px-3 py-6 text-center text-stone-500">
              該当する都市圏がありません
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
