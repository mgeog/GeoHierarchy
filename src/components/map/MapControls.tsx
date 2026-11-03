import React, { useState } from 'react';
import { Map as MapIcon, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { BASEMAP_TILES, BasemapKey } from './basemaps';

interface Props {
  activeBasemap: BasemapKey;
  onChangeBasemap: (key: BasemapKey) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
}

const btn =
  'p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer';

/** 左下：ズーム、全体表示、背景地図の切替 */
export const MapControls: React.FC<Props> = ({ activeBasemap, onChangeBasemap, onZoomIn, onZoomOut, onResetView }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="absolute bottom-6 left-3 sm:left-4 z-10 flex items-center gap-1.5 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-md">
      <button onClick={onZoomIn} title="拡大 (Zoom In)" aria-label="拡大" className={btn}>
        <ZoomIn className="w-4 h-4" />
      </button>
      <button onClick={onZoomOut} title="縮小 (Zoom Out)" aria-label="縮小" className={btn}>
        <ZoomOut className="w-4 h-4" />
      </button>
      <div className="w-px h-5 bg-stone-200 dark:bg-stone-800" />
      <button onClick={onResetView} title="全体表示に戻す" aria-label="全体表示に戻す" className={`${btn} text-xs flex items-center gap-1`}>
        <Maximize2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">全体</span>
      </button>
      <div className="w-px h-5 bg-stone-200 dark:bg-stone-800" />
      <div className="relative">
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="背景地図を切り替え"
          title="背景のリアル地図を切り替え"
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
        >
          <MapIcon className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden md:inline">背景地図</span>
        </button>
        {menuOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-stone-900 rounded-xl shadow-xl border border-stone-200 dark:border-stone-800 p-1.5 z-30">
            <div className="text-[10px] font-bold text-stone-400 px-2 py-1 uppercase tracking-wider">背景の地図レイヤー</div>
            {(Object.keys(BASEMAP_TILES) as BasemapKey[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  onChangeBasemap(key);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                  activeBasemap === key
                    ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <span>{BASEMAP_TILES[key].name}</span>
                {activeBasemap === key && <span>✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
