import L from 'leaflet';
import {
  AdminLevel,
  AnswerFeedback,
  MacroRegion,
  MapTheme,
  SelectedEntity,
  SubDivision,
} from '../../types/geo';
import { MAP_THEMES } from '../../utils/theme';

/** 区画の境界線の色。背景（地図・塗り）に対して、十分なコントラストが出る濃さにする */
const BORDER_COLOR: Record<MapTheme, string> = {
  educational: '#1e293b',
  textbook: '#44331f',
  blueprint: '#bae6fd',
  minimal: '#18181b',
};

/** 境界線の下に敷く縁取り（ケーシング）。背景地図の線や文字の上でも、境界線が途切れて見えない */
export function computeCasingStyle(theme: MapTheme, effectiveLevel: AdminLevel): L.PathOptions {
  return {
    fill: false,
    color: theme === 'blueprint' ? '#0f172a' : '#ffffff',
    opacity: 0.85,
    weight: effectiveLevel === 1 ? 3.8 : 4.4,
    interactive: false,
    lineJoin: 'round',
  };
}

export interface FeatureStyleContext {
  macro: MacroRegion | undefined;
  selectedEntity: SelectedEntity | null;
  feedback: AnswerFeedback | null;
  theme: MapTheme;
  effectiveLevel: AdminLevel;
}

/** 第2階層ポリゴンの描画スタイル（選択・クイズ判定・テーマ・階層に応じる） */
export function computeFeatureStyle(sub: SubDivision | undefined, ctx: FeatureStyleContext): L.PathOptions {
  const { macro, selectedEntity, feedback, theme, effectiveLevel } = ctx;

  const isSelected = selectedEntity?.type === 'subdivision' && selectedEntity.item.id === sub?.id;
  const isMacroSelected = selectedEntity?.type === 'macro' && selectedEntity.item.id === sub?.macroRegionId;

  const isFeedbackTarget = Boolean(sub && feedback && (feedback.id === sub.id || feedback.id === sub.macroRegionId));
  const feedbackColor = isFeedbackTarget && feedback ? (feedback.correct ? '#22c55e' : '#ef4444') : null;

  const themeStyles = MAP_THEMES[theme] || MAP_THEMES.educational;

  let fillColor = macro ? macro.color : '#94a3b8';
  if (theme === 'blueprint') fillColor = isSelected ? '#0284c7' : '#1e293b';
  else if (theme === 'minimal') fillColor = isSelected ? '#334155' : '#f8fafc';
  else if (theme === 'textbook') fillColor = macro ? macro.color : themeStyles.subdivisionDefaultFill;

  if (feedbackColor) fillColor = feedbackColor;
  else if (isSelected || isMacroSelected) fillColor = '#0284c7';

  // 塗りは薄く保ち、区画の区別は境界線で行う（背景地図が透けても、線が読める）
  let fillOpacity = 0.26;
  if (theme === 'blueprint') fillOpacity = 0.4;
  else if (theme === 'minimal') fillOpacity = 0.2;
  else if (theme === 'textbook') fillOpacity = 0.32;
  if (effectiveLevel === 1) fillOpacity += 0.1;
  if (isSelected || isMacroSelected) fillOpacity = 0.55;
  if (feedbackColor) fillOpacity = 0.75;

  let strokeColor = BORDER_COLOR[theme];
  if (feedbackColor) strokeColor = feedbackColor;
  else if (isSelected) strokeColor = '#0369a1';

  return {
    fillColor,
    fillOpacity,
    color: strokeColor,
    opacity: 1,
    weight: isSelected ? 3 : effectiveLevel === 1 ? 1.4 : 1.8,
  };
}
