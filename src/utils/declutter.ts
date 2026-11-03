export interface LabelCandidate {
  id: string;
  /** 画面上の座標（ピクセル）。ラベルはこの点の下に、水平方向に中央揃えで置く */
  x: number;
  y: number;
  width: number;
  height: number;
  /** 大きいほど優先 */
  priority: number;
  /** true なら重なりに関わらず必ず表示する（選択中の項目など） */
  forced?: boolean;
}

function overlaps(a: LabelCandidate, b: LabelCandidate, pad: number): boolean {
  return !(
    a.x + a.width / 2 + pad < b.x - b.width / 2 ||
    b.x + b.width / 2 + pad < a.x - a.width / 2 ||
    a.y + a.height + pad < b.y ||
    b.y + b.height + pad < a.y
  );
}

/**
 * 優先度の高い順に、既に採用したラベルと重ならないものだけを採用する（貪欲法）。
 * 戻り値は、表示するラベルの id の集合。
 */
export function selectVisibleLabels(candidates: readonly LabelCandidate[], padding = 2): Set<string> {
  const ordered = [...candidates].sort(
    (a, b) => Number(Boolean(b.forced)) - Number(Boolean(a.forced)) || b.priority - a.priority,
  );
  const placed: LabelCandidate[] = [];
  for (const c of ordered) {
    if (c.forced || !placed.some((p) => overlaps(c, p, padding))) placed.push(c);
  }
  return new Set(placed.map((p) => p.id));
}
