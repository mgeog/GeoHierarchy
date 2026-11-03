import { Municipality } from '../../types/geo';
import { CountrySelection } from './apply';

export const germanySelection: CountrySelection = {
  iso3: 'DEU',
  nationalCapital: 'm-de-be-01',
  capitals: {
    'de-by': 'm-de-by-01',
    'de-bw': 'm-de-bw-01',
    'de-nw': 'm-de-nw-02',
    'de-rp': 'm-de-rp-01',
    'de-sl': 'm-de-sl-01',
    'de-ni': 'm-de-ni-01',
    'de-sh': 'm-de-sh-01',
    'de-hh': 'm-de-hh-01',
    'de-hb': 'm-de-hb-01',
    'de-mv': 'm-de-mv-01',
    'de-be': 'm-de-be-01',
    'de-bb': 'm-de-bb-01',
    'de-sn': 'm-de-sn-01',
    'de-st': 'm-de-st-01',
    'de-th': 'm-de-th-01',
    'de-he': 'm-de-he-02',
  },
  fua: {
    'm-de-nw-03': 536,
    'm-de-be-01': 4946,
    'm-de-nw-01': 1064,
    'm-de-he-01': 3093,
    'm-de-hh-01': 3793,
    'm-de-by-01': 4736,
    'm-de-bw-01': 3580,
    'm-de-by-02': 4454,
    'm-de-ni-01': 3667,
    'm-de-nw-02': 815,
    'm-de-sn-01': 4996,
    'm-de-hb-01': 2877,
    'm-de-sn-02': 4788,
    'm-de-sl-01': 1287,
    'm-de-bw-02': 3041,
    'm-de-bw-03': 2988,
    'm-de-nw-04': 1178,
    'm-de-nw-05': 2818,
    'm-de-nw-06': 388,
    'm-de-by-03': 4520,
  },
  additions: {
    'de-he': [
      { id: 'm-de-he-02', name: 'ヴィースバーデン', nameLocal: 'Wiesbaden', nameEn: 'Wiesbaden', level: 3, subDivisionId: 'de-he', macroRegionId: 'de-west', coordinates: [8.24, 50.08], designation: '州都' },
    ],
    'de-bw': [
      { id: 'm-de-bw-02', name: 'マンハイム', nameLocal: 'Mannheim', nameEn: 'Mannheim', level: 3, subDivisionId: 'de-bw', macroRegionId: 'de-south', coordinates: [8.47, 49.49], designation: '大都市圏の中心都市' },
      { id: 'm-de-bw-03', name: 'カールスルーエ', nameLocal: 'Karlsruhe', nameEn: 'Karlsruhe', level: 3, subDivisionId: 'de-bw', macroRegionId: 'de-south', coordinates: [8.4, 49.01], designation: '大都市圏の中心都市' },
    ],
    'de-nw': [
      { id: 'm-de-nw-04', name: 'ヴッパータール', nameLocal: 'Wuppertal', nameEn: 'Wuppertal', level: 3, subDivisionId: 'de-nw', macroRegionId: 'de-west', coordinates: [7.15, 51.26], designation: '大都市圏の中心都市' },
      { id: 'm-de-nw-05', name: 'ビーレフェルト', nameLocal: 'Bielefeld', nameEn: 'Bielefeld', level: 3, subDivisionId: 'de-nw', macroRegionId: 'de-west', coordinates: [8.53, 52.02], designation: '大都市圏の中心都市' },
      { id: 'm-de-nw-06', name: 'メンヒェングラートバッハ', nameLocal: 'Mönchengladbach', nameEn: 'Mönchengladbach', level: 3, subDivisionId: 'de-nw', macroRegionId: 'de-west', coordinates: [6.44, 51.2], designation: '大都市圏の中心都市' },
    ],
    'de-by': [
      { id: 'm-de-by-03', name: 'アウクスブルク', nameLocal: 'Augsburg', nameEn: 'Augsburg', level: 3, subDivisionId: 'de-by', macroRegionId: 'de-south', coordinates: [10.9, 48.37], designation: '大都市圏の中心都市' },
    ],
  } satisfies Record<string, Municipality[]>,
};
