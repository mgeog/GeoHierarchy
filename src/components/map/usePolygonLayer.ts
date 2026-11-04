import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { Feature, FeatureCollection } from 'geojson';
import {
  AdminLevel,
  AnswerFeedback,
  CountryAdministrativeData,
  MacroRegion,
  MapMode,
  MapTheme,
  QuizTarget,
  SelectedEntity,
} from '../../types/geo';
import { FeatureIndex, matchSubDivision } from '../../utils/featureMatching';
import { computeCasingStyle, computeFeatureStyle } from './featureStyle';
import { escapeHtml, labelText, LabelOptions } from './labels';
import { useLatest } from './useLatest';

interface Params extends LabelOptions {
  map: L.Map | null;
  geoJson: FeatureCollection | null;
  country: CountryAdministrativeData;
  featureIndex: FeatureIndex;
  macroMap: Map<string, MacroRegion>;
  theme: MapTheme;
  effectiveLevel: AdminLevel;
  selectedEntity: SelectedEntity | null;
  feedback: AnswerFeedback | null;
  mode: MapMode;
  quizTarget: QuizTarget | null;
  onQuizAnswer: (clickedId: string, level: AdminLevel) => void;
  onSelectEntity: (entity: SelectedEntity | null) => void;
}

/** 第2階層ポリゴン（GeoJSON）のレイヤー。生成はデータ・表記設定の変化時のみ、見た目の更新は setStyle で行う */
export function usePolygonLayer(p: Params) {
  const layerRef = useRef<L.GeoJSON | null>(null);
  const casingRef = useRef<L.GeoJSON | null>(null);
  const latest = useLatest(p);

  const styleOf = (feature?: Feature) => {
    const c = latest.current;
    const sub = matchSubDivision(feature?.properties, c.country, c.featureIndex);
    return computeFeatureStyle(sub, {
      macro: sub ? c.macroMap.get(sub.macroRegionId) : undefined,
      selectedEntity: c.selectedEntity,
      feedback: c.feedback,
      theme: c.theme,
      effectiveLevel: c.effectiveLevel,
    });
  };

  const { map, geoJson, country, featureIndex, isBlindMode, isBilingual } = p;

  useEffect(() => {
    if (!map || !geoJson) return;
    // 先に縁取りを敷き、その上に、操作できる区画を重ねる
    const casing = L.geoJSON(geoJson, { style: () => computeCasingStyle(latest.current.theme, latest.current.effectiveLevel), interactive: false }).addTo(map);
    casingRef.current = casing;
    const layer = L.geoJSON(geoJson, {
      style: (feature) => styleOf(feature),
      onEachFeature: (feature, featureLayer) => {
        const sub = matchSubDivision(feature.properties, country, featureIndex);
        if (!sub) return;
        const macro = latest.current.macroMap.get(sub.macroRegionId);
        const name = escapeHtml(labelText(sub.name, sub.nameEn, { isBlindMode, isBilingual }, '••••••'));
        featureLayer.bindTooltip(
          `<div>
            <div style="font-size:10px;color:#cbd5e1">${escapeHtml(macro ? macro.name : '第1階層')}</div>
            <div style="font-weight:bold;font-size:13px;color:#fff">${name}</div>
            <div style="font-size:11px;color:#93c5fd">州都/県庁: ${escapeHtml(sub.capitalCity)}</div>
            ${sub.population ? `<div style="font-size:10px;color:#94a3b8">人口: ${sub.population.toLocaleString()}人</div>` : ''}
          </div>`,
          { className: 'edu-tooltip', sticky: true, direction: 'top', offset: [0, -10] },
        );
        featureLayer.on({
          mouseover: (e) => {
            const l = e.target as L.Path;
            l.setStyle({ weight: 3, color: '#0284c7', fillOpacity: 0.5 });
            l.bringToFront();
          },
          mouseout: (e) => layerRef.current?.resetStyle(e.target),
          click: (e) => {
            L.DomEvent.stopPropagation(e);
            const c = latest.current;
            if (c.mode === 'quiz' && c.quizTarget) {
              if (c.quizTarget.level === 1) c.onQuizAnswer(sub.macroRegionId, 1);
              else if (c.quizTarget.level === 2) c.onQuizAnswer(sub.id, 2);
              return;
            }
            c.onSelectEntity({ type: 'subdivision', item: sub });
          },
        });
      },
    }).addTo(map);
    layerRef.current = layer;
    return () => {
      layer.remove();
      casing.remove();
      layerRef.current = null;
      casingRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, geoJson, country, featureIndex, isBlindMode, isBilingual]);

  useEffect(() => {
    layerRef.current?.setStyle((feature) => styleOf(feature as Feature));
    casingRef.current?.setStyle(computeCasingStyle(p.theme, p.effectiveLevel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.theme, p.effectiveLevel, p.selectedEntity, p.feedback, p.macroMap, p.map, p.geoJson]);
}

