import { AdminLevel, CountryAdministrativeData, HierarchyDisplayMode } from '../../types/geo';

/**
 * 表示階層を決める。自動のときは、国ごとに調整したズームレベルの中間点で切り替える
 * （第1・第2階層の中間より小さければ第1階層、第2・第3階層の中間より小さければ第2階層、それ以上は第3階層）。
 */
export function resolveEffectiveLevel(
  displayMode: HierarchyDisplayMode,
  zoom: number,
  zoomLevels: CountryAdministrativeData['zoomLevels'],
): AdminLevel {
  if (displayMode !== 'auto') return displayMode;
  const { level1, level2, level3 } = zoomLevels;
  if (zoom < (level1 + level2) / 2) return 1;
  if (zoom < (level2 + level3) / 2) return 2;
  return 3;
}
