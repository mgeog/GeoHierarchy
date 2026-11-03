import { Municipality } from '../../types/geo';
import { CountrySelection } from './apply';

export const ukSelection: CountrySelection = {
  iso3: 'GBR',
  nationalCapital: 'm-uk-lon-01',
  capitals: {
    'uk-lon': 'm-uk-lon-01',
    'uk-sw': 'm-uk-sw-01',
    'uk-ee': 'm-uk-ee-02',
    'uk-wm': 'm-uk-wm-01',
    'uk-em': 'm-uk-em-01',
    'uk-nw': 'm-uk-nw-01',
    'uk-yh': 'm-uk-yh-01',
    'uk-ne': 'm-uk-ne-01',
    'uk-sco': 'm-uk-sco-01',
    'uk-wal': 'm-uk-wal-01',
    'uk-nir': 'm-uk-nir-01',
    'uk-se': 'm-uk-se-03',
  },
  representativeSubs: ['uk-ne', 'uk-nw', 'uk-yh', 'uk-em', 'uk-wm', 'uk-sw', 'uk-se', 'uk-ee'],
  fua: {
    'm-uk-lon-01': 5288,
    'm-uk-nw-01': 3304,
    'm-uk-wm-01': 3799,
    'm-uk-yh-01': 4159,
    'm-uk-sco-02': 955,
    'm-uk-ne-01': 4227,
    'm-uk-nw-02': 2374,
    'm-uk-em-01': 4767,
    'm-uk-sw-01': 3099,
    'm-uk-yh-02': 4460,
    'm-uk-wal-01': 2086,
    'm-uk-nir-01': 242,
    'm-uk-se-02': 5406,
    'm-uk-em-02': 4925,
    'm-uk-sco-01': 2305,
    'm-uk-se-03': 4867,
    'm-uk-ee-02': 5679,
    'm-uk-sw-03': 3912,
    'm-uk-ne-02': 4740,
    'm-uk-wm-02': 4328,
  },
  additions: {
    'uk-se': [
      { id: 'm-uk-se-03', name: 'ポーツマス', nameLocal: 'Portsmouth', nameEn: 'Portsmouth', level: 3, subDivisionId: 'uk-se', macroRegionId: 'uk-england-s', coordinates: [-1.09, 50.82], designation: '地域の代表都市' },
    ],
    'uk-ee': [
      { id: 'm-uk-ee-02', name: 'サウスエンド・オン・シー', nameLocal: 'Southend-on-Sea', nameEn: 'Southend-on-Sea', level: 3, subDivisionId: 'uk-ee', macroRegionId: 'uk-england-s', coordinates: [0.71, 51.54], designation: '地域の代表都市' },
    ],
    'uk-sw': [
      { id: 'm-uk-sw-03', name: 'ボーンマス', nameLocal: 'Bournemouth', nameEn: 'Bournemouth', level: 3, subDivisionId: 'uk-sw', macroRegionId: 'uk-england-s', coordinates: [-1.88, 50.72], designation: '大都市圏の中心都市' },
    ],
    'uk-ne': [
      { id: 'm-uk-ne-02', name: 'ミドルズブラ', nameLocal: 'Middlesbrough', nameEn: 'Middlesbrough', level: 3, subDivisionId: 'uk-ne', macroRegionId: 'uk-england-n', coordinates: [-1.23, 54.57], designation: '大都市圏の中心都市' },
    ],
    'uk-wm': [
      { id: 'm-uk-wm-02', name: 'コヴェントリー', nameLocal: 'Coventry', nameEn: 'Coventry', level: 3, subDivisionId: 'uk-wm', macroRegionId: 'uk-england-n', coordinates: [-1.51, 52.41], designation: '大都市圏の中心都市' },
    ],
  } satisfies Record<string, Municipality[]>,
};
