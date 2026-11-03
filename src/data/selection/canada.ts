import { Municipality } from '../../types/geo';
import { CountrySelection } from './apply';

export const canadaSelection: CountrySelection = {
  iso3: 'CAN',
  nationalCapital: 'm-ca-on-02',
  capitals: {
    'ca-on': 'm-ca-on-01',
    'ca-qc': 'm-ca-qc-02',
    'ca-bc': 'm-ca-bc-02',
    'ca-ab': 'm-ca-ab-02',
    'ca-sk': 'm-ca-sk-02',
    'ca-mb': 'm-ca-mb-01',
    'ca-ns': 'm-ca-ns-01',
    'ca-nb': 'm-ca-nb-01',
    'ca-nl': 'm-ca-nl-01',
    'ca-pe': 'm-ca-pe-01',
    'ca-nt': 'm-ca-nt-01',
    'ca-nu': 'm-ca-nu-01',
    'ca-yt': 'm-ca-yt-01',
  },
  fua: {
    'm-ca-on-01': 2626,
    'm-ca-qc-01': 3485,
    'm-ca-bc-01': 375,
    'm-ca-ab-01': 1276,
    'm-ca-on-02': 3343,
    'm-ca-ab-02': 1572,
    'm-ca-qc-02': 3789,
    'm-ca-mb-01': 1837,
    'm-ca-ns-01': 3865,
    'm-ca-bc-02': 28,
    'm-ca-sk-01': 1751,
    'm-ca-sk-02': 1663,
    'm-ca-nl-01': 3902,
    'm-ca-on-03': 2360,
    'm-ca-on-04': 2220,
    'm-ca-on-05': 1996,
    'm-ca-on-06': 2751,
    'm-ca-on-07': 3035,
    'm-ca-qc-03': 3709,
    'm-ca-bc-03': 934,
  },
  additions: {
    'ca-on': [
      { id: 'm-ca-on-03', name: 'キッチナー', nameLocal: 'Kitchener', nameEn: 'Kitchener', level: 3, subDivisionId: 'ca-on', macroRegionId: 'ca-central', coordinates: [-80.49, 43.45], designation: '大都市圏の中心都市' },
      { id: 'm-ca-on-04', name: 'ロンドン (オンタリオ州)', nameLocal: 'London', nameEn: 'London (Ontario)', level: 3, subDivisionId: 'ca-on', macroRegionId: 'ca-central', coordinates: [-81.25, 42.98], designation: '大都市圏の中心都市' },
      { id: 'm-ca-on-05', name: 'ウィンザー', nameLocal: 'Windsor', nameEn: 'Windsor', level: 3, subDivisionId: 'ca-on', macroRegionId: 'ca-central', coordinates: [-83.03, 42.31], designation: '大都市圏の中心都市' },
      { id: 'm-ca-on-06', name: 'セントキャサリンズ', nameLocal: 'St. Catharines', nameEn: 'St. Catharines', level: 3, subDivisionId: 'ca-on', macroRegionId: 'ca-central', coordinates: [-79.25, 43.16], designation: '大都市圏の中心都市' },
      { id: 'm-ca-on-07', name: 'バリー', nameLocal: 'Barrie', nameEn: 'Barrie', level: 3, subDivisionId: 'ca-on', macroRegionId: 'ca-central', coordinates: [-79.69, 44.39], designation: '大都市圏の中心都市' },
    ],
    'ca-qc': [
      { id: 'm-ca-qc-03', name: 'シャーブルック', nameLocal: 'Sherbrooke', nameEn: 'Sherbrooke', level: 3, subDivisionId: 'ca-qc', macroRegionId: 'ca-central', coordinates: [-71.89, 45.4], designation: '大都市圏の中心都市' },
    ],
    'ca-bc': [
      { id: 'm-ca-bc-03', name: 'アボッツフォード', nameLocal: 'Abbotsford', nameEn: 'Abbotsford', level: 3, subDivisionId: 'ca-bc', macroRegionId: 'ca-west', coordinates: [-122.3, 49.05], designation: '大都市圏の中心都市' },
    ],
  } satisfies Record<string, Municipality[]>,
};
