import React from 'react';
import { CountryAdministrativeData, MapMode } from '../types/geo';
import { COUNTRY_LIST } from '../data/countries';
import {
  Globe2,
  Compass,
  Trophy,
  GitCompare,
  Building2,
  Search,
  BookOpen,
  HelpCircle,
} from 'lucide-react';

interface HeaderProps {
  country: CountryAdministrativeData;
  onSelectCountry: (countryId: string) => void;
  mode: MapMode;
  onChangeMode: (mode: MapMode) => void;
  onOpenSearch: () => void;
  onOpenComparison: () => void;
  onOpenMetro: () => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  country,
  onSelectCountry,
  mode,
  onChangeMode,
  onOpenSearch,
  onOpenComparison,
  onOpenMetro,
  onOpenAbout,
}) => {
  return (
    <header className="h-14 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-2.5 sm:px-4 z-20 shrink-0 gap-2">
      {/* Brand & Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 flex items-center justify-center font-bold shadow-xs">
            <Globe2 className="w-5 h-5 text-amber-400 dark:text-amber-600" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold tracking-tight text-sm text-stone-900 dark:text-white">
                GeoHierarchy
              </span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold uppercase tracking-wider">
                EduMap
              </span>
            </div>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-none mt-0.5 hidden sm:block">
              世界の行政区画・都市 階層学習マップ
            </p>
          </div>
        </div>

        <div className="h-5 w-px bg-stone-200 dark:bg-stone-800 hidden md:block" />

        {/* Country Selector Dropdown */}
        <div className="relative">
          <select
            value={country.id}
            onChange={(e) => onSelectCountry(e.target.value)}
            className="max-w-[10.5rem] sm:max-w-none truncate flex items-center gap-2 pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-1.5 rounded-lg text-xs font-bold bg-stone-100 hover:bg-stone-200/80 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-900 dark:text-white border border-stone-200 dark:border-stone-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
          >
            <optgroup label="G7 加盟国 (主要7カ国)">
              {COUNTRY_LIST.filter((c) => c.isG7).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name}
                </option>
              ))}
            </optgroup>
            {COUNTRY_LIST.some((c) => !c.isG7) && (
              <optgroup label="その他">
                {COUNTRY_LIST.filter((c) => !c.isG7).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* Center: Mode Tabs (探究マップ / パズルクイズ / 階層比較) */}
      <div className="hidden lg:flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
        <button
          onClick={() => onChangeMode('explore')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            mode === 'explore'
              ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>探究マップ</span>
        </button>

        <button
          onClick={() => onChangeMode('quiz')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            mode === 'quiz'
              ? 'bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-400 shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span>パズル・クイズ</span>
        </button>

        <button
          onClick={onOpenComparison}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all cursor-pointer"
        >
          <GitCompare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>各国の制度比較</span>
        </button>

        <button
          onClick={onOpenMetro}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all cursor-pointer"
        >
          <Building2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>都市圏比較</span>
        </button>
      </div>

      {/* Right Actions: Search & Guide */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Mobile Mode Switch Buttons */}
        <div className="flex lg:hidden items-center gap-1">
          <button
            onClick={() => onChangeMode(mode === 'quiz' ? 'explore' : 'quiz')}
            className={`p-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
              mode === 'quiz'
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
            }`}
            title="クイズモード切り替え"
            aria-label="クイズモード切り替え"
          >
            <Trophy className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenComparison}
            className="p-1.5 rounded-lg border bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 cursor-pointer"
            title="各国の制度比較"
            aria-label="各国の制度比較"
          >
            <GitCompare className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenMetro}
            className="p-1.5 rounded-lg border bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 cursor-pointer"
            title="都市圏の比較"
            aria-label="都市圏の比較"
          >
            <Building2 className="w-4 h-4" />
          </button>
        </div>

        {/* Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/80 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-400 text-xs border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
          title="地域・都市を検索 (ショートカット: /)"
          aria-label="地域・都市を検索"
        >
          <Search className="w-3.5 h-3.5 text-stone-500" />
          <span className="hidden sm:inline">検索...</span>
          <kbd className="hidden sm:inline px-1.5 py-0.2 text-[10px] font-mono bg-white dark:bg-stone-900 text-stone-400 rounded border border-stone-200 dark:border-stone-700">
            /
          </kbd>
        </button>

        {/* Educational Guide modal trigger */}
        <button
          onClick={onOpenAbout}
          className="p-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          title="このアプリについて & 学習ガイド"
          aria-label="このアプリについて"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
