import { CountryAdministrativeData } from '../../types/geo';

export const germanyData: CountryAdministrativeData = {
  id: 'germany',
  name: 'ドイツ連邦共和国',
  nameLocal: 'Bundesrepublik Deutschland',
  nameEn: 'Germany',
  flag: '🇩🇪',
  center: [10.4, 51.1],
  defaultZoom: 5.4,
  zoomLevels: {
    level1: 5.4,
    level2: 6.4,
    level3: 7.5,
  },
  geoJsonUrl: '/data/germany.json',
  geoJsonNameProp: 'name',
  systemDescription: 'ドイツは連邦制国家であり、第1階層として伝統的な「広域・地方（4大地域区分）」、第2階層として強い自治権を持つ「都道府県・州・首府（16連邦州・州都）」、第3階層として「主要都市・特別区（ベルリン等の都市州、主要独立市）」で構成されています。',
  levelNames: {
    level1: { ja: '広域・地方', local: 'Regionen (4)', desc: '北部、西部、南部、東部の地理・経済ブロック' },
    level2: { ja: '都道府県・州・首府', local: 'Bundesländer & Hauptstädte', desc: 'バイエルン、NRW等16連邦州および各州都' },
    level3: { ja: '主要都市・特別区', local: 'Metropolen & Städte', desc: 'ベルリン特別市、ミュンヘン、ハンブルク等の主要都市' },
  },
  projectionConfig: {
    type: 'conicConformal',
    center: [10.4, 51.1],
    parallels: [48, 54],
    scaleMultiplier: 3300,
  },
  macroRegions: [
    {
      id: 'de-north',
      name: '北部ドイツ',
      nameLocal: 'Norddeutschland',
      nameEn: 'Northern Germany',
      level: 1,
      centroid: [9.8, 53.6],
      color: '#0284c7',
      description: '北海・バルト海に面する海洋・貿易の地。ハンザ同盟の歴史と低地平原。ハンブルク、ブレーメン。',
      subDivisionIds: ['de-hh', 'de-ni', 'de-sh', 'de-hb', 'de-mv'],
      population: 15300000,
    },
    {
      id: 'de-west',
      name: '西部ドイツ',
      nameLocal: 'Westdeutschland',
      nameEn: 'Western Germany',
      level: 1,
      centroid: [7.2, 51.0],
      color: '#ea580c',
      description: 'ライン川流域の工業・金融の中心。人口最大のNRW州（ルール地方）や金融都市フランクフルト。',
      subDivisionIds: ['de-nw', 'de-he', 'de-rp', 'de-sl'],
      population: 29200000,
    },
    {
      id: 'de-south',
      name: '南部ドイツ',
      nameLocal: 'Süddeutschland',
      nameEn: 'Southern Germany',
      level: 1,
      centroid: [10.5, 48.5],
      color: '#059669',
      description: 'バイエルンとバーデン＝ヴュルテンベルク。アルプスと黒い森、自動車（BMW/ベンツ/ポルシェ）などハイテク産業。',
      subDivisionIds: ['de-by', 'de-bw'],
      population: 24500000,
    },
    {
      id: 'de-east',
      name: '東部ドイツ',
      nameLocal: 'Ostdeutschland',
      nameEn: 'Eastern Germany',
      level: 1,
      centroid: [12.8, 52.0],
      color: '#7c3aed',
      description: '旧東ドイツ地域と首都ベルリン。文化・学術の伝統と再興するスタートアップ・半導体産業。',
      subDivisionIds: ['de-be', 'de-sn', 'de-bb', 'de-st', 'de-th'],
      population: 16200000,
    },
  ],
  subDivisions: [
    // South (2)
    {
      id: 'de-by', code: 'BY', name: 'バイエルン州', nameLocal: 'Bayern', nameEn: 'Bavaria', level: 2,
      macroRegionId: 'de-south', capitalCity: 'ミュンヘン (München)', centroid: [11.5, 48.8], population: 13300000, areaKm2: 70542,
      mnemonic: 'ドイツ最大の面積を誇る南部の自由州。アルプス山脈、ノイシュヴァンシュタイン城、BMW、オクトーバーフェスト。',
      municipalities: [
        { id: 'm-de-by-01', name: 'ミュンヘン', nameLocal: 'München', nameEn: 'Munich', level: 3, subDivisionId: 'de-by', macroRegionId: 'de-south', coordinates: [11.58, 48.14], population: 1510000, isPrefecturalCapital: true, designation: '州都', notableFor: ['BMW本社', 'オクトーバーフェスト'] },
        { id: 'm-de-by-02', name: 'ニュルンベルク', nameLocal: 'Nürnberg', nameEn: 'Nuremberg', level: 3, subDivisionId: 'de-by', macroRegionId: 'de-south', coordinates: [11.08, 49.45], population: 520000, designation: 'フランケン地方中核' }
      ]
    },
    {
      id: 'de-bw', code: 'BW', name: 'バーデン＝ヴュルテンベルク州', nameLocal: 'Baden-Württemberg', nameEn: 'Baden-Württemberg', level: 2,
      macroRegionId: 'de-south', capitalCity: 'シュトゥットガルト (Stuttgart)', centroid: [9.2, 48.5], population: 11200000, areaKm2: 35751,
      mnemonic: '南西部の工業先進州。「黒い森」とライン川。ベンツとポルシェの本拠地。',
      municipalities: [
        { id: 'm-de-bw-01', name: 'シュトゥットガルト', nameLocal: 'Stuttgart', nameEn: 'Stuttgart', level: 3, subDivisionId: 'de-bw', macroRegionId: 'de-south', coordinates: [9.18, 48.78], population: 630000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    // West (4)
    {
      id: 'de-nw', code: 'NW', name: 'ノルトライン＝ヴェストファーレン州', nameLocal: 'Nordrhein-Westfalen', nameEn: 'North Rhine-Westphalia', level: 2,
      macroRegionId: 'de-west', capitalCity: 'デュッセルドルフ (Düsseldorf)', centroid: [7.5, 51.5], population: 17900000, areaKm2: 34110,
      mnemonic: '全連邦州中最多の人口（約1800万人）。ルール工業地帯、世界遺産ケルン大聖堂、デュッセルドルフ。',
      municipalities: [
        { id: 'm-de-nw-01', name: 'ケルン', nameLocal: 'Köln', nameEn: 'Cologne', level: 3, subDivisionId: 'de-nw', macroRegionId: 'de-west', coordinates: [6.96, 50.94], population: 1080000, designation: '最大都市', notableFor: ['ケルン大聖堂'] },
        { id: 'm-de-nw-02', name: 'デュッセルドルフ', nameLocal: 'Düsseldorf', nameEn: 'Dusseldorf', level: 3, subDivisionId: 'de-nw', macroRegionId: 'de-west', coordinates: [6.78, 51.23], population: 620000, isPrefecturalCapital: true, designation: '州都' },
        { id: 'm-de-nw-03', name: 'ドルトムント', nameLocal: 'Dortmund', nameEn: 'Dortmund', level: 3, subDivisionId: 'de-nw', macroRegionId: 'de-west', coordinates: [7.47, 51.51], population: 590000, designation: '主要都市' }
      ]
    },
    {
      id: 'de-he', code: 'HE', name: 'ヘッセン州', nameLocal: 'Hessen', nameEn: 'Hesse', level: 2,
      macroRegionId: 'de-west', capitalCity: 'ヴィースバーデン (Wiesbaden)', centroid: [9.0, 50.5], population: 6300000, areaKm2: 21115,
      mnemonic: '欧州金融の中心フランクフルト（欧州中央銀行）を擁する。州都は温泉保養地ヴィースバーデン。',
      municipalities: [
        { id: 'm-de-he-01', name: 'フランクフルト・アム・マイン', nameLocal: 'Frankfurt am Main', nameEn: 'Frankfurt', level: 3, subDivisionId: 'de-he', macroRegionId: 'de-west', coordinates: [8.68, 50.11], population: 760000, designation: '金融ハブ' }
      ]
    },
    {
      id: 'de-rp', code: 'RP', name: 'ラインラント＝プファルツ州', nameLocal: 'Rheinland-Pfalz', nameEn: 'Rhineland-Palatinate', level: 2,
      macroRegionId: 'de-west', capitalCity: 'マインツ (Mainz)', centroid: [7.5, 49.9], population: 4100000, areaKm2: 19854,
      mnemonic: 'ライン川とモーゼル川のブドウ畑・ワイン街道。活版印刷のグーテンベルク（マインツ）。',
      municipalities: [
        { id: 'm-de-rp-01', name: 'マインツ', nameLocal: 'Mainz', nameEn: 'Mainz', level: 3, subDivisionId: 'de-rp', macroRegionId: 'de-west', coordinates: [8.27, 50.00], population: 220000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'de-sl', code: 'SL', name: 'ザールラント州', nameLocal: 'Saarland', nameEn: 'Saarland', level: 2,
      macroRegionId: 'de-west', capitalCity: 'ザールブリュッケン (Saarbrücken)', centroid: [7.0, 49.4], population: 990000, areaKm2: 2569,
      mnemonic: 'フランス国境に接する小州。歴史的に独仏間で帰属が変遷した石炭・鉄鋼地帯。',
      municipalities: [
        { id: 'm-de-sl-01', name: 'ザールブリュッケン', nameLocal: 'Saarbrücken', nameEn: 'Saarbrucken', level: 3, subDivisionId: 'de-sl', macroRegionId: 'de-west', coordinates: [6.99, 49.23], population: 180000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    // North (5)
    {
      id: 'de-ni', code: 'NI', name: 'ニーダーザクセン州', nameLocal: 'Niedersachsen', nameEn: 'Lower Saxony', level: 2,
      macroRegionId: 'de-north', capitalCity: 'ハノーファー (Hannover)', centroid: [9.7, 52.8], population: 8000000, areaKm2: 47614,
      mnemonic: '北海に面する第2の広さを持つ州。フォルクスワーゲン本社（ヴォルフスブルク）。',
      municipalities: [
        { id: 'm-de-ni-01', name: 'ハノーファー', nameLocal: 'Hannover', nameEn: 'Hanover', level: 3, subDivisionId: 'de-ni', macroRegionId: 'de-north', coordinates: [9.73, 52.37], population: 540000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'de-sh', code: 'SH', name: 'シュレースヴィヒ＝ホルシュタイン州', nameLocal: 'Schleswig-Holstein', nameEn: 'Schleswig-Holstein', level: 2,
      macroRegionId: 'de-north', capitalCity: 'キール (Kiel)', centroid: [9.8, 54.2], population: 2900000, areaKm2: 15799,
      mnemonic: 'デンマークと国境を接するドイツ最北の州。北海とバルト海に挟まれる。キール運河。',
      municipalities: [
        { id: 'm-de-sh-01', name: 'キール', nameLocal: 'Kiel', nameEn: 'Kiel', level: 3, subDivisionId: 'de-sh', macroRegionId: 'de-north', coordinates: [10.13, 54.32], population: 250000, isPrefecturalCapital: true, designation: '州都' },
        { id: 'm-de-sh-02', name: 'リューベック', nameLocal: 'Lübeck', nameEn: 'Lubeck', level: 3, subDivisionId: 'de-sh', macroRegionId: 'de-north', coordinates: [10.68, 53.86], population: 220000, designation: 'ハンザ同盟の盟主' }
      ]
    },
    {
      id: 'de-hh', code: 'HH', name: 'ハンブルク', nameLocal: 'Hamburg', nameEn: 'Hamburg', level: 2,
      macroRegionId: 'de-north', capitalCity: 'ハンブルク', centroid: [10.0, 53.55], population: 1850000, areaKm2: 755,
      mnemonic: 'ドイツ第2の都市にして都市州。エルベ川河口の巨大港湾都市と世界遺産・倉庫街。',
      municipalities: [
        { id: 'm-de-hh-01', name: 'ハンブルク', nameLocal: 'Hamburg', nameEn: 'Hamburg', level: 3, subDivisionId: 'de-hh', macroRegionId: 'de-north', coordinates: [9.99, 53.55], population: 1850000, isCapital: true, designation: '都市州' }
      ]
    },
    {
      id: 'de-hb', code: 'HB', name: 'ブレーメン州', nameLocal: 'Bremen', nameEn: 'Bremen', level: 2,
      macroRegionId: 'de-north', capitalCity: 'ブレーメン (Bremen)', centroid: [8.8, 53.1], population: 680000, areaKm2: 419,
      mnemonic: 'グリム童話「ブレーメンの音楽隊」で有名。ドイツ最小の連邦州（自由ハンザ都市）。',
      municipalities: [
        { id: 'm-de-hb-01', name: 'ブレーメン', nameLocal: 'Bremen', nameEn: 'Bremen', level: 3, subDivisionId: 'de-hb', macroRegionId: 'de-north', coordinates: [8.80, 53.07], population: 570000, isPrefecturalCapital: true, designation: '都市州' }
      ]
    },
    {
      id: 'de-mv', code: 'MV', name: 'メクレンブルク＝フォアポンメルン州', nameLocal: 'Mecklenburg-Vorpommern', nameEn: 'Mecklenburg-Western Pomerania', level: 2,
      macroRegionId: 'de-north', capitalCity: 'シュヴェリーン (Schwerin)', centroid: [12.2, 53.6], population: 1600000, areaKm2: 23180,
      mnemonic: 'バルト海沿岸の美しい白砂ビーチと湖沼地帯。リューゲン島の白亜の崖。',
      municipalities: [
        { id: 'm-de-mv-01', name: 'シュヴェリーン', nameLocal: 'Schwerin', nameEn: 'Schwerin', level: 3, subDivisionId: 'de-mv', macroRegionId: 'de-north', coordinates: [11.41, 53.63], population: 95000, isPrefecturalCapital: true, designation: '州都' },
        { id: 'm-de-mv-02', name: 'ロストック', nameLocal: 'Rostock', nameEn: 'Rostock', level: 3, subDivisionId: 'de-mv', macroRegionId: 'de-north', coordinates: [12.13, 54.09], population: 210000, designation: '最大都市' }
      ]
    },
    // East (5)
    {
      id: 'de-be', code: 'BE', name: 'ベルリン', nameLocal: 'Berlin', nameEn: 'Berlin', level: 2,
      macroRegionId: 'de-east', capitalCity: 'ベルリン', centroid: [13.4, 52.5], population: 3670000, areaKm2: 891,
      mnemonic: 'ドイツ連邦の首都にして最大の都市州。ブランデンブルク門とベルリンの壁の歴史。',
      municipalities: [
        { id: 'm-de-be-01', name: 'ベルリン', nameLocal: 'Berlin', nameEn: 'Berlin', level: 3, subDivisionId: 'de-be', macroRegionId: 'de-east', coordinates: [13.40, 52.52], population: 3670000, isCapital: true, designation: '連邦首都' }
      ]
    },
    {
      id: 'de-bb', code: 'BB', name: 'ブランデンブルク州', nameLocal: 'Brandenburg', nameEn: 'Brandenburg', level: 2,
      macroRegionId: 'de-east', capitalCity: 'ポツダム (Potsdam)', centroid: [13.2, 52.3], population: 2540000, areaKm2: 29480,
      mnemonic: 'ベルリンを取り囲む州。ポツダム宣言のツェツィーリエンホーフ宮殿やサンスーシ宮殿。',
      municipalities: [
        { id: 'm-de-bb-01', name: 'ポツダム', nameLocal: 'Potsdam', nameEn: 'Potsdam', level: 3, subDivisionId: 'de-bb', macroRegionId: 'de-east', coordinates: [13.06, 52.39], population: 180000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'de-sn', code: 'SN', name: 'ザクセン州', nameLocal: 'Sachsen', nameEn: 'Saxony', level: 2,
      macroRegionId: 'de-east', capitalCity: 'ドレスデン (Dresden)', centroid: [13.3, 51.0], population: 4050000, areaKm2: 18450,
      mnemonic: 'バロック建築のドレスデンと音楽・見本市の街ライプツィヒ。半導体の「シリコンサクソニー」。',
      municipalities: [
        { id: 'm-de-sn-01', name: 'ドレスデン', nameLocal: 'Dresden', nameEn: 'Dresden', level: 3, subDivisionId: 'de-sn', macroRegionId: 'de-east', coordinates: [13.74, 51.05], population: 560000, isPrefecturalCapital: true, designation: '州都' },
        { id: 'm-de-sn-02', name: 'ライプツィヒ', nameLocal: 'Leipzig', nameEn: 'Leipzig', level: 3, subDivisionId: 'de-sn', macroRegionId: 'de-east', coordinates: [12.37, 51.34], population: 600000, designation: '最大都市' }
      ]
    },
    {
      id: 'de-st', code: 'ST', name: 'ザクセン＝アンハルト州', nameLocal: 'Sachsen-Anhalt', nameEn: 'Saxony-Anhalt', level: 2,
      macroRegionId: 'de-east', capitalCity: 'マグデブルク (Magdeburg)', centroid: [11.7, 51.9], population: 2180000, areaKm2: 20452,
      mnemonic: 'ルターの宗教改革の地ヴィッテンベルクやバウハウス発祥の地デッサウ。',
      municipalities: [
        { id: 'm-de-st-01', name: 'マグデブルク', nameLocal: 'Magdeburg', nameEn: 'Magdeburg', level: 3, subDivisionId: 'de-st', macroRegionId: 'de-east', coordinates: [11.63, 52.12], population: 240000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'de-th', code: 'TH', name: 'テューリンゲン州', nameLocal: 'Thüringen', nameEn: 'Thuringia', level: 2,
      macroRegionId: 'de-east', capitalCity: 'エアフルト (Erfurt)', centroid: [11.0, 50.9], population: 2120000, areaKm2: 16172,
      mnemonic: '「ドイツの緑の心臓」。ゲーテとシラーの古都ヴァイマール、バッハの生誕地アイゼナハ。',
      municipalities: [
        { id: 'm-de-th-01', name: 'エアフルト', nameLocal: 'Erfurt', nameEn: 'Erfurt', level: 3, subDivisionId: 'de-th', macroRegionId: 'de-east', coordinates: [11.03, 50.98], population: 215000, isPrefecturalCapital: true, designation: '州都' }
      ]
    }
  ]
};
