import { useRef } from 'react';

/** 常に最新の値を指す ref。イベントハンドラが古い値を掴むのを避け、レイヤーの再生成を減らす。 */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
