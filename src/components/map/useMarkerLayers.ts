import { useEffect } from 'react';
import L from 'leaflet';
import {
  AdminLevel,
  CountryAdministrativeData,
  MacroRegion,
  MapMode,
  QuizTarget,
  SelectedEntity,
} from '../../types/geo';
import { escapeHtml, labelText, LabelOptions } from './labels';
import { cityLabelId, macroLabelId, subLabelId } from './useLabelVisibility';
import { useLatest } from './useLatest';

interface Common extends LabelOptions {
  map: L.Map | null;
  country: CountryAdministrativeData;
  effectiveLevel: AdminLevel;
  selectedEntity: SelectedEntity | null;
  mode: MapMode;
  quizTarget: QuizTarget | null;
  onQuizAnswer: (clickedId: string, level: AdminLevel) => void;
  onSelectEntity: (entity: SelectedEntity | null) => void;
}

/** 第1階層：広域区分の重心バッジ（第1階層で主役、第2階層で控えめ、第3階層で非表示） */
export function useMacroMarkers(p: Common & { visibleLabels: Set<string> | null }) {
  const latest = useLatest(p);
  const { map, country, effectiveLevel, isBlindMode, isBilingual, visibleLabels } = p;

  useEffect(() => {
    if (!map || effectiveLevel > 2) return;
    const group = L.layerGroup().addTo(map);
    const dominant = effectiveLevel === 1;

    for (const macro of country.macroRegions) {
      if (visibleLabels && !visibleLabels.has(macroLabelId(macro.id))) continue;
      const text = escapeHtml(labelText(macro.name, macro.nameEn, { isBlindMode, isBilingual }));
      const html = `
        <div style="transform:translate(-50%,-50%);display:inline-flex;flex-direction:column;align-items:center;
          padding:${dominant ? '4px 10px' : '2px 6px'};border-radius:8px;background:rgba(255,255,255,0.92);
          border:2px solid ${macro.color};box-shadow:0 4px 6px -1px rgba(0,0,0,0.15);font-weight:700;
          font-size:${dominant ? '12px' : '10px'};color:#1e293b;white-space:nowrap;pointer-events:auto;cursor:pointer;">
          <span>${text}</span>
          ${dominant ? `<span style="font-size:9px;color:#64748b;font-weight:500">第1階層 (${macro.subDivisionIds.length}区画)</span>` : ''}
        </div>`;
      const marker = L.marker([macro.centroid[1], macro.centroid[0]], {
        icon: L.divIcon({ html, className: 'edu-macro-icon', iconSize: [0, 0] }),
      });
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        const c = latest.current;
        if (c.mode === 'quiz' && c.quizTarget && c.quizTarget.level === 1) {
          c.onQuizAnswer(macro.id, 1);
          return;
        }
        c.onSelectEntity({ type: 'macro', item: macro as MacroRegion });
      });
      group.addLayer(marker);
    }
    return () => {
      group.remove();
    };
  }, [map, country, effectiveLevel, isBlindMode, isBilingual, visibleLabels, latest]);
}

/** 第2階層：州・県のバッジ（重なるものは useLabelVisibility で間引く） */
export function useSubDivisionMarkers(p: Common & { visibleLabels: Set<string> | null }) {
  const latest = useLatest(p);
  const { map, country, effectiveLevel, isBlindMode, isBilingual, selectedEntity, visibleLabels } = p;

  useEffect(() => {
    if (!map || effectiveLevel < 2) return;
    const group = L.layerGroup().addTo(map);
    const dominant = effectiveLevel === 2;
    const macroColor = new Map(country.macroRegions.map((m) => [m.id, m.color]));

    for (const sub of country.subDivisions) {
      if (visibleLabels && !visibleLabels.has(subLabelId(sub.id))) continue;
      const selected = selectedEntity?.type === 'subdivision' && selectedEntity.item.id === sub.id;
      const text = escapeHtml(labelText(sub.name, sub.nameEn, { isBlindMode, isBilingual }));
      const stroke = macroColor.get(sub.macroRegionId) ?? '#0284c7';
      const html = `
        <div style="transform:translate(-50%,-50%);display:inline-flex;flex-direction:column;align-items:center;
          padding:${dominant ? '3px 8px' : '2px 5px'};border-radius:6px;
          background:${selected ? '#0284c7' : 'rgba(255,255,255,0.94)'};color:${selected ? '#ffffff' : '#0f172a'};
          border:1.5px solid ${selected ? '#0369a1' : stroke};box-shadow:0 2px 5px rgba(0,0,0,0.18);
          font-weight:700;font-size:${dominant ? '11px' : '9px'};white-space:nowrap;pointer-events:auto;cursor:pointer;">
          <span>${text}</span>
          ${dominant ? `<span style="font-size:8px;color:${selected ? '#e0f2fe' : '#64748b'};font-weight:500">${escapeHtml(sub.capitalCity)}</span>` : ''}
        </div>`;
      const marker = L.marker([sub.centroid[1], sub.centroid[0]], {
        icon: L.divIcon({ html, className: 'edu-sub-icon', iconSize: [0, 0] }),
      });
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        const c = latest.current;
        if (c.mode === 'quiz' && c.quizTarget) {
          if (c.quizTarget.level === 1) c.onQuizAnswer(sub.macroRegionId, 1);
          else if (c.quizTarget.level === 2) c.onQuizAnswer(sub.id, 2);
          return;
        }
        c.onSelectEntity({ type: 'subdivision', item: sub });
      });
      group.addLayer(marker);
    }
    return () => {
      group.remove();
    };
  }, [map, country, effectiveLevel, isBlindMode, isBilingual, selectedEntity, visibleLabels, latest]);
}

/** 第3階層：都市の点とラベル。Tier B（補助枠）は控えめに描く。重なるラベルは間引き、点は常に残す */
export function useCityMarkers(p: Common & { visibleLabels: Set<string> | null }) {
  const latest = useLatest(p);
  const { map, country, effectiveLevel, isBlindMode, isBilingual, selectedEntity, visibleLabels } = p;

  useEffect(() => {
    if (!map || effectiveLevel < 2) return;
    const group = L.layerGroup().addTo(map);

    for (const sub of country.subDivisions) {
      for (const city of sub.municipalities) {
        // 第2階層では、首都・首府の点だけを出して見通しを保つ
        if (effectiveLevel === 2 && !city.isCapital && !city.isPrefecturalCapital) continue;

        const [lon, lat] = city.coordinates;
        const selected = selectedEntity?.type === 'municipality' && selectedEntity.item.id === city.id;
        const tierB = city.tier === 'B';
        const radius = city.isCapital ? 7 : city.isPrefecturalCapital ? 5.5 : tierB ? 3.5 : 4.5;
        const color = city.isCapital ? '#e11d48' : city.isPrefecturalCapital ? '#0284c7' : tierB ? '#94a3b8' : '#10b981';

        const marker = L.circleMarker([lat, lon], {
          radius: selected ? radius * 1.5 : radius,
          fillColor: color,
          color: '#ffffff',
          weight: 2,
          fillOpacity: tierB ? 0.6 : 0.9,
        });

        const text = escapeHtml(labelText(city.name, city.nameEn, { isBlindMode, isBilingual }, '•••'));
        const labelShown =
          selected || (effectiveLevel === 3 && (!visibleLabels || visibleLabels.has(cityLabelId(city.id))));
        const populationBadge = city.population
          ? `<span class="text-[9px] font-normal text-slate-300">(${(city.population / 10000).toFixed(0)}万)</span>`
          : city.metroPopulation
          ? `<span class="text-[9px] font-normal text-slate-300">(都市圏${(city.metroPopulation / 10000).toFixed(0)}万)</span>`
          : '';

        if (labelShown) {
          marker.bindTooltip(
            `<div class="flex items-center gap-1 font-bold">
              <span>${text}</span>
              ${city.isCapital ? '<span class="text-[9px] px-1 bg-rose-600 text-white rounded">首都</span>' : ''}
              ${tierB ? '<span class="text-[9px] px-1 bg-slate-500 text-white rounded">補助</span>' : ''}
              ${populationBadge}
            </div>`,
            { permanent: true, direction: 'bottom', offset: [0, 8], className: 'edu-city-permanent-badge' },
          );
        } else {
          marker.bindTooltip(
            `<div>
              <div style="font-size:10px;color:#94a3b8">${escapeHtml(sub.name)} · ${escapeHtml(city.designation || '都市')}</div>
              <div style="font-weight:bold;font-size:12px;color:#fff">${text}</div>
              ${city.population ? `<div style="font-size:10px;color:#cbd5e1">人口: ${city.population.toLocaleString()}人</div>` : ''}
              ${city.metroPopulation ? `<div style="font-size:10px;color:#cbd5e1">都市圏人口(推計・2015): ${city.metroPopulation.toLocaleString()}人</div>` : ''}
            </div>`,
            { className: 'edu-tooltip', sticky: true, direction: 'top' },
          );
        }

        marker.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          const c = latest.current;
          if (c.mode === 'quiz' && c.quizTarget) {
            c.onQuizAnswer(city.id, 3);
            return;
          }
          c.onSelectEntity({ type: 'municipality', item: city });
        });
        group.addLayer(marker);
      }
    }
    return () => {
      group.remove();
    };
  }, [map, country, effectiveLevel, isBlindMode, isBilingual, selectedEntity, visibleLabels, latest]);
}
