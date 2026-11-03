import { CountryAdministrativeData } from '../../types/geo';

export const southKoreaData: CountryAdministrativeData = {
  id: 'south-korea',
  name: '大韓民国 (韓国)',
  nameLocal: '대한민국 (Republic of Korea)',
  nameEn: 'South Korea',
  flag: '🇰🇷',
  center: [127.8, 36.2],
  defaultZoom: 6.6,
  zoomLevels: {
    level1: 6.6,
    level2: 7.6,
    level3: 8.8,
  },
  geoJsonUrl: '/data/south-korea.json',
  geoJsonNameProp: 'name',
  systemDescription: '大韓民国の行政区域は、第1階層として「広域・地方（5大広域生活圏）」、第2階層として「都道府県・州・首府（広域自治団体17市道・道庁所在地）」、第3階層として「主要都市・特別区（ソウル特別市区部、主要都市）」で構成されています。',
  levelNames: {
    level1: { ja: '広域・地方', local: '권역 (5大生活圈)', desc: '首都圏、忠清圏、全羅圏、慶尚圏、江原・済州' },
    level2: { ja: '都道府県・州・首府', local: '광역자치단체 & 도청소재지', desc: 'ソウル特別市、釜山広域市、京畿道等の17広域自治団体および各首府' },
    level3: { ja: '主要都市・特別区', local: '주요도시 & 기초구', desc: 'ソウル特別市各区、水原市、城南市等の主要都市' },
  },
  macroRegions: [
    {
      id: 'kr-capital',
      name: '首都圏 (スドグォン)',
      nameLocal: '수도권 (Sudogwon)',
      nameEn: 'Capital Area',
      level: 1,
      centroid: [127.0, 37.5],
      color: '#d97706', // amber
      description: 'ソウル特別市、仁川広域市、京畿道。韓国全人口の半数以上（約2600万人）が集中する政治・経済・文化の超中核。',
      subDivisionIds: ['kr-seoul', 'kr-gyeonggi', 'kr-incheon'],
    },
    {
      id: 'kr-yeongnam',
      name: '嶺南圏 (慶尚道・釜山)',
      nameLocal: '영남권 (Yeongnam)',
      nameEn: 'Yeongnam',
      level: 1,
      centroid: [128.6, 35.5],
      color: '#0284c7', // sky
      description: '韓国第2の都市圏。東南圏臨海工業地域。釜山港、大邱の繊維・IT、蔚山の自動車・造船。歴史の慶州。',
      subDivisionIds: ['kr-busan', 'kr-daegu', 'kr-gyeongnam'],
    },
    {
      id: 'kr-honam',
      name: '湖南圏 (全羅道・光州)',
      nameLocal: '호남권 (Honam)',
      nameEn: 'Honam',
      level: 1,
      centroid: [126.9, 35.1],
      color: '#059669', // emerald
      description: '食文化と伝統芸術の地。光州ビエンナーレ、全州ビビンバ・韓屋村、麗水（ヨス）の海洋観光。',
      subDivisionIds: ['kr-gwangju', 'kr-jeonbuk'],
    },
    {
      id: 'kr-chungcheong',
      name: '忠清圏 (大田・世宗)',
      nameLocal: '충청권 (Chungcheong)',
      nameEn: 'Chungcheong',
      level: 1,
      centroid: [127.3, 36.4],
      color: '#7c3aed', // violet
      description: '韓国の地理的中央部。中央省庁が移転した行政首都・世宗、科学技術研究都市・大田（大徳研究団地）。',
      subDivisionIds: ['kr-daejeon', 'kr-sejong'],
    },
    {
      id: 'kr-jeju',
      name: '済州特別自治道',
      nameLocal: '제주특별자치도',
      nameEn: 'Jeju Island',
      level: 1,
      centroid: [126.5, 33.4],
      color: '#14b8a6', // teal
      description: '韓国最南端の火山島。世界自然遺産・漢拏山（ハルラサン）とエメラルドグリーンの海。',
      subDivisionIds: ['kr-jeju-div'],
    },
  ],
  subDivisions: [
    // Seoul
    {
      id: 'kr-seoul',
      code: '11',
      name: 'ソウル特別市',
      nameLocal: '서울특별시 (Seoul)',
      nameEn: 'Seoul Special City',
      level: 2,
      macroRegionId: 'kr-capital',
      capitalCity: '中区 (鍾路・明洞)',
      centroid: [126.98, 37.56],
      population: 9400000,
      areaKm2: 605,
      mnemonic: '漢江（ハンガン）を挟む韓国の首都。人口約940万。景福宮、Nソウルタワー、明洞、江南。',
      geoCoordinates: [
        [
          [126.8, 37.6], [127.15, 37.6], [127.15, 37.45], [126.8, 37.45], [126.8, 37.6]
        ]
      ],
      municipalities: [
        { id: 'm-kr-seoul-01', name: 'ソウル特別市都心 (鍾路・中区)', nameLocal: '종로구 / 중구', nameEn: 'Jongno & Jung District', level: 3, subDivisionId: 'kr-seoul', macroRegionId: 'kr-capital', coordinates: [126.98, 37.57], population: 260000, isCapital: true, isPrefecturalCapital: true, designation: '歴史都心部', notableFor: ['景福宮', '光化門広場', '明洞', '東大門市場'] },
        { id: 'm-kr-seoul-02', name: '江南区 (カンナム)', nameLocal: '강남구 (Gangnam)', nameEn: 'Gangnam District', level: 3, subDivisionId: 'kr-seoul', macroRegionId: 'kr-capital', coordinates: [127.04, 37.51], population: 530000, designation: '経済・先端ビジネス街', notableFor: ['COEX', 'テヘラン路 (IT街)', 'K-POPの中心'] }
      ]
    },
    // Gyeonggi-do
    {
      id: 'kr-gyeonggi',
      code: '41',
      name: '京畿道 (キョンギド)',
      nameLocal: '경기도 (Gyeonggi-do)',
      nameEn: 'Gyeonggi-do',
      level: 2,
      macroRegionId: 'kr-capital',
      capitalCity: '水原市 (Suwon)',
      centroid: [127.2, 37.3],
      population: 13600000,
      areaKm2: 10184,
      mnemonic: 'ソウルを取り囲む韓国最大の人口（約1360万人）を有する道。サムスン電子やLGの先端半導体・IT団地。',
      geoCoordinates: [
        [
          [126.6, 38.0], [127.6, 38.0], [127.8, 37.0], [126.8, 37.0], [126.6, 37.4],
          [126.6, 38.0]
        ]
      ],
      municipalities: [
        { id: 'm-kr-gyeonggi-01', name: '水原市 (スウォン)', nameLocal: '수원시 (Suwon)', nameEn: 'Suwon', level: 3, subDivisionId: 'kr-gyeonggi', macroRegionId: 'kr-capital', coordinates: [127.02, 37.26], population: 1190000, isPrefecturalCapital: true, designation: '特例市 (人口100万以上)', notableFor: ['世界遺産・水原華城', 'サムスン電子本社', '水原カルビ'] },
        { id: 'm-kr-gyeonggi-02', name: '城南市 (ソンナム / 板橋)', nameLocal: '성남시 (Seongnam / Pangyo)', nameEn: 'Seongnam', level: 3, subDivisionId: 'kr-gyeonggi', macroRegionId: 'kr-capital', coordinates: [127.12, 37.42], population: 920000, designation: '先端IT都市', notableFor: ['板橋テクノバレー (韓国のシリコンバレー)', 'ネイバー・カカオ本社'] }
      ]
    },
    // Busan
    {
      id: 'kr-busan',
      code: '26',
      name: '釜山広域市 (プサン)',
      nameLocal: '부산광역시 (Busan)',
      nameEn: 'Busan Metropolitan City',
      level: 2,
      macroRegionId: 'kr-yeongnam',
      capitalCity: '蓮堤区 (釜山市庁)',
      centroid: [129.07, 35.18],
      population: 3300000,
      areaKm2: 770,
      mnemonic: '韓国第2のメガシティにして世界有数のコンテナ港。海雲台（ヘウンデ）ビーチと国際映画祭。',
      geoCoordinates: [
        [
          [128.8, 35.3], [129.3, 35.3], [129.3, 35.0], [128.8, 35.0], [128.8, 35.3]
        ]
      ],
      municipalities: [
        { id: 'm-kr-busan-01', name: '釜山市中心・海雲台', nameLocal: '부산 도심 & 해운대', nameEn: 'Busan & Haeundae', level: 3, subDivisionId: 'kr-busan', macroRegionId: 'kr-yeongnam', coordinates: [129.07, 35.18], population: 3300000, isPrefecturalCapital: true, designation: '広域市', notableFor: ['海雲台海水浴場', 'チャガルチ市場', '釜山国際映画祭 (BIFF)'] }
      ]
    },
    // Daejeon & Sejong
    {
      id: 'kr-daejeon',
      code: '30',
      name: '大田広域市 (テジョン)',
      nameLocal: '대전광역시 (Daejeon)',
      nameEn: 'Daejeon Metropolitan City',
      level: 2,
      macroRegionId: 'kr-chungcheong',
      capitalCity: '西区 (大田市庁)',
      centroid: [127.38, 36.35],
      population: 1450000,
      areaKm2: 540,
      mnemonic: '韓国の科学技術の中心地。「大徳研究開発特区」とKAIST（韓国科学技術院）。交通の結節点。',
      geoCoordinates: [
        [
          [127.25, 36.45], [127.5, 36.45], [127.5, 36.25], [127.25, 36.25], [127.25, 36.45]
        ]
      ],
      municipalities: [
        { id: 'm-kr-daejeon-01', name: '大田', nameLocal: '대전 (Daejeon)', nameEn: 'Daejeon', level: 3, subDivisionId: 'kr-daejeon', macroRegionId: 'kr-chungcheong', coordinates: [127.38, 36.35], population: 1450000, isPrefecturalCapital: true, designation: '広域市', notableFor: ['大徳研究団地', 'KAIST', 'エキスポ科学公園'] }
      ]
    },
    // Jeju
    {
      id: 'kr-jeju-div',
      code: '50',
      name: '済州特別自治道',
      nameLocal: '제주특별자치도 (Jeju)',
      nameEn: 'Jeju Special Self-Governing Province',
      level: 2,
      macroRegionId: 'kr-jeju',
      capitalCity: '済州市',
      centroid: [126.53, 33.36],
      population: 680000,
      areaKm2: 1850,
      mnemonic: '高度な自治権を持つ特別自治道。トルハルバンの石像、みかん、城山日出峰。',
      geoCoordinates: [
        [
          [126.2, 33.3], [126.5, 33.6], [126.9, 33.5], [126.7, 33.2], [126.2, 33.3]
        ]
      ],
      municipalities: [
        { id: 'm-kr-jeju-01', name: '済州市', nameLocal: '제주시 (Jeju City)', nameEn: 'Jeju City', level: 3, subDivisionId: 'kr-jeju-div', macroRegionId: 'kr-jeju', coordinates: [126.53, 33.49], population: 490000, isPrefecturalCapital: true, designation: '行政市', notableFor: ['済州国際空港', '東門市場', '龍頭岩'] },
        { id: 'm-kr-jeju-02', name: '西帰浦市 (ソギポ)', nameLocal: '서귀포시 (Seogwipo)', nameEn: 'Seogwipo', level: 3, subDivisionId: 'kr-jeju-div', macroRegionId: 'kr-jeju', coordinates: [126.56, 33.25], population: 190000, designation: '行政市', notableFor: ['中文観光団地', '正房の滝', '城山日出峰近傍'] }
      ]
    }
  ]
};
