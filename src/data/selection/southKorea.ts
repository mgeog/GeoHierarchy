import { Municipality } from '../../types/geo';
import { CountrySelection } from './apply';

export const southKoreaSelection: CountrySelection = {
  iso3: 'KOR',
  nationalCapital: 'm-kr-seoul-01',
  capitals: {
    'kr-seoul': 'm-kr-seoul-01',
    'kr-busan': 'm-kr-busan-01',
    'kr-daegu': 'm-kr-daegu-01',
    'kr-incheon': 'm-kr-incheon-01',
    'kr-jeonnam-gwangju': 'm-kr-jeonnam-gwangju-01',
    'kr-daejeon': 'm-kr-daejeon-01',
    'kr-ulsan': 'm-kr-ulsan-01',
    'kr-sejong': 'm-kr-sejong-01',
    'kr-gyeonggi': 'm-kr-gyeonggi-01',
    'kr-gangwon': 'm-kr-gangwon-01',
    'kr-chungbuk': 'm-kr-chungbuk-01',
    'kr-chungnam': 'm-kr-chungnam-01',
    'kr-jeonbuk': 'm-kr-jeonbuk-01',
    'kr-gyeongbuk': 'm-kr-gyeongbuk-01',
    'kr-gyeongnam': 'm-kr-gyeongnam-01',
    'kr-jeju': 'm-kr-jeju-01',
  },
  representativeSubs: ['kr-jeonnam-gwangju'],
  fua: {
    'm-kr-seoul-01': 94,
    'm-kr-busan-01': 3057,
    'm-kr-daegu-01': 2453,
    'm-kr-jeonnam-gwangju-01': 2246,
    'm-kr-daejeon-01': 1782,
    'm-kr-ulsan-01': 3211,
    'm-kr-gangwon-01': 573,
    'm-kr-chungbuk-01': 1604,
    'm-kr-jeonbuk-01': 2098,
    'm-kr-gyeongnam-01': 2835,
    'm-kr-chungnam-02': 1206,
    'm-kr-gyeongbuk-02': 2775,
    'm-kr-gyeongbuk-03': 2316,
    'm-kr-gyeongnam-02': 2651,
    'm-kr-jeonnam-gwangju-02': 2172,
    'm-kr-jeonnam-gwangju-03': 2385,
    'm-kr-gyeonggi-02': 271,
    'm-kr-gangwon-02': 1415,
    'm-kr-jeonbuk-02': 1512,
    'm-kr-jeonbuk-03': 1867,
  },
  additions: {
    'kr-seoul': [
      { id: 'm-kr-seoul-01', name: 'ソウル', nameLocal: '서울', nameEn: 'Seoul', level: 3, subDivisionId: 'kr-seoul', macroRegionId: 'kr-region-capital', coordinates: [126.978, 37.5665], designation: '首都・特別市' },
    ],
    'kr-busan': [
      { id: 'm-kr-busan-01', name: '釜山', nameLocal: '부산', nameEn: 'Busan', level: 3, subDivisionId: 'kr-busan', macroRegionId: 'kr-region-yeongnam', coordinates: [129.0756, 35.1796], designation: '広域市' },
    ],
    'kr-daegu': [
      { id: 'm-kr-daegu-01', name: '大邱', nameLocal: '대구', nameEn: 'Daegu', level: 3, subDivisionId: 'kr-daegu', macroRegionId: 'kr-region-yeongnam', coordinates: [128.6014, 35.8714], designation: '広域市' },
    ],
    'kr-incheon': [
      { id: 'm-kr-incheon-01', name: '仁川', nameLocal: '인천', nameEn: 'Incheon', level: 3, subDivisionId: 'kr-incheon', macroRegionId: 'kr-region-capital', coordinates: [126.7052, 37.4563], designation: '広域市' },
    ],
    'kr-jeonnam-gwangju': [
      { id: 'm-kr-jeonnam-gwangju-01', name: '光州', nameLocal: '광주', nameEn: 'Gwangju', level: 3, subDivisionId: 'kr-jeonnam-gwangju', macroRegionId: 'kr-region-honam', coordinates: [126.8526, 35.1595], designation: '旧・広域市。統合後の特別市の代表都市' },
      { id: 'm-kr-jeonnam-gwangju-02', name: '木浦', nameLocal: '목포', nameEn: 'Mokpo', level: 3, subDivisionId: 'kr-jeonnam-gwangju', macroRegionId: 'kr-region-honam', coordinates: [126.3922, 34.8118], designation: '大都市圏の中心都市' },
      { id: 'm-kr-jeonnam-gwangju-03', name: '順天', nameLocal: '순천', nameEn: 'Suncheon', level: 3, subDivisionId: 'kr-jeonnam-gwangju', macroRegionId: 'kr-region-honam', coordinates: [127.4872, 34.9507], designation: '大都市圏の中心都市' },
    ],
    'kr-daejeon': [
      { id: 'm-kr-daejeon-01', name: '大田', nameLocal: '대전', nameEn: 'Daejeon', level: 3, subDivisionId: 'kr-daejeon', macroRegionId: 'kr-region-chungcheong', coordinates: [127.3845, 36.3504], designation: '広域市' },
    ],
    'kr-ulsan': [
      { id: 'm-kr-ulsan-01', name: '蔚山', nameLocal: '울산', nameEn: 'Ulsan', level: 3, subDivisionId: 'kr-ulsan', macroRegionId: 'kr-region-yeongnam', coordinates: [129.3114, 35.5384], designation: '広域市' },
    ],
    'kr-sejong': [
      { id: 'm-kr-sejong-01', name: '世宗', nameLocal: '세종', nameEn: 'Sejong', level: 3, subDivisionId: 'kr-sejong', macroRegionId: 'kr-region-chungcheong', coordinates: [127.289, 36.48], designation: '特別自治市' },
    ],
    'kr-gyeonggi': [
      { id: 'm-kr-gyeonggi-01', name: '水原', nameLocal: '수원', nameEn: 'Suwon', level: 3, subDivisionId: 'kr-gyeonggi', macroRegionId: 'kr-region-capital', coordinates: [127.0286, 37.2636], designation: '道庁所在地' },
      { id: 'm-kr-gyeonggi-02', name: '東豆川', nameLocal: '동두천', nameEn: 'Dongducheon', level: 3, subDivisionId: 'kr-gyeonggi', macroRegionId: 'kr-region-capital', coordinates: [127.0606, 37.9036], designation: '大都市圏の中心都市' },
    ],
    'kr-gangwon': [
      { id: 'm-kr-gangwon-01', name: '春川', nameLocal: '춘천', nameEn: 'Chuncheon', level: 3, subDivisionId: 'kr-gangwon', macroRegionId: 'kr-region-gangwon', coordinates: [127.7298, 37.8813], designation: '道庁所在地' },
      { id: 'm-kr-gangwon-02', name: '原州', nameLocal: '원주', nameEn: 'Wonju', level: 3, subDivisionId: 'kr-gangwon', macroRegionId: 'kr-region-gangwon', coordinates: [127.9202, 37.3422], designation: '大都市圏の中心都市' },
    ],
    'kr-chungbuk': [
      { id: 'm-kr-chungbuk-01', name: '清州', nameLocal: '청주', nameEn: 'Cheongju', level: 3, subDivisionId: 'kr-chungbuk', macroRegionId: 'kr-region-chungcheong', coordinates: [127.489, 36.6424], designation: '道庁所在地' },
    ],
    'kr-chungnam': [
      { id: 'm-kr-chungnam-01', name: '洪城', nameLocal: '홍성', nameEn: 'Hongseong', level: 3, subDivisionId: 'kr-chungnam', macroRegionId: 'kr-region-chungcheong', coordinates: [126.66, 36.601], designation: '道庁所在地（郡）' },
      { id: 'm-kr-chungnam-02', name: '天安', nameLocal: '천안', nameEn: 'Cheonan', level: 3, subDivisionId: 'kr-chungnam', macroRegionId: 'kr-region-chungcheong', coordinates: [127.1139, 36.8151], designation: '大都市圏の中心都市' },
    ],
    'kr-jeonbuk': [
      { id: 'm-kr-jeonbuk-01', name: '全州', nameLocal: '전주', nameEn: 'Jeonju', level: 3, subDivisionId: 'kr-jeonbuk', macroRegionId: 'kr-region-honam', coordinates: [127.148, 35.8242], designation: '道庁所在地' },
      { id: 'm-kr-jeonbuk-02', name: '群山', nameLocal: '군산', nameEn: 'Gunsan', level: 3, subDivisionId: 'kr-jeonbuk', macroRegionId: 'kr-region-honam', coordinates: [126.7369, 35.9676], designation: '大都市圏の中心都市' },
      { id: 'm-kr-jeonbuk-03', name: '益山', nameLocal: '익산', nameEn: 'Iksan', level: 3, subDivisionId: 'kr-jeonbuk', macroRegionId: 'kr-region-honam', coordinates: [126.9577, 35.9483], designation: '大都市圏の中心都市' },
    ],
    'kr-gyeongbuk': [
      { id: 'm-kr-gyeongbuk-01', name: '安東', nameLocal: '안동', nameEn: 'Andong', level: 3, subDivisionId: 'kr-gyeongbuk', macroRegionId: 'kr-region-yeongnam', coordinates: [128.7294, 36.5684], designation: '道庁所在地' },
      { id: 'm-kr-gyeongbuk-02', name: '浦項', nameLocal: '포항', nameEn: 'Pohang', level: 3, subDivisionId: 'kr-gyeongbuk', macroRegionId: 'kr-region-yeongnam', coordinates: [129.3435, 36.019], designation: '大都市圏の中心都市' },
      { id: 'm-kr-gyeongbuk-03', name: '亀尾', nameLocal: '구미', nameEn: 'Gumi', level: 3, subDivisionId: 'kr-gyeongbuk', macroRegionId: 'kr-region-yeongnam', coordinates: [128.3446, 36.1195], designation: '大都市圏の中心都市' },
    ],
    'kr-gyeongnam': [
      { id: 'm-kr-gyeongnam-01', name: '昌原', nameLocal: '창원', nameEn: 'Changwon', level: 3, subDivisionId: 'kr-gyeongnam', macroRegionId: 'kr-region-yeongnam', coordinates: [128.6811, 35.228], designation: '道庁所在地' },
      { id: 'm-kr-gyeongnam-02', name: '晋州', nameLocal: '진주', nameEn: 'Jinju', level: 3, subDivisionId: 'kr-gyeongnam', macroRegionId: 'kr-region-yeongnam', coordinates: [128.1076, 35.18], designation: '大都市圏の中心都市' },
    ],
    'kr-jeju': [
      { id: 'm-kr-jeju-01', name: '済州', nameLocal: '제주', nameEn: 'Jeju', level: 3, subDivisionId: 'kr-jeju', macroRegionId: 'kr-region-jeju', coordinates: [126.5312, 33.4996], designation: '道庁所在地' },
    ],
  } satisfies Record<string, Municipality[]>,
};
