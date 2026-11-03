export interface LabelOptions {
  isBlindMode: boolean;
  isBilingual: boolean;
}

export const BLIND_TEXT = '••••••';

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/** 暗記マスク・二言語表記の設定に応じた、地名の表示文字列 */
export function labelText(name: string, nameEn: string, opt: LabelOptions, blindText = BLIND_TEXT): string {
  if (opt.isBlindMode) return blindText;
  return opt.isBilingual ? `${name} (${nameEn})` : name;
}

/** ラベル幅の概算（全角は約 1em、半角は約 0.56em）。重なり回避の判定に使う */
export function estimateTextWidth(text: string, fontPx: number): number {
  let w = 0;
  for (const ch of text) w += ch.charCodeAt(0) < 0x250 ? fontPx * 0.56 : fontPx;
  return w;
}
