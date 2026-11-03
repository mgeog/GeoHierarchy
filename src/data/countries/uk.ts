import { CountryAdministrativeData } from '../../types/geo';

export const ukData: CountryAdministrativeData = {
  id: 'uk',
  name: 'イギリス (英国)',
  nameLocal: 'United Kingdom of Great Britain and Northern Ireland',
  nameEn: 'United Kingdom',
  flag: '🇬🇧',
  center: [-2.5, 54.3],
  defaultZoom: 5.5,
  zoomLevels: {
    level1: 5.5,
    level2: 6.6,
    level3: 7.8,
  },
  geoJsonUrl: '/data/uk.json',
  geoJsonNameProp: 'name',
  systemDescription: '英国（連合王国）は、第1階層として「広域・地方（4つの構成国：イングランド、スコットランド、ウェールズ、北アイルランド）」、第2階層として「都道府県・州・首府（12の標準地域・各首府）」、第3階層として「主要都市・特別区（ロンドン特別区、主要都市）」で構成されています。',
  levelNames: {
    level1: { ja: '広域・地方', local: 'Home Nations (4)', desc: 'イングランド、スコットランド、ウェールズ、北アイルランド' },
    level2: { ja: '都道府県・州・首府', local: 'Regions & Capitals', desc: 'ロンドン、スコットランド等の12地域および各首府' },
    level3: { ja: '主要都市・特別区', local: 'Major Cities & Boroughs', desc: 'ロンドン特別区、バーミンガム、マンチェスター等の主要都市' },
  },
  macroRegions: [
    {
      id: 'uk-england-s',
      name: 'イングランド南部・ロンドン',
      nameLocal: 'Southern England & London',
      nameEn: 'Southern England',
      level: 1,
      centroid: [-0.5, 51.5],
      color: '#ea580c',
      description: '大英帝国の歴史と世界金融の中枢ロンドン、オックスフォード・ケンブリッジの学術、サウサンプトン港。',
      subDivisionIds: ['uk-lon', 'uk-se', 'uk-sw', 'uk-ee'],
      population: 26000000,
    },
    {
      id: 'uk-england-n',
      name: 'イングランド中部・北部',
      nameLocal: 'Midlands & Northern England',
      nameEn: 'Midlands & North',
      level: 1,
      centroid: [-1.8, 53.5],
      color: '#d97706',
      description: '産業革命発祥の地。マンチェスター、バーミンガム、リバプール。音楽とサッカーの熱狂。',
      subDivisionIds: ['uk-nw', 'uk-wm', 'uk-em', 'uk-yh', 'uk-ne'],
      population: 30500000,
    },
    {
      id: 'uk-scotland',
      name: 'スコットランド',
      nameLocal: 'Scotland (Alba)',
      nameEn: 'Scotland',
      level: 1,
      centroid: [-4.0, 56.8],
      color: '#0284c7',
      description: 'ハイランド地方の雄大な自然と歴史ある古城。独自の法体系・教育制度・議会を持つ。エディンバラとグラスゴー。',
      subDivisionIds: ['uk-sco'],
      population: 5460000,
    },
    {
      id: 'uk-wales-ni',
      name: 'ウェールズ & 北アイルランド',
      nameLocal: 'Wales & Northern Ireland',
      nameEn: 'Wales & NI',
      level: 1,
      centroid: [-4.5, 52.8],
      color: '#059669',
      description: '独自の言語（ウェールズ語）とケルト文化のウェールズ、およびベルファストを擁する北アイルランド。',
      subDivisionIds: ['uk-wal', 'uk-nir'],
      population: 5000000,
    },
  ],
  subDivisions: [
    // London & South
    {
      id: 'uk-lon', code: 'LON', name: 'ロンドン (大ロンドン)', nameLocal: 'London', nameEn: 'Greater London', level: 2,
      macroRegionId: 'uk-england-s', capitalCity: 'ロンドン (City of London)', centroid: [-0.12, 51.5], population: 8900000, areaKm2: 1572,
      mnemonic: '英国の首都。テムズ川の両岸に広がる。シティ・オブ・ロンドンと32の特別区。金融と文化の世界的中心。',
      municipalities: [
        { id: 'm-uk-lon-01', name: 'ロンドン', nameLocal: 'London', nameEn: 'London', level: 3, subDivisionId: 'uk-lon', macroRegionId: 'uk-england-s', coordinates: [-0.12, 51.50], population: 8900000, isCapital: true, designation: 'メガシティ', notableFor: ['ビッグベン', 'バッキンガム宮殿', 'タワーブリッジ'] }
      ]
    },
    {
      id: 'uk-se', code: 'SE', name: 'サウス・イースト (南東部)', nameLocal: 'South East', nameEn: 'South East England', level: 2,
      macroRegionId: 'uk-england-s', capitalCity: 'ギルフォード / オックスフォード', centroid: [-0.6, 51.2], population: 9200000, areaKm2: 19096,
      mnemonic: '人口最多の地域。オックスフォード大学、ドーバー海峡の白い崖、ブライトン海岸。',
      municipalities: [
        { id: 'm-uk-se-01', name: 'オックスフォード', nameLocal: 'Oxford', nameEn: 'Oxford', level: 3, subDivisionId: 'uk-se', macroRegionId: 'uk-england-s', coordinates: [-1.25, 51.75], population: 155000, designation: '大学都市', notableFor: ['オックスフォード大学'] },
        { id: 'm-uk-se-02', name: 'ブライトン', nameLocal: 'Brighton', nameEn: 'Brighton', level: 3, subDivisionId: 'uk-se', macroRegionId: 'uk-england-s', coordinates: [-0.14, 50.82], population: 290000, designation: '海浜リゾート' }
      ]
    },
    {
      id: 'uk-sw', code: 'SW', name: 'サウス・ウェスト (南西部)', nameLocal: 'South West', nameEn: 'South West England', level: 2,
      macroRegionId: 'uk-england-s', capitalCity: 'ブリストル (Bristol)', centroid: [-3.5, 50.8], population: 5700000, areaKm2: 23829,
      mnemonic: 'コーンウォール半島とコッツウォルズの美しい村々。ストーンヘンジと港湾都市ブリストル。',
      municipalities: [
        { id: 'm-uk-sw-01', name: 'ブリストル', nameLocal: 'Bristol', nameEn: 'Bristol', level: 3, subDivisionId: 'uk-sw', macroRegionId: 'uk-england-s', coordinates: [-2.58, 51.45], population: 470000, isPrefecturalCapital: true, designation: '最大都市' },
        { id: 'm-uk-sw-02', name: 'バース', nameLocal: 'Bath', nameEn: 'Bath', level: 3, subDivisionId: 'uk-sw', macroRegionId: 'uk-england-s', coordinates: [-2.35, 51.38], population: 90000, designation: '温泉保養地(世界遺産)' }
      ]
    },
    {
      id: 'uk-ee', code: 'EE', name: 'イースト・オブ・イングランド (東部)', nameLocal: 'Eastern', nameEn: 'East of England', level: 2,
      macroRegionId: 'uk-england-s', capitalCity: 'ケンブリッジ (Cambridge)', centroid: [0.5, 52.2], population: 6300000, areaKm2: 19120,
      mnemonic: 'ノーフォークやサフォークの平野部。学術都市ケンブリッジ大学とバイオテック産業。',
      municipalities: [
        { id: 'm-uk-ee-01', name: 'ケンブリッジ', nameLocal: 'Cambridge', nameEn: 'Cambridge', level: 3, subDivisionId: 'uk-ee', macroRegionId: 'uk-england-s', coordinates: [0.12, 52.20], population: 145000, isPrefecturalCapital: true, designation: '大学都市', notableFor: ['ケンブリッジ大学'] }
      ]
    },
    // Midlands & North
    {
      id: 'uk-wm', code: 'WM', name: 'ウェスト・ミッドランズ (西中部)', nameLocal: 'West Midlands', nameEn: 'West Midlands', level: 2,
      macroRegionId: 'uk-england-n', capitalCity: 'バーミンガム (Birmingham)', centroid: [-2.0, 52.5], population: 5950000, areaKm2: 13000,
      mnemonic: '英国第2の都市バーミンガムを擁する「千の職人の街」。自動車・製造業の要所。シェイクスピアの故郷。',
      municipalities: [
        { id: 'm-uk-wm-01', name: 'バーミンガム', nameLocal: 'Birmingham', nameEn: 'Birmingham', level: 3, subDivisionId: 'uk-wm', macroRegionId: 'uk-england-n', coordinates: [-1.89, 52.48], population: 1140000, isPrefecturalCapital: true, designation: '英国第2の都市' }
      ]
    },
    {
      id: 'uk-em', code: 'EM', name: 'イースト・ミッドランズ (東中部)', nameLocal: 'East Midlands', nameEn: 'East Midlands', level: 2,
      macroRegionId: 'uk-england-n', capitalCity: 'ノッティンガム (Nottingham)', centroid: [-1.0, 52.9], population: 4900000, areaKm2: 15627,
      mnemonic: 'ロビンフッドのシャーウッドの森、ロールス・ロイスの本拠ダービー、ノッティンガム。',
      municipalities: [
        { id: 'm-uk-em-01', name: 'ノッティンガム', nameLocal: 'Nottingham', nameEn: 'Nottingham', level: 3, subDivisionId: 'uk-em', macroRegionId: 'uk-england-n', coordinates: [-1.15, 52.95], population: 330000, isPrefecturalCapital: true, designation: '中心都市' },
        { id: 'm-uk-em-02', name: 'レスター', nameLocal: 'Leicester', nameEn: 'Leicester', level: 3, subDivisionId: 'uk-em', macroRegionId: 'uk-england-n', coordinates: [-1.13, 52.63], population: 370000, designation: '歴史都市' }
      ]
    },
    {
      id: 'uk-nw', code: 'NW', name: 'ノース・ウェスト (北西部)', nameLocal: 'North West', nameEn: 'North West England', level: 2,
      macroRegionId: 'uk-england-n', capitalCity: 'マンチェスター (Manchester)', centroid: [-2.6, 53.7], population: 7400000, areaKm2: 14165,
      mnemonic: '産業革命の震源地。マンチェスター（サッカー・IT）とリバプール（ビートルズ・海洋貿易）。湖水地方。',
      municipalities: [
        { id: 'm-uk-nw-01', name: 'マンチェスター', nameLocal: 'Manchester', nameEn: 'Manchester', level: 3, subDivisionId: 'uk-nw', macroRegionId: 'uk-england-n', coordinates: [-2.24, 53.48], population: 550000, isPrefecturalCapital: true, designation: '主要都市', notableFor: ['マンチェスター・ユナイテッド', 'オアシス'] },
        { id: 'm-uk-nw-02', name: 'リバプール', nameLocal: 'Liverpool', nameEn: 'Liverpool', level: 3, subDivisionId: 'uk-nw', macroRegionId: 'uk-england-n', coordinates: [-2.99, 53.40], population: 490000, designation: '港湾都市', notableFor: ['ザ・ビートルズ'] }
      ]
    },
    {
      id: 'uk-yh', code: 'YH', name: 'ヨークシャー・アンド・ザ・ハンバー', nameLocal: 'Yorkshire and The Humber', nameEn: 'Yorkshire and The Humber', level: 2,
      macroRegionId: 'uk-england-n', capitalCity: 'リーズ (Leeds) / ヨーク (York)', centroid: [-1.3, 53.9], population: 5500000, areaKm2: 15420,
      mnemonic: '歴史あるヨーク大聖堂、中世の城壁の街ヨーク、金融・商業都市リーズ、鉄鋼のシェフィールド。',
      municipalities: [
        { id: 'm-uk-yh-01', name: 'リーズ', nameLocal: 'Leeds', nameEn: 'Leeds', level: 3, subDivisionId: 'uk-yh', macroRegionId: 'uk-england-n', coordinates: [-1.54, 53.80], population: 800000, isPrefecturalCapital: true, designation: '最大都市' },
        { id: 'm-uk-yh-02', name: 'シェフィールド', nameLocal: 'Sheffield', nameEn: 'Sheffield', level: 3, subDivisionId: 'uk-yh', macroRegionId: 'uk-england-n', coordinates: [-1.47, 53.38], population: 580000, designation: '刃物と鉄鋼' }
      ]
    },
    {
      id: 'uk-ne', code: 'NE', name: 'ノース・イースト (北東部)', nameLocal: 'North East', nameEn: 'North East England', level: 2,
      macroRegionId: 'uk-england-n', capitalCity: 'ニューカッスル (Newcastle)', centroid: [-1.6, 55.0], population: 2650000, areaKm2: 8592,
      mnemonic: 'タイン川河口のニューカッスルと、古代ローマ帝国のハドリアヌスの長城。ダラム大聖堂。',
      municipalities: [
        { id: 'm-uk-ne-01', name: 'ニューカッスル・アポン・タイン', nameLocal: 'Newcastle upon Tyne', nameEn: 'Newcastle', level: 3, subDivisionId: 'uk-ne', macroRegionId: 'uk-england-n', coordinates: [-1.61, 54.97], population: 300000, isPrefecturalCapital: true, designation: '中心都市' }
      ]
    },
    // Scotland
    {
      id: 'uk-sco', code: 'SCO', name: 'スコットランド', nameLocal: 'Scotland', nameEn: 'Scotland', level: 2,
      macroRegionId: 'uk-scotland', capitalCity: 'エディンバラ (Edinburgh)', centroid: [-4.2, 56.5], population: 5460000, areaKm2: 77933,
      mnemonic: '英国北部の構成国。古城と火山岩のエディンバラ、最大都市グラスゴー、スコッチ・ウイスキー。',
      municipalities: [
        { id: 'm-uk-sco-01', name: 'エディンバラ', nameLocal: 'Edinburgh', nameEn: 'Edinburgh', level: 3, subDivisionId: 'uk-sco', macroRegionId: 'uk-scotland', coordinates: [-3.18, 55.95], population: 520000, isPrefecturalCapital: true, designation: 'スコットランド首都', notableFor: ['エディンバラ城', 'フェスティバル'] },
        { id: 'm-uk-sco-02', name: 'グラスゴー', nameLocal: 'Glasgow', nameEn: 'Glasgow', level: 3, subDivisionId: 'uk-sco', macroRegionId: 'uk-scotland', coordinates: [-4.25, 55.86], population: 630000, designation: '最大都市' }
      ]
    },
    // Wales
    {
      id: 'uk-wal', code: 'WAL', name: 'ウェールズ', nameLocal: 'Wales', nameEn: 'Wales', level: 2,
      macroRegionId: 'uk-wales-ni', capitalCity: 'カーディフ (Cardiff)', centroid: [-3.8, 52.3], population: 3100000, areaKm2: 20779,
      mnemonic: '赤いドラゴンの旗。ケルトの言語とラグビー文化。カーディフ城とスノードニア国立公園。',
      municipalities: [
        { id: 'm-uk-wal-01', name: 'カーディフ', nameLocal: 'Cardiff', nameEn: 'Cardiff', level: 3, subDivisionId: 'uk-wal', macroRegionId: 'uk-wales-ni', coordinates: [-3.18, 51.48], population: 360000, isPrefecturalCapital: true, designation: 'ウェールズ首都', notableFor: ['カーディフ城'] }
      ]
    },
    // Northern Ireland
    {
      id: 'uk-nir', code: 'NIR', name: '北アイルランド', nameLocal: 'Northern Ireland', nameEn: 'Northern Ireland', level: 2,
      macroRegionId: 'uk-wales-ni', capitalCity: 'ベルファスト (Belfast)', centroid: [-6.8, 54.6], population: 1900000, areaKm2: 14130,
      mnemonic: 'アイルランド島北東部。タイタニック号が建造された港湾都市ベルファストと世界遺産ジャイアンツ・コーズウェー。',
      municipalities: [
        { id: 'm-uk-nir-01', name: 'ベルファスト', nameLocal: 'Belfast', nameEn: 'Belfast', level: 3, subDivisionId: 'uk-nir', macroRegionId: 'uk-wales-ni', coordinates: [-5.93, 54.59], population: 340000, isPrefecturalCapital: true, designation: '首府', notableFor: ['タイタニック・ベルファスト'] }
      ]
    }
  ]
};
