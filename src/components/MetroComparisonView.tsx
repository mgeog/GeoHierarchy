import React, { useMemo, useState } from 'react';
import { Layers, Rows3, Search, X, Globe2, Info } from 'lucide-react';
import { COUNTRY_LIST } from '../data/countries';
import { METRO_AREAS, METRO_BY_ID, METRO_SOURCE, MetroArea, formatPopulation } from '../data/metro';
import { MetroFeature, projectMetro } from '../utils/metroProjection';
import { useGeoJson } from './map/useGeoJson';
import { MAX_SELECTED, METRO_COLORS } from './metro/colors';
import { MetroMap, MetroMapItem } from './metro/MetroMap';
import { MetroTable, SortDir, SortKey } from './metro/MetroTable';

interface Props {
  onClose: () => void;
  /** 開いたときに、先頭で選択しておく都市圏 */
  initialFuaId?: number;
}

const DEFAULT_SELECTION = [5129, 7244, 5288, 2702]; // 東京圏・ニューヨーク・ロンドン・パリ

export const MetroComparisonView: React.FC<Props> = ({ onClose, initialFuaId }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(() => {
    const base = DEFAULT_SELECTION.filter((id) => METRO_BY_ID.has(id));
    if (initialFuaId !== undefined && METRO_BY_ID.has(initialFuaId)) {
      return [initialFuaId, ...base.filter((id) => id !== initialFuaId)].slice(0, MAX_SELECTED);
    }
    return base;
  });
  const [layout, setLayout] = useState<'overlay' | 'side'>('overlay');
  const [sortKey, setSortKey] = useState<SortKey>('population');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [query, setQuery] = useState('');

  const { data: geometry, loading } = useGeoJson('/data/fua.json');
  const featureById = useMemo(() => {
    const m = new Map<number, MetroFeature>();
    geometry?.features.forEach((f) => m.set(Number((f.properties as { id: number }).id), f as MetroFeature));
    return m;
  }, [geometry]);

  const colorOf = useMemo(() => new Map(selectedIds.map((id, i) => [id, METRO_COLORS[i]])), [selectedIds]);

  const items: MetroMapItem[] = useMemo(
    () =>
      selectedIds.flatMap((id, i) => {
        const metro = METRO_BY_ID.get(id);
        const feature = featureById.get(id);
        if (!metro || !feature) return [];
        return [{ metro, projected: projectMetro(feature, metro.cityCoordinates), color: METRO_COLORS[i] }];
      }),
    [selectedIds, featureById],
  );

  const toggle = (id: number) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id].slice(-MAX_SELECTED)));

  const onSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir(key === 'label' ? 'asc' : 'desc');
    }
  };

  const rows: MetroArea[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = METRO_AREAS.filter(
      (m) =>
        (countryFilter === 'all' || m.countryId === countryFilter) &&
        (!q || m.label.toLowerCase().includes(q) || m.ghslName.toLowerCase().includes(q)),
    );
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) =>
      sortKey === 'label' ? a.label.localeCompare(b.label, 'ja') * dir : (a[sortKey] - b[sortKey]) * dir,
    );
  }, [query, countryFilter, sortKey, sortDir]);

  const maxOf = (pick: (m: MetroArea) => number) => Math.max(1, ...selectedIds.map((id) => pick(METRO_BY_ID.get(id)!)));
  const maxPop = maxOf((m) => m.population);
  const maxArea = maxOf((m) => m.areaKm2);
  const maxDen = maxOf((m) => m.density);

  const notes = selectedIds.map((id) => METRO_BY_ID.get(id)).filter((m): m is MetroArea => Boolean(m?.note));

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-stretch sm:items-center justify-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="metro-title">
      <div className="w-full max-w-6xl max-h-full sm:max-h-[94vh] bg-white dark:bg-stone-900 sm:rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden">
        <div className="p-3 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/70 dark:bg-stone-800/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-700 dark:text-sky-400 shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 id="metro-title" className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">都市圏の比較</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate">機能的都市圏（FUA）を同じ縮尺で比べる · {METRO_AREAS.length}都市圏 · {METRO_SOURCE.year}年</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="閉じる" className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-3 sm:p-5 space-y-5">
          <section aria-label="同縮尺の比較" className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-4">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div role="group" aria-label="表示方法" className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs">
                  {([['overlay', '重ねる', Layers], ['side', '並べる', Rows3]] as const).map(([key, label, Icon]) => (
                    <button
                      key={key}
                      onClick={() => setLayout(key)}
                      aria-pressed={layout === key}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium cursor-pointer ${layout === key ? 'bg-white dark:bg-stone-700 shadow-xs font-bold text-stone-900 dark:text-white' : 'text-stone-600 dark:text-stone-400'}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-500">
                  <span>最大{MAX_SELECTED}件（超えると古い選択から外れます）</span>
                  {selectedIds.length > 0 && (
                    <button onClick={() => setSelectedIds([])} className="underline cursor-pointer hover:text-stone-800 dark:hover:text-stone-200">
                      選択を解除
                    </button>
                  )}
                </div>
              </div>
              {loading && selectedIds.length > 0 && items.length === 0 ? (
                <div className="flex items-center justify-center aspect-[4/3] rounded-xl border border-stone-200 dark:border-stone-800 text-sm text-stone-500 animate-pulse">境界データを読み込み中...</div>
              ) : (
                <MetroMap items={items} layout={layout} />
              )}
              <p className="mt-1.5 text-[11px] text-stone-500">全都市圏を、それぞれの重心を中心とする正積方位図法で描いています。1つの白丸は代表都市の位置です。</p>
            </div>

            <div className="space-y-2.5" aria-live="polite">
              {selectedIds.length === 0 && <p className="text-sm text-stone-500">下の表で、比べたい都市圏にチェックを入れてください。</p>}
              {selectedIds.map((id) => {
                const m = METRO_BY_ID.get(id);
                if (!m) return null;
                const bars: [string, string, number][] = [
                  ['人口', formatPopulation(m.population), m.population / maxPop],
                  ['面積', `${Math.round(m.areaKm2).toLocaleString()} km²`, m.areaKm2 / maxArea],
                  ['密度', `${Math.round(m.density).toLocaleString()} 人/km²`, m.density / maxDen],
                ];
                const color = colorOf.get(id)!;
                return (
                  <div key={id} className="p-3 rounded-xl border border-stone-200 dark:border-stone-800" style={{ borderLeft: `4px solid ${color}` }}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                        {m.flag} {m.label}
                      </div>
                      <button onClick={() => toggle(id)} aria-label={`${m.label}を外す`} className="text-stone-400 hover:text-stone-700 cursor-pointer">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[10px] text-stone-500 mb-1.5">
                      人口 全体{m.populationRank}位・{m.countryName}内{m.populationRankInCountry}位 / 面積 {m.areaRank}位 / 密度 {m.densityRank}位
                    </div>
                    <dl className="space-y-1">
                      {bars.map(([name, value, ratio]) => (
                        <div key={name} className="grid grid-cols-[2.2rem_1fr_auto] items-center gap-2 text-[11px]">
                          <dt className="text-stone-500">{name}</dt>
                          <dd className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden" aria-hidden="true">
                            <div className="h-full rounded-full" style={{ width: `${Math.max(2, ratio * 100)}%`, backgroundColor: color }} />
                          </dd>
                          <dd className="font-semibold tabular-nums text-stone-800 dark:text-stone-200">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                );
              })}
              {notes.map((m) => (
                <p key={m.fuaId} className="flex gap-1.5 text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-2">
                  <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span><b>{m.label}</b>：{m.note}</span>
                </p>
              ))}
            </div>
          </section>

          <section aria-label="都市圏の一覧">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div role="group" aria-label="国で絞り込み" className="flex gap-1.5 overflow-x-auto pb-1">
                {[{ id: 'all', flag: '', name: 'すべて' }, ...COUNTRY_LIST.map((c) => ({ id: c.id, flag: c.flag, name: c.name.replace(/\s*\(.*\)$/, '') }))].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCountryFilter(c.id)}
                    aria-pressed={countryFilter === c.id}
                    className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${countryFilter === c.id ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'}`}
                  >
                    {c.flag} {c.name}
                  </button>
                ))}
              </div>
              <label className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs">
                <Search className="w-3.5 h-3.5 text-stone-500" />
                <span className="sr-only">都市圏名で検索</span>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="都市圏名で検索" className="bg-transparent outline-none w-32 sm:w-40 text-stone-800 dark:text-stone-200" />
              </label>
            </div>
            <MetroTable rows={rows} selected={colorOf} sortKey={sortKey} sortDir={sortDir} onSort={onSort} onToggle={toggle} />
            <p className="mt-1.5 text-[11px] text-stone-500">{rows.length}件を表示</p>
          </section>

          <section aria-label="定義と留意点" className="text-xs text-stone-600 dark:text-stone-400 space-y-2 border-t border-stone-200 dark:border-stone-800 pt-4">
            <h3 className="font-bold text-stone-800 dark:text-stone-200">定義と、読むときの留意点</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>機能的都市圏（FUA）は、都市と、その労働市場に属する周辺地域（通勤圏）をあわせた範囲です。OECDと欧州連合は、通勤率15%以上の自治体を通勤圏とする定義を用いています。</li>
              <li>ここで使う GHS-FUA は、通勤の実測データではなく、<b>OECD諸国の実際のFUAで学習した統計モデルによる推定</b>です。人口格子（1km）を単位とするため、行政界とは一致しません。国境を越えて一体となった都市圏は、片方の国に割り当てられています。</li>
              <li>隣接する都市圏は統合されます。そのため、ライン・ルール地域のように、複数の大都市が1つの都市圏として数えられることがあります。名称が代表都市のものでも、範囲は都市単体ではありません。</li>
              <li>人口は{METRO_SOURCE.year}年の推計値で、国勢調査の値とは一致しません。「中心域」は、都市圏のうち、連続した市街地にあたる部分です。</li>
              <li>国の間で定義が揃っているので比較に向きますが、各国が公式に定める都市圏（日本の都市雇用圏、米国のMSA、フランスの aire d&apos;attraction など）とは一致しません。範囲の取り方で数値が変わる点（可変単位地区問題）にも注意してください。</li>
            </ul>
            <p>
              出典：{METRO_SOURCE.citation}（{METRO_SOURCE.licence}）。本アプリでは、投影の変換、境界の単純化、座標の丸め、および人口・面積・密度の表示用の集計を行っています（改変あり）。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
