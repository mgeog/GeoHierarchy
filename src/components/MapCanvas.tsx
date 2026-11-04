import React, { useEffect, useMemo, useState } from 'react';
import {
  AdminLevel,
  AnswerFeedback,
  CountryAdministrativeData,
  HierarchyDisplayMode,
  MapMode,
  MapTheme,
  QuizTarget,
  SelectedEntity,
} from '../types/geo';
import { buildFeatureIndex } from '../utils/featureMatching';
import { BasemapKey, basemapForTheme } from './map/basemaps';
import { resolveEffectiveLevel } from './map/level';
import { MapControls } from './map/MapControls';
import { MapHud } from './map/MapHud';
import { useGeoJson } from './map/useGeoJson';
import { useLabelVisibility } from './map/useLabelVisibility';
import { useLeafletMap, useMapNavigation } from './map/useLeafletMap';
import { useCityMarkers, useMacroMarkers, useSubDivisionMarkers } from './map/useMarkerLayers';
import { usePolygonLayer } from './map/usePolygonLayer';

interface MapCanvasProps {
  country: CountryAdministrativeData;
  mode: MapMode;
  displayMode: HierarchyDisplayMode;
  theme: MapTheme;
  isBlindMode: boolean;
  isBilingual: boolean;
  selectedEntity: SelectedEntity | null;
  onSelectEntity: (entity: SelectedEntity | null) => void;
  quizTarget: QuizTarget | null;
  onQuizAnswer: (clickedId: string, level: AdminLevel) => void;
  lastAnswerFeedback: AnswerFeedback | null;
}

/** 地図の合成。個々の責務は src/components/map 以下のフック・部品に分けている */
export const MapCanvas: React.FC<MapCanvasProps> = ({
  country,
  mode,
  displayMode,
  theme,
  isBlindMode,
  isBilingual,
  selectedEntity,
  onSelectEntity,
  quizTarget,
  onQuizAnswer,
  lastAnswerFeedback,
}) => {
  const [basemap, setBasemap] = useState<BasemapKey>(() => basemapForTheme(theme));
  useEffect(() => setBasemap(basemapForTheme(theme)), [theme]);

  const { containerRef, map, zoom, viewVersion, navigateTo } = useLeafletMap(country, displayMode, basemap);
  useMapNavigation(navigateTo, map, country, displayMode, selectedEntity);

  const effectiveLevel = resolveEffectiveLevel(displayMode, zoom, country.zoomLevels);
  const featureIndex = useMemo(() => buildFeatureIndex(country), [country]);
  const macroMap = useMemo(() => new Map(country.macroRegions.map((m) => [m.id, m])), [country]);
  const { data: geoJson, loading } = useGeoJson(country.geoJsonUrl);

  const common = { map, country, effectiveLevel, isBlindMode, isBilingual, selectedEntity, mode, quizTarget, onQuizAnswer, onSelectEntity };

  usePolygonLayer({ ...common, geoJson, featureIndex, macroMap, theme, feedback: lastAnswerFeedback });
  const visibleLabels = useLabelVisibility(map, country, effectiveLevel, selectedEntity, { isBlindMode, isBilingual }, viewVersion);
  useMacroMarkers({ ...common, visibleLabels });
  useSubDivisionMarkers({ ...common, visibleLabels });
  useCityMarkers({ ...common, visibleLabels });

  const handleResetView = () => {
    const z = displayMode === 'auto' ? country.zoomLevels.level1 : country.zoomLevels[`level${displayMode}`];
    navigateTo(country.center[1], country.center[0], z);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${basemap === 'satellite' ? '' : 'edu-basemap-muted'}`}>
      <div ref={containerRef} className="w-full h-full z-0" />

      {loading && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold shadow-md animate-pulse">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span>地理境界データを読み込み中...</span>
        </div>
      )}

      <MapHud country={country} effectiveLevel={effectiveLevel} displayMode={displayMode} zoom={zoom} />
      <MapControls
        activeBasemap={basemap}
        onChangeBasemap={setBasemap}
        onZoomIn={() => map?.zoomIn()}
        onZoomOut={() => map?.zoomOut()}
        onResetView={handleResetView}
      />
    </div>
  );
};
