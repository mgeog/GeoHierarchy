import { useMemo } from 'react';
import L from 'leaflet';
import { AdminLevel, CountryAdministrativeData, Municipality, SelectedEntity } from '../../types/geo';
import { LabelCandidate, selectVisibleLabels } from '../../utils/declutter';
import { estimateTextWidth, labelText, LabelOptions } from './labels';

export const subLabelId = (id: string) => `sub:${id}`;
export const cityLabelId = (id: string) => `city:${id}`;
export const macroLabelId = (id: string) => `macro:${id}`;

/** 都市ラベルの優先度。首都 > 首府 > 都市圏の中心都市（規模順）> 補助枠 */
function cityPriority(m: Municipality): number {
  if (m.criteria?.includes('R1')) return 1000;
  if (m.criteria?.some((c) => c === 'R2' || c === 'R2p')) return 600;
  const size = Math.log10(Math.max(m.metroPopulation ?? m.population ?? 1, 1));
  return m.tier === 'B' ? 100 + size : 500 + size;
}

/**
 * 現在の画面で表示するラベルの集合を決める。重なるラベルは、優先度の低い方を隠す。
 * 第2階層では県・州名のバッジ、第3階層では県・州名のバッジと都市名のラベルが競合する。
 * 広域区分のバッジは、第1階層で主役、第2階層で最も優先度の低い背景、第3階層では出さない。
 */
export function useLabelVisibility(
  map: L.Map | null,
  country: CountryAdministrativeData,
  effectiveLevel: AdminLevel,
  selectedEntity: SelectedEntity | null,
  options: LabelOptions,
  viewVersion: number,
): Set<string> | null {
  const { isBlindMode, isBilingual } = options;
  return useMemo(() => {
    if (!map) return null;
    const candidates: LabelCandidate[] = [];
    const selectedKey = selectedEntity ? `${selectedEntity.type}:${selectedEntity.item.id}` : null;

    if (effectiveLevel === 1) {
      for (const macro of country.macroRegions) {
        const p = map.latLngToContainerPoint([macro.centroid[1], macro.centroid[0]]);
        const text = labelText(macro.name, macro.nameEn, { isBlindMode, isBilingual });
        const height = 26;
        candidates.push({
          id: macroLabelId(macro.id),
          x: p.x,
          y: p.y - height / 2,
          width: estimateTextWidth(text, 13) + 28,
          height,
          priority: 1000,
          forced: selectedKey === `macro:${macro.id}`,
        });
      }
    }

    if (effectiveLevel === 1) return selectVisibleLabels(candidates);

    for (const sub of country.subDivisions) {
      const p = map.latLngToContainerPoint([sub.centroid[1], sub.centroid[0]]);
      const dominant = effectiveLevel === 2;
      const text = labelText(sub.name, sub.nameEn, { isBlindMode, isBilingual });
      const height = dominant ? 20 : 15;
      candidates.push({
        id: subLabelId(sub.id),
        x: p.x,
        y: p.y - height / 2,
        width: estimateTextWidth(text, dominant ? 12 : 10) + 16,
        height,
        priority: dominant ? 100 + Math.log10(Math.max(sub.population ?? 1, 1)) * 10 : 300,
        forced: selectedKey === `subdivision:${sub.id}`,
      });
    }

    if (effectiveLevel === 3) {
      for (const sub of country.subDivisions) {
        for (const city of sub.municipalities) {
          const p = map.latLngToContainerPoint([city.coordinates[1], city.coordinates[0]]);
          const text = labelText(city.name, city.nameEn, { isBlindMode, isBilingual });
          candidates.push({
            id: cityLabelId(city.id),
            x: p.x,
            y: p.y + 8,
            width: estimateTextWidth(text, 11) + 48,
            height: 20,
            priority: cityPriority(city),
            forced: selectedKey === `municipality:${city.id}`,
          });
        }
      }
    }
    return selectVisibleLabels(candidates);
    // viewVersion: 移動・ズームのたびに画面座標が変わるため、再計算する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, country, effectiveLevel, selectedEntity, isBlindMode, isBilingual, viewVersion]);
}
