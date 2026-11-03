import React from 'react';
import { Navigation } from 'lucide-react';
import { AdminLevel, CountryAdministrativeData, HierarchyDisplayMode } from '../../types/geo';

interface Props {
  country: CountryAdministrativeData;
  effectiveLevel: AdminLevel;
  displayMode: HierarchyDisplayMode;
  zoom: number;
}

/** 左上：現在の表示階層とズーム */
export const MapHud: React.FC<Props> = ({ country, effectiveLevel, displayMode, zoom }) => (
  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex flex-col gap-1.5 pointer-events-none max-w-[calc(100%-1.5rem)]">
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-sm border border-stone-200/80 dark:border-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300">
      <Navigation className="w-3.5 h-3.5 text-amber-600 animate-pulse shrink-0" />
      <span className="hidden sm:inline">表示階層:</span>
      <span className="font-bold text-stone-900 dark:text-stone-100 truncate">
        第{effectiveLevel}階層: {country.levelNames[`level${effectiveLevel}`].ja}
      </span>
      <span className="text-stone-400">·</span>
      <span className="text-stone-500 font-mono shrink-0">Zoom {zoom.toFixed(1)}</span>
    </div>
    {displayMode === 'auto' && (
      <div className="text-[11px] text-stone-600 dark:text-stone-400 bg-white/90 dark:bg-stone-900/90 px-2.5 py-1 rounded-md border border-stone-200/60 shadow-xs w-fit">
        縮尺に応じて自動切り替え中
      </div>
    )}
  </div>
);
