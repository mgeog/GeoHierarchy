import { describe, expect, it } from 'vitest';
import { selectVisibleLabels } from '../declutter';
import { shuffle } from '../shuffle';
import { buildFeatureIndex, findKeyCollisions, matchSubDivision } from '../featureMatching';
import { COUNTRIES } from '../../data/countries';

describe('shuffle', () => {
  it('要素を保ち、元の配列を変更しない', () => {
    const src = [1, 2, 3, 4, 5, 6, 7, 8];
    const out = shuffle(src);
    expect([...out].sort()).toEqual(src);
    expect(src).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
  it('乱数が決まれば結果も決まり、全順列に到達しうる', () => {
    const seen = new Set<string>();
    let seed = 1;
    const rng = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 400; i++) seen.add(shuffle([1, 2, 3], rng).join());
    expect(seen.size).toBe(6);
  });
});

describe('selectVisibleLabels', () => {
  const box = (id: string, x: number, priority: number, extra = {}) => ({ id, x, y: 0, width: 40, height: 12, priority, ...extra });
  it('重なる場合は優先度の高いものを残す', () => {
    const v = selectVisibleLabels([box('low', 10, 1), box('high', 20, 9)]);
    expect([...v]).toEqual(['high']);
  });
  it('離れていればすべて残す', () => {
    expect(selectVisibleLabels([box('a', 0, 1), box('b', 100, 1)]).size).toBe(2);
  });
  it('forced は重なっても必ず残す', () => {
    const v = selectVisibleLabels([box('a', 0, 9), box('b', 5, 1, { forced: true })]);
    expect(v.has('b')).toBe(true);
  });
});

describe('featureMatching', () => {
  it('全国で、第2階層のキーが衝突しない', () => {
    for (const c of Object.values(COUNTRIES)) expect(findKeyCollisions(c)).toEqual([]);
  });
  it('完全一致で照合し、部分一致では照合しない', () => {
    const jp = COUNTRIES.japan;
    const idx = buildFeatureIndex(jp);
    expect(matchSubDivision({ name: 'Tokyo' }, jp, idx)?.id).toBe('jp-13');
    expect(matchSubDivision({ name: 'Tokyo Bay' }, jp, idx)).toBeUndefined();
    expect(matchSubDivision(null, jp, idx)).toBeUndefined();
  });
});
