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

  let fillOpacity = 0.32;
  if (theme === 'blueprint') fillOpacity = 0.55;
  else if (theme === 'minimal') fillOpacity = 0.22;
  else if (theme === 'textbook') fillOpacity = 0.38;
  if (effectiveLevel === 1) fillOpacity += 0.1;
  if (isSelected || isMacroSelected) fillOpacity = 0.65;
  if (feedbackColor) fillOpacity = 0.8;

  let strokeColor = themeStyles.subdivisionStroke;
  if (feedbackColor) strokeColor = feedbackColor;
  else if (isSelected) strokeColor = '#0284c7';
  else if (theme === 'blueprint') strokeColor = '#38bdf8';
  else if (theme === 'minimal') strokeColor = '#0f172a';
  else if (effectiveLevel === 1) strokeColor = '#64748b';

  return {
    fillColor,
    fillOpacity,
    color: strokeColor,
    weight: isSelected ? 3.5 : effectiveLevel === 1 ? 1.2 : 1.8,
    dashArray: effectiveLevel === 1 ? '3, 4' : undefined,
  };
}
