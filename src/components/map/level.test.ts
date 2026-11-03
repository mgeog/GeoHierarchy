import { describe, expect, it } from 'vitest';
import { resolveEffectiveLevel } from './level';

const z = { level1: 4.5, level2: 5.8, level3: 7.2 };

describe('resolveEffectiveLevel', () => {
  it('手動指定の階層を優先する', () => {
    expect(resolveEffectiveLevel(3, 1, z)).toBe(3);
    expect(resolveEffectiveLevel(1, 20, z)).toBe(1);
  });
  it('自動のときは、ズームレベルの中間点で切り替える', () => {
    expect(resolveEffectiveLevel('auto', 4.5, z)).toBe(1);
    expect(resolveEffectiveLevel('auto', 5.14, z)).toBe(1); // 中間点 5.15 の直前
    expect(resolveEffectiveLevel('auto', 5.15, z)).toBe(2);
    expect(resolveEffectiveLevel('auto', 6.49, z)).toBe(2); // 中間点 6.5 の直前
    expect(resolveEffectiveLevel('auto', 6.5, z)).toBe(3);
  });
});
