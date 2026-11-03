import React from 'react';
import {
  CountryAdministrativeData,
  HierarchyDisplayMode,
  MapTheme,
} from '../types/geo';
import {
  Layers,
  Sparkles,
  Eye,
  EyeOff,
  Languages,
  Palette,
  Compass,
} from 'lucide-react';

interface HierarchyControlsProps {
  country: CountryAdministrativeData;
  displayMode: HierarchyDisplayMode;
  onChangeDisplayMode: (mode: HierarchyDisplayMode) => void;
  isBlindMode: boolean;
  onToggleBlindMode: () => void;
  isBilingual: boolean;
  onToggleBilingual: () => void;
  theme: MapTheme;
  onChangeTheme: (theme: MapTheme) => void;
}

export const HierarchyControls: React.FC<HierarchyControlsProps> = ({
  country,
  displayMode,
  onChangeDisplayMode,
  isBlindMode,
  onToggleBlindMode,
  isBilingual,
  onToggleBilingual,
  theme,
  onChangeTheme,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/95 dark:bg-stone-900/95 border-b border-stone-200 dark:border-stone-800 backdrop-blur-md">
      {/* Left: Hierarchy Level Segmented Controls */}
      <div className="flex items-center gap-2 min-w-0 max-w-full">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 dark:text-stone-400 mr-1">
          <Layers className="w-4 h-4 text-stone-700 dark:text-stone-300" />
          <span className="hidden sm:inline">表示階層:</span>
        </div>

        <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs overflow-x-auto max-w-full">
          <button
            onClick={() => onChangeDisplayMode('auto')}
            className={`px-2.5 sm:px-3 py-1.5 font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
              displayMode === 'auto'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
            title="拡大・縮小に合わせて3つの階層を自動切り替え"
          >
            <span className="sm:hidden">自動</span>
            <span className="hidden sm:inline">縮尺連動 (Auto)</span>
          </button>

          <button
            onClick={() => onChangeDisplayMode(1)}
            className={`px-2.5 sm:px-3 py-1.5 font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
              displayMode === 1
                ? 'bg-amber-600 text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
            title={`第1階層: ${country.levelNames.level1.ja} (Zoom ${country.zoomLevels.level1.toFixed(1)})`}
          >
            <span>第1階層</span>
            <span className="hidden md:inline">: {country.levelNames.level1.ja}</span>
            <span className="hidden lg:inline ml-1 opacity-75 text-[10px] font-normal">Z{country.zoomLevels.level1.toFixed(1)}</span>
          </button>

          <button
            onClick={() => onChangeDisplayMode(2)}
            className={`px-2.5 sm:px-3 py-1.5 font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
              displayMode === 2
                ? 'bg-sky-600 text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
            title={`第2階層: ${country.levelNames.level2.ja} (Zoom ${country.zoomLevels.level2.toFixed(1)})`}
          >
            <span>第2階層</span>
            <span className="hidden md:inline">: {country.levelNames.level2.ja}</span>
            <span className="hidden lg:inline ml-1 opacity-75 text-[10px] font-normal">Z{country.zoomLevels.level2.toFixed(1)}</span>
          </button>

          <button
            onClick={() => onChangeDisplayMode(3)}
            className={`px-2.5 sm:px-3 py-1.5 font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
              displayMode === 3
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
            title={`第3階層: ${country.levelNames.level3.ja} (Zoom ${country.zoomLevels.level3.toFixed(1)})`}
          >
            <span>第3階層</span>
            <span className="hidden md:inline">: {country.levelNames.level3.ja}</span>
            <span className="hidden lg:inline ml-1 opacity-75 text-[10px] font-normal">Z{country.zoomLevels.level3.toFixed(1)}</span>
          </button>
        </div>
      </div>

      {/* Right: Educational Toggles (Blind Mask, Bilingual, Theme) */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Blind Mask Toggle */}
        <button
          onClick={onToggleBlindMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
            isBlindMode
              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800'
              : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-50'
          }`}
          title="名前を隠して形状や位置で暗記・自己テストするモード"
          aria-label="暗記マスク"
        >
          {isBlindMode ? (
            <>
              <EyeOff className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">暗記マスク中</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">暗記マスク</span>
            </>
          )}
        </button>

        {/* Bilingual Label Toggle */}
        <button
          onClick={onToggleBilingual}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
            isBilingual
              ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
              : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-50'
          }`}
          title="現地原語/英語との二言語併記を切り替え"
          aria-label="二言語表記"
        >
          <Languages className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">二言語表記</span>
        </button>

        {/* Map Theme Dropdown */}
        <div className="relative group">
          <select
            value={theme}
            onChange={(e) => onChangeTheme(e.target.value as MapTheme)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="educational">🗺️ 教育パステル</option>
            <option value="textbook">📜 教科書・古典紙</option>
            <option value="blueprint">🌌 ブループリント</option>
            <option value="minimal">⚪ ミニマル白黒</option>
          </select>
        </div>
      </div>
    </div>
  );
};
