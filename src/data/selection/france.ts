import { Municipality } from '../../types/geo';
import { CountrySelection } from './apply';

export const franceSelection: CountrySelection = {
  iso3: 'FRA',
  nationalCapital: 'm-fr-idf-01',
  capitals: {
    'fr-idf': 'm-fr-idf-01',
    'fr-hdf': 'm-fr-hdf-01',
    'fr-ges': 'm-fr-ges-01',
    'fr-bre': 'm-fr-bre-01',
    'fr-nor': 'm-fr-nor-01',
    'fr-pdl': 'm-fr-pdl-01',
    'fr-cvl': 'm-fr-cvl-01',
    'fr-naq': 'm-fr-naq-01',
    'fr-ara': 'm-fr-ara-01',
    'fr-bfc': 'm-fr-bfc-01',
    'fr-pac': 'm-fr-pac-01',
    'fr-occ': 'm-fr-occ-01',
    'fr-cor': 'm-fr-cor-01',
  },
  fua: {
    'm-fr-idf-01': 2702,
    'm-fr-ara-01': 3718,
    'm-fr-pac-01': 3911,
    'm-fr-occ-01': 2304,
    'm-fr-pac-02': 4426,
    'm-fr-hdf-01': 3200,
    'm-fr-naq-01': 1397,
    'm-fr-pdl-01': 954,
    'm-fr-ges-01': 4558,
    'm-fr-nor-01': 2159,
    'm-fr-occ-02': 3541,
    'm-fr-ara-02': 3984,
    'm-fr-bre-01': 824,
    'm-fr-cvl-02': 2085,
    'm-fr-hdf-02': 2993,
    'm-fr-pac-03': 4158,
    'm-fr-pac-04': 3759,
    'm-fr-ges-03': 4393,
    'm-fr-ara-03': 3628,
    'm-fr-ara-04': 3353,
  },
  additions: {
    'fr-hdf': [
      { id: 'm-fr-hdf-02', name: 'ランス (Lens)', nameLocal: 'Lens', nameEn: 'Lens', level: 3, subDivisionId: 'fr-hdf', macroRegionId: 'fr-paris', coordinates: [2.83, 50.43], designation: '大都市圏の中心都市' },
    ],
    'fr-pac': [
      { id: 'm-fr-pac-03', name: 'トゥーロン', nameLocal: 'Toulon', nameEn: 'Toulon', level: 3, subDivisionId: 'fr-pac', macroRegionId: 'fr-south', coordinates: [5.93, 43.12], designation: '大都市圏の中心都市' },
      { id: 'm-fr-pac-04', name: 'アヴィニョン', nameLocal: 'Avignon', nameEn: 'Avignon', level: 3, subDivisionId: 'fr-pac', macroRegionId: 'fr-south', coordinates: [4.81, 43.95], designation: '大都市圏の中心都市' },
    ],
    'fr-ges': [
      { id: 'm-fr-ges-03', name: 'ミュルーズ', nameLocal: 'Mulhouse', nameEn: 'Mulhouse', level: 3, subDivisionId: 'fr-ges', macroRegionId: 'fr-paris', coordinates: [7.34, 47.75], designation: '大都市圏の中心都市' },
    ],
    'fr-ara': [
      { id: 'm-fr-ara-03', name: 'サンテティエンヌ', nameLocal: 'Saint-Étienne', nameEn: 'Saint-Étienne', level: 3, subDivisionId: 'fr-ara', macroRegionId: 'fr-east', coordinates: [4.39, 45.44], designation: '大都市圏の中心都市' },
      { id: 'm-fr-ara-04', name: 'クレルモン＝フェラン', nameLocal: 'Clermont-Ferrand', nameEn: 'Clermont-Ferrand', level: 3, subDivisionId: 'fr-ara', macroRegionId: 'fr-east', coordinates: [3.09, 45.78], designation: '大都市圏の中心都市' },
    ],
  } satisfies Record<string, Municipality[]>,
};
