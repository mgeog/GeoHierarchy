import React from 'react';
import { STAT_SOURCES } from '../data/statistics';
import {
  CountryAdministrativeData,
  MacroRegion,
  Municipality,
  SelectionCriterion,
  SubDivision,
} from '../types/geo';
import {
  X,
  MapPin,
  Users,
  Compass,
  Lightbulb,
  Building2,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Award,
} from 'lucide-react';

const CRITERION_LABEL: Record<SelectionCriterion, string> = {
  R1: '国の首都',
  R2: '第2階層の首府',
  R2p: '第2階層の代表都市（地域内で都市圏人口が最大）',
  R3: '主要都市圏の中心都市（都市圏人口100万以上、または国内上位20）',
};

function formatStatSource(id: string | undefined, withBasis = false): string {
  const src = id ? STAT_SOURCES[id] : undefined;
  if (!src) return '';
  const year = src.date ? `${src.date.slice(0, 4)}年` : '';
  const basis = withBasis && src.areaBasis ? (src.areaBasis === 'land' ? '・土地面積' : '・総面積') : '';
  return `出典: ${src.agency}${year ? `（${year}）` : ''}${basis}`;
}

interface EducationalDrawerProps {
  country: CountryAdministrativeData;
  selectedEntity: {
    type: 'macro' | 'subdivision' | 'municipality';
    item: MacroRegion | SubDivision | Municipality;
  } | null;
  onClose: () => void;
  onSelectSubdivision: (sub: SubDivision) => void;
  onSelectMunicipality: (m: Municipality) => void;
  onStartQuizForEntity: (item: MacroRegion | SubDivision | Municipality) => void;
}

export const EducationalDrawer: React.FC<EducationalDrawerProps> = ({
  country,
  selectedEntity,
  onClose,
  onSelectSubdivision,
  onSelectMunicipality,
  onStartQuizForEntity,
}) => {
  if (!selectedEntity) return null;

  const { type, item } = selectedEntity;

  // Resolve hierarchy lineage
  let parentMacro: MacroRegion | undefined;
  let parentSub: SubDivision | undefined;

  if (type === 'subdivision') {
    const sub = item as SubDivision;
    parentMacro = country.macroRegions.find((m) => m.id === sub.macroRegionId);
  } else if (type === 'municipality') {
    const m = item as Municipality;
    parentSub = country.subDivisions.find((s) => s.id === m.subDivisionId);
    parentMacro = country.macroRegions.find((mac) => mac.id === m.macroRegionId);
  }

  // Children entities
  const childSubdivisions =
    type === 'macro'
      ? country.subDivisions.filter((s) => s.macroRegionId === item.id)
      : [];

  const childMunicipalities =
    type === 'subdivision' ? (item as SubDivision).municipalities || [] : [];

  const displayPopulation =
    item.population ||
    (type === 'macro'
      ? childSubdivisions.reduce((acc, curr) => acc + (curr.population || 0), 0)
      : undefined);

  return (
    <aside className="w-80 sm:w-96 bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 h-full flex flex-col shadow-xl z-20 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between bg-stone-50/70 dark:bg-stone-800/40">
        <div>
          {/* Breadcrumb Lineage */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400 mb-1.5 flex-wrap">
            <span>{country.flag} {country.name}</span>
            {parentMacro && (
              <>
                <ChevronRight className="w-3 h-3 text-stone-400" />
                <span>{parentMacro.name}</span>
              </>
            )}
            {parentSub && (
              <>
                <ChevronRight className="w-3 h-3 text-stone-400" />
                <span>{parentSub.name}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              {item.name}
            </h2>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                type === 'macro'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
                  : type === 'subdivision'
                  ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
              }`}
            >
              {type === 'macro' && '第1階層: 広域圏'}
              {type === 'subdivision' && '第2階層: 州・県・省'}
              {type === 'municipality' && '第3階層: 市区町村'}
            </span>
          </div>

          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            {item.nameLocal} {item.nameEn ? `· ${item.nameEn}` : ''}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Body */}
      <div className="p-4 space-y-5 flex-1">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {type === 'subdivision' && (
            <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
              <div className="text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1 mb-0.5">
                <Building2 className="w-3 h-3 text-sky-600" />
                <span>州都 / 県庁所在地</span>
              </div>
              <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                {(item as SubDivision).capitalCity}
              </div>
            </div>
          )}

          {type === 'municipality' && (item as Municipality).designation && (
            <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
              <div className="text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1 mb-0.5">
                <Award className="w-3 h-3 text-emerald-600" />
                <span>区分・指定</span>
              </div>
              <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                {(item as Municipality).designation}
              </div>
            </div>
          )}

          {type === 'municipality' && (item as Municipality).tier && (
            <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 col-span-2">
              <div className="text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1 mb-0.5">
                <Award className="w-3 h-3 text-sky-600" />
                <span>選定基準</span>
              </div>
              <div className="text-xs text-stone-900 dark:text-stone-100">
                {(item as Municipality).tier === 'A'
                  ? ((item as Municipality).criteria ?? []).map((c) => CRITERION_LABEL[c]).join(' / ')
                  : '補助枠（国別の学習用。共通基準には該当しない）'}
              </div>
              {(item as Municipality).metroPopulation ? (
                <div className="text-[10px] text-stone-500 mt-1">
                  都市圏人口 {(item as Municipality).metroPopulation!.toLocaleString()} 人（GHS-FUA R2019A、2015年の推計値）
                </div>
              ) : null}
            </div>
          )}

          {displayPopulation ? (
            <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
              <div className="text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1 mb-0.5">
                <Users className="w-3 h-3 text-amber-600" />
                <span>推計人口</span>
              </div>
              <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                {displayPopulation.toLocaleString()} 人
              </div>
              {type === 'subdivision' && (item as SubDivision).populationSource && (
                <div className="text-[10px] text-stone-500 mt-1">{formatStatSource((item as SubDivision).populationSource)}</div>
              )}
            </div>
          ) : null}

          {type === 'subdivision' && (item as SubDivision).areaKm2 && (
            <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
              <div className="text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1 mb-0.5">
                <Compass className="w-3 h-3 text-indigo-600" />
                <span>面積</span>
              </div>
              <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                {(item as SubDivision).areaKm2?.toLocaleString()} km²
              </div>
              {(item as SubDivision).areaSource && (
                <div className="text-[10px] text-stone-500 mt-1">{formatStatSource((item as SubDivision).areaSource, true)}</div>
              )}
            </div>
          )}
        </div>

        {/* Educational Mnemonic / Description */}
        {type === 'subdivision' && (item as SubDivision).mnemonic && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>覚え方・特徴のポイント</span>
            </div>
            <p className="text-xs text-amber-950 dark:text-amber-100 leading-relaxed">
              {(item as SubDivision).mnemonic}
            </p>
          </div>
        )}

        {item.description && (
          <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-stone-800/40 p-3 rounded-lg border border-stone-200/60 dark:border-stone-700/60">
            {item.description}
          </div>
        )}

        {/* Notable landmarks / culture tags for municipalities */}
        {type === 'municipality' && (item as Municipality).notableFor && (
          <div>
            <div className="text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
              主な見どころ・産業・特徴
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(item as Municipality).notableFor?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs border border-stone-200/70 dark:border-stone-700/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Child Entities List (Drill-down navigator) */}
        {type === 'macro' && childSubdivisions.length > 0 && (
          <div>
            <div className="text-xs font-bold text-stone-800 dark:text-stone-200 mb-2 flex items-center justify-between">
              <span>所属する{country.levelNames.level2.ja} ({childSubdivisions.length})</span>
              <span className="text-[11px] text-stone-400 font-normal">クリックで詳細</span>
            </div>
            <div className="space-y-1.5">
              {childSubdivisions.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => onSelectSubdivision(sub)}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-stone-50 hover:bg-stone-100 dark:bg-stone-800/50 dark:hover:bg-stone-800 text-left border border-stone-200/60 dark:border-stone-700/60 transition-colors cursor-pointer group"
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                      {sub.name}
                    </div>
                    <div className="text-[10px] text-stone-500">
                      州都/県庁: {sub.capitalCity}
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {type === 'subdivision' && childMunicipalities.length > 0 && (
          <div>
            <div className="text-xs font-bold text-stone-800 dark:text-stone-200 mb-2 flex items-center justify-between">
              <span>主な市区町村・都市 ({childMunicipalities.length})</span>
              <span className="text-[11px] text-stone-400 font-normal">クリックで選択</span>
            </div>
            <div className="space-y-1.5">
              {childMunicipalities.map((m) => (
                <button
                  key={m.id}
                  onClick={() => onSelectMunicipality(m)}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-stone-50 hover:bg-stone-100 dark:bg-stone-800/50 dark:hover:bg-stone-800 text-left border border-stone-200/60 dark:border-stone-700/60 transition-colors cursor-pointer group"
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 flex items-center gap-1.5">
                      {m.name}
                      {m.isCapital && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-rose-100 text-rose-700 font-bold">
                          首都
                        </span>
                      )}
                      {m.isPrefecturalCapital && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                          首府
                        </span>
                      )}
                      {m.tier === 'B' && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-stone-200 text-stone-600 font-bold">
                          補助
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-stone-500">
                      {m.designation || '都市'}
                      {m.population
                        ? ` · ${m.population.toLocaleString()}人`
                        : m.metroPopulation
                        ? ` · 都市圏 約${Math.round(m.metroPopulation / 10000).toLocaleString()}万人`
                        : ''}
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quiz quick start button */}
        <button
          onClick={() => onStartQuizForEntity(item)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs shadow-sm hover:opacity-90 transition-opacity cursor-pointer mt-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
          <span>この地域・階層のクイズを特訓する</span>
        </button>
      </div>
    </aside>
  );
};
