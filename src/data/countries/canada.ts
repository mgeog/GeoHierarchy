import { CountryAdministrativeData } from '../../types/geo';

export const canadaData: CountryAdministrativeData = {
  id: 'canada',
  name: 'カナダ',
  nameLocal: 'Canada',
  nameEn: 'Canada',
  flag: '🇨🇦',
  center: [-96.0, 56.0],
  defaultZoom: 3.5,
  zoomLevels: {
    level1: 3.5,
    level2: 4.6,
    level3: 6.0,
  },
  geoJsonUrl: '/data/canada.json',
  geoJsonNameProp: 'name',
  systemDescription: 'カナダは連邦制国家であり、第1階層として「広域・地方（5大地域）」、第2階層として「都道府県・州・首府（10州・3準州および各首府）」、第3階層として「主要都市・特別区（トロント、モントリオール等の主要自治体）」で成り立っています。',
  levelNames: {
    level1: { ja: '広域・地方', local: 'Regions of Canada (5)', desc: '大西洋沿岸、中部、平原、太平洋岸、北部の5大地域' },
    level2: { ja: '都道府県・州・首府', local: 'Provinces & Territories (13)', desc: 'オンタリオ、ケベック等10州3準州および各州都' },
    level3: { ja: '主要都市・特別区', local: 'Capitals & Metros', desc: '首都オタワ、トロント、モントリオール、バンクーバー等の主要都市' },
  },
  macroRegions: [
    {
      id: 'ca-central',
      name: '中部カナダ (オンタリオ・ケベック)',
      nameLocal: 'Central Canada',
      nameEn: 'Central Canada',
      level: 1,
      centroid: [-75.0, 48.0],
      color: '#d97706',
      description: '全人口の6割以上が集中する経済・政治・文化の中心。首都オタワ、最大都市トロント、フランス語圏ケベック。',
      subDivisionIds: ['ca-on', 'ca-qc'],
      population: 24200000,
    },
    {
      id: 'ca-west',
      name: '西海岸 (太平洋岸)',
      nameLocal: 'West Coast / Pacific',
      nameEn: 'West Coast',
      level: 1,
      centroid: [-123.0, 53.0],
      color: '#0284c7',
      description: 'カナディアンロッキーと太平洋に面するブリティッシュコロンビア州。温暖な気候とアジア太平洋への窓口。',
      subDivisionIds: ['ca-bc'],
      population: 5500000,
    },
    {
      id: 'ca-prairies',
      name: '平原州 (プレーリー)',
      nameLocal: 'Prairie Provinces',
      nameEn: 'Prairies',
      level: 1,
      centroid: [-106.0, 52.0],
      color: '#059669',
      description: '広大な大平原地帯。農業・小麦・畜産、そしてアルバータ州の石油・天然ガス（オイルサンド）エネルギー産業。',
      subDivisionIds: ['ca-ab', 'ca-sk', 'ca-mb'],
      population: 7100000,
    },
    {
      id: 'ca-atlantic',
      name: '大西洋沿岸州 (アトランティック)',
      nameLocal: 'Atlantic Canada',
      nameEn: 'Atlantic Canada',
      level: 1,
      centroid: [-63.0, 46.5],
      color: '#ea580c',
      description: '海洋性気候の東部諸州。豊かな漁業と造船、赤毛のアンで有名なプリンスエドワード島。',
      subDivisionIds: ['ca-ns', 'ca-nb', 'ca-nl', 'ca-pe'],
      population: 2600000,
    },
    {
      id: 'ca-north',
      name: '北部準州 (ノーザン・テリトリー)',
      nameLocal: 'Northern Territories',
      nameEn: 'Northern Territories',
      level: 1,
      centroid: [-110.0, 66.0],
      color: '#7c3aed',
      description: '北極圏に広がるツンドラの大地。オーロラ、イヌイットの伝統文化、ダイヤモンドなどの鉱物資源。',
      subDivisionIds: ['ca-nt', 'ca-nu', 'ca-yt'],
      population: 130000,
    },
  ],
  subDivisions: [
    // Central Canada
    {
      id: 'ca-on', code: 'ON', name: 'オンタリオ州', nameLocal: 'Ontario', nameEn: 'Ontario', level: 2,
      macroRegionId: 'ca-central', capitalCity: 'トロント (Toronto)', centroid: [-84.5, 50.0], population: 15600000, areaKm2: 1076395,
      mnemonic: 'カナダ最多の人口（約1500万人）。最大都市トロント、連邦首都オタワ、ナイアガラの滝。五大湖。',
      municipalities: [
        { id: 'm-ca-on-01', name: 'トロント', nameLocal: 'Toronto', nameEn: 'Toronto', level: 3, subDivisionId: 'ca-on', macroRegionId: 'ca-central', coordinates: [-79.38, 43.65], population: 2800000, isPrefecturalCapital: true, designation: 'カナダ最大都市', notableFor: ['CNタワー', '金融の中心'] },
        { id: 'm-ca-on-02', name: 'オタワ', nameLocal: 'Ottawa', nameEn: 'Ottawa', level: 3, subDivisionId: 'ca-on', macroRegionId: 'ca-central', coordinates: [-75.70, 45.42], population: 1020000, isCapital: true, designation: '連邦首都', notableFor: ['連邦議会議事堂', 'リドー運河'] }
      ]
    },
    {
      id: 'ca-qc', code: 'QC', name: 'ケベック州', nameLocal: 'Québec', nameEn: 'Quebec', level: 2,
      macroRegionId: 'ca-central', capitalCity: 'ケベック・シティ (Québec)', centroid: [-72.0, 52.0], population: 8800000, areaKm2: 1542056,
      mnemonic: '公用語がフランス語の広大な州。世界遺産の旧市街ケベック・シティと北米のパリと称されるモントリオール。',
      municipalities: [
        { id: 'm-ca-qc-01', name: 'モントリオール', nameLocal: 'Montréal', nameEn: 'Montreal', level: 3, subDivisionId: 'ca-qc', macroRegionId: 'ca-central', coordinates: [-73.57, 45.50], population: 1780000, designation: '仏語圏最大都市', notableFor: ['ノートルダム大聖堂', 'シルク・ドゥ・ソレイユ'] },
        { id: 'm-ca-qc-02', name: 'ケベック・シティ', nameLocal: 'Québec', nameEn: 'Quebec City', level: 3, subDivisionId: 'ca-qc', macroRegionId: 'ca-central', coordinates: [-71.21, 46.81], population: 550000, isPrefecturalCapital: true, designation: '州都', notableFor: ['シャトー・フロンテナック', '城郭都市'] }
      ]
    },
    // West Coast
    {
      id: 'ca-bc', code: 'BC', name: 'ブリティッシュコロンビア州', nameLocal: 'British Columbia', nameEn: 'British Columbia', level: 2,
      macroRegionId: 'ca-west', capitalCity: 'ビクトリア (Victoria)', centroid: [-125.0, 54.0], population: 5500000, areaKm2: 944735,
      mnemonic: '太平洋岸の温暖で自然豊かな州。アジアへの窓口・港湾都市バンクーバー。州都はバンクーバー島のビクトリア。',
      municipalities: [
        { id: 'm-ca-bc-01', name: 'バンクーバー', nameLocal: 'Vancouver', nameEn: 'Vancouver', level: 3, subDivisionId: 'ca-bc', macroRegionId: 'ca-west', coordinates: [-123.12, 49.28], population: 660000, designation: '最大都市', notableFor: ['スタンレーパーク', '冬季五輪開催地'] },
        { id: 'm-ca-bc-02', name: 'ビクトリア', nameLocal: 'Victoria', nameEn: 'Victoria', level: 3, subDivisionId: 'ca-bc', macroRegionId: 'ca-west', coordinates: [-123.37, 48.43], population: 92000, isPrefecturalCapital: true, designation: '州都', notableFor: ['ブッチャートガーデン', '州議事堂'] }
      ]
    },
    // Prairies
    {
      id: 'ca-ab', code: 'AB', name: 'アルバータ州', nameLocal: 'Alberta', nameEn: 'Alberta', level: 2,
      macroRegionId: 'ca-prairies', capitalCity: 'エドモントン (Edmonton)', centroid: [-115.0, 54.5], population: 4700000, areaKm2: 661848,
      mnemonic: 'カナディアンロッキー（バンフ・レイクルイーズ）とオイルサンド。スタンピードの街カルガリー。',
      municipalities: [
        { id: 'm-ca-ab-01', name: 'カルガリー', nameLocal: 'Calgary', nameEn: 'Calgary', level: 3, subDivisionId: 'ca-ab', macroRegionId: 'ca-prairies', coordinates: [-114.07, 51.05], population: 1300000, designation: '最大都市', notableFor: ['カルガリー・スタンピード'] },
        { id: 'm-ca-ab-02', name: 'エドモントン', nameLocal: 'Edmonton', nameEn: 'Edmonton', level: 3, subDivisionId: 'ca-ab', macroRegionId: 'ca-prairies', coordinates: [-113.49, 53.55], population: 1010000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'ca-sk', code: 'SK', name: 'サスカーチュワン州', nameLocal: 'Saskatchewan', nameEn: 'Saskatchewan', level: 2,
      macroRegionId: 'ca-prairies', capitalCity: 'レジャイナ (Regina)', centroid: [-106.0, 54.0], population: 1200000, areaKm2: 651900,
      mnemonic: '広大な大平原地帯。カナダ随一の穀倉地帯（小麦）。カリ鉱石の世界最大の産地。',
      municipalities: [
        { id: 'm-ca-sk-01', name: 'サスカトゥーン', nameLocal: 'Saskatoon', nameEn: 'Saskatoon', level: 3, subDivisionId: 'ca-sk', macroRegionId: 'ca-prairies', coordinates: [-106.67, 52.13], population: 270000, designation: '最大都市' },
        { id: 'm-ca-sk-02', name: 'レジャイナ', nameLocal: 'Regina', nameEn: 'Regina', level: 3, subDivisionId: 'ca-sk', macroRegionId: 'ca-prairies', coordinates: [-104.62, 50.45], population: 230000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'ca-mb', code: 'MB', name: 'マニトバ州', nameLocal: 'Manitoba', nameEn: 'Manitoba', level: 2,
      macroRegionId: 'ca-prairies', capitalCity: 'ウィニペグ (Winnipeg)', centroid: [-98.0, 54.0], population: 1400000, areaKm2: 649950,
      mnemonic: '「世界のシロクマの首都」チャーチルとウィニペグ湖。くまのプーさん（Winnie）の名前の由来。',
      municipalities: [
        { id: 'm-ca-mb-01', name: 'ウィニペグ', nameLocal: 'Winnipeg', nameEn: 'Winnipeg', level: 3, subDivisionId: 'ca-mb', macroRegionId: 'ca-prairies', coordinates: [-97.14, 49.90], population: 750000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    // Atlantic
    {
      id: 'ca-ns', code: 'NS', name: 'ノバスコシア州', nameLocal: 'Nova Scotia', nameEn: 'Nova Scotia', level: 2,
      macroRegionId: 'ca-atlantic', capitalCity: 'ハリファックス (Halifax)', centroid: [-63.0, 45.0], population: 1000000, areaKm2: 55284,
      mnemonic: '「新しいスコットランド」を意味する半島州。不凍港ハリファックスとタイタニック号の歴史。',
      municipalities: [
        { id: 'm-ca-ns-01', name: 'ハリファックス', nameLocal: 'Halifax', nameEn: 'Halifax', level: 3, subDivisionId: 'ca-ns', macroRegionId: 'ca-atlantic', coordinates: [-63.57, 44.65], population: 440000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'ca-nb', code: 'NB', name: 'ニューブランズウィック州', nameLocal: 'New Brunswick', nameEn: 'New Brunswick', level: 2,
      macroRegionId: 'ca-atlantic', capitalCity: 'フレデリクトン (Fredericton)', centroid: [-66.5, 46.5], population: 830000, areaKm2: 72908,
      mnemonic: 'カナダで唯一、英語とフランス語の両方を公用語と定めている州。ファンディ湾の巨大な干満差。',
      municipalities: [
        { id: 'm-ca-nb-01', name: 'フレデリクトン', nameLocal: 'Fredericton', nameEn: 'Fredericton', level: 3, subDivisionId: 'ca-nb', macroRegionId: 'ca-atlantic', coordinates: [-66.64, 45.96], population: 63000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'ca-nl', code: 'NL', name: 'ニューファンドランド・ラブラドール州', nameLocal: 'Newfoundland and Labrador', nameEn: 'Newfoundland and Labrador', level: 2,
      macroRegionId: 'ca-atlantic', capitalCity: 'セントジョンズ (St. John\'s)', centroid: [-56.0, 52.0], population: 530000, areaKm2: 405212,
      mnemonic: '北米最東端の島と本土ラブラドール地方。1949年に最後にカナダ連邦に加入。タラ漁の歴史。',
      municipalities: [
        { id: 'm-ca-nl-01', name: 'セントジョンズ', nameLocal: "St. John's", nameEn: "St. John's", level: 3, subDivisionId: 'ca-nl', macroRegionId: 'ca-atlantic', coordinates: [-52.71, 47.56], population: 110000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'ca-pe', code: 'PE', name: 'プリンスエドワードアイランド州', nameLocal: 'Prince Edward Island', nameEn: 'Prince Edward Island', level: 2,
      macroRegionId: 'ca-atlantic', capitalCity: 'シャーロットタウン (Charlottetown)', centroid: [-63.0, 46.3], population: 175000, areaKm2: 5660,
      mnemonic: 'カナダで最も面積と人口が小さい州。名作『赤毛のアン』の舞台。コンフェデレーション橋。',
      municipalities: [
        { id: 'm-ca-pe-01', name: 'シャーロットタウン', nameLocal: 'Charlottetown', nameEn: 'Charlottetown', level: 3, subDivisionId: 'ca-pe', macroRegionId: 'ca-atlantic', coordinates: [-63.13, 46.24], population: 39000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    // Territories
    {
      id: 'ca-nt', code: 'NT', name: 'ノースウェスト準州', nameLocal: 'Northwest Territories', nameEn: 'Northwest Territories', level: 2,
      macroRegionId: 'ca-north', capitalCity: 'イエローナイフ (Yellowknife)', centroid: [-119.0, 64.0], population: 45000, areaKm2: 1346106,
      mnemonic: '世界有数のオーロラ観測地イエローナイフとグレートスレーブ湖。ダイヤモンド鉱山。',
      municipalities: [
        { id: 'm-ca-nt-01', name: 'イエローナイフ', nameLocal: 'Yellowknife', nameEn: 'Yellowknife', level: 3, subDivisionId: 'ca-nt', macroRegionId: 'ca-north', coordinates: [-114.37, 62.45], population: 20000, isPrefecturalCapital: true, designation: '準州都' }
      ]
    },
    {
      id: 'ca-nu', code: 'NU', name: 'ヌナブト準州', nameLocal: 'Nunavut', nameEn: 'Nunavut', level: 2,
      macroRegionId: 'ca-north', capitalCity: 'イカルイト (Iqaluit)', centroid: [-90.0, 68.0], population: 40000, areaKm2: 2093190,
      mnemonic: '1999年に設立されたカナダ最大の面積（約209万km²）を誇る準州。住民の8割以上がイヌイット。',
      municipalities: [
        { id: 'm-ca-nu-01', name: 'イカルイト', nameLocal: 'Iqaluit', nameEn: 'Iqaluit', level: 3, subDivisionId: 'ca-nu', macroRegionId: 'ca-north', coordinates: [-68.52, 63.75], population: 7500, isPrefecturalCapital: true, designation: '準州都' }
      ]
    },
    {
      id: 'ca-yt', code: 'YT', name: 'ユーコン準州', nameLocal: 'Yukon', nameEn: 'Yukon Territory', level: 2,
      macroRegionId: 'ca-north', capitalCity: 'ホワイトホース (Whitehorse)', centroid: [-135.0, 64.0], population: 44000, areaKm2: 482443,
      mnemonic: 'アラスカに隣接する準州。カナダ最高峰ローガン山（5,959m）とクロンダイク・ゴールドラッシュの歴史。',
      municipalities: [
        { id: 'm-ca-yt-01', name: 'ホワイトホース', nameLocal: 'Whitehorse', nameEn: 'Whitehorse', level: 3, subDivisionId: 'ca-yt', macroRegionId: 'ca-north', coordinates: [-135.05, 60.72], population: 28000, isPrefecturalCapital: true, designation: '準州都' }
      ]
    }
  ]
};
