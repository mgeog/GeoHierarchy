import { CountryAdministrativeData } from '../../types/geo';

export const franceData: CountryAdministrativeData = {
  id: 'france',
  name: 'フランス共和国',
  nameLocal: 'République française',
  nameEn: 'France',
  flag: '🇫🇷',
  center: [2.5, 46.5],
  defaultZoom: 5.2,
  zoomLevels: {
    level1: 5.2,
    level2: 6.2,
    level3: 7.4,
  },
  geoJsonUrl: '/data/france.json',
  geoJsonNameProp: 'nom',
  systemDescription: 'フランスは、第1階層として地理的な「広域・地方（5大地域ブロック）」、第2階層として広域自治体の「都道府県・州・首府（13地域圏レジオン・首府）」、第3階層として「主要都市・特別区（パリ、主要大都市圏コミューン）」で構成されています。',
  levelNames: {
    level1: { ja: '広域・地方', local: 'Grandes Régions (5)', desc: 'パリ・北部、西部、東部・中東部、南部の広域圏' },
    level2: { ja: '都道府県・州・首府', local: 'Régions & Préfectures', desc: 'イル＝ド＝フランス等の13地域圏および各首府' },
    level3: { ja: '主要都市・特別区', local: 'Métropoles & Communes', desc: 'パリ、リヨン、マルセイユ等の主要大都市圏' },
  },
  projectionConfig: {
    type: 'conicConformal',
    center: [2.5, 46.5],
    parallels: [44, 49],
    scaleMultiplier: 2700,
  },
  macroRegions: [
    {
      id: 'fr-paris',
      name: 'イル・ド・フランス・北部圏',
      nameLocal: 'Bassin Parisien & Nord',
      nameEn: 'Paris & North',
      level: 1,
      centroid: [2.5, 49.0],
      color: '#d97706',
      description: '首都パリを中心とするフランスの政治・経済・文化の心臓部と、ベルギー国境に近いオー＝ド＝フランス。',
      subDivisionIds: ['fr-idf', 'fr-hdf', 'fr-ges'],
      population: 23800000,
    },
    {
      id: 'fr-west',
      name: '大西洋・西部圏',
      nameLocal: 'Grand Ouest',
      nameEn: 'West',
      level: 1,
      centroid: [-1.0, 47.5],
      color: '#0284c7',
      description: '大西洋と英仏海峡に面する海洋地域。ケルトの伝統を持つブルターニュ、ノルマンディー、ロワール渓谷。',
      subDivisionIds: ['fr-bre', 'fr-nor', 'fr-pdl', 'fr-cvl', 'fr-naq'],
      population: 19500000,
    },
    {
      id: 'fr-east',
      name: '中東部・アルプス圏',
      nameLocal: 'Centre-Est & Alpes',
      nameEn: 'Central-East & Alps',
      level: 1,
      centroid: [4.8, 45.5],
      color: '#7c3aed',
      description: '美食の都リヨン、モンブランを抱くフレンチ・アルプス、ブルゴーニュワイン街道。',
      subDivisionIds: ['fr-ara', 'fr-bfc'],
      population: 10900000,
    },
    {
      id: 'fr-south',
      name: '地中海・南部圏',
      nameLocal: 'Grand Sud & Méditerranée',
      nameEn: 'South & Mediterranean',
      level: 1,
      centroid: [3.5, 43.5],
      color: '#059669',
      description: 'プロヴァンス、コート・ダジュール、ピレネー山脈、コルシカ島。温暖な地中海気候と航空宇宙産業。',
      subDivisionIds: ['fr-pac', 'fr-occ', 'fr-cor'],
      population: 11400000,
    },
  ],
  subDivisions: [
    // Paris / North (3)
    {
      id: 'fr-idf', code: '11', name: 'イル＝ド＝フランス地域圏', nameLocal: 'Île-de-France', nameEn: 'Île-de-France', level: 2,
      macroRegionId: 'fr-paris', capitalCity: 'パリ (Paris)', centroid: [2.35, 48.85], population: 12280000, areaKm2: 12012,
      mnemonic: '「フランスの島」を意味する首都圏。エッフェル塔、ルーヴル美術館、ヴェルサイユ宮殿。',
      municipalities: [
        { id: 'm-fr-idf-01', name: 'パリ', nameLocal: 'Paris', nameEn: 'Paris', level: 3, subDivisionId: 'fr-idf', macroRegionId: 'fr-paris', coordinates: [2.35, 48.86], population: 2140000, isCapital: true, isPrefecturalCapital: true, designation: '首都', notableFor: ['エッフェル塔', 'ルーヴル美術館'] },
        { id: 'm-fr-idf-02', name: 'ヴェルサイユ', nameLocal: 'Versailles', nameEn: 'Versailles', level: 3, subDivisionId: 'fr-idf', macroRegionId: 'fr-paris', coordinates: [2.13, 48.80], population: 85000, designation: '歴史都市', notableFor: ['ヴェルサイユ宮殿'] }
      ]
    },
    {
      id: 'fr-hdf', code: '32', name: 'オー＝ド＝フランス地域圏', nameLocal: 'Hauts-de-France', nameEn: 'Hauts-de-France', level: 2,
      macroRegionId: 'fr-paris', capitalCity: 'リール (Lille)', centroid: [2.8, 50.1], population: 6000000, areaKm2: 31813,
      mnemonic: 'フランス最北部の工業・交通の要衝。英仏海峡トンネルの玄関口カレーと歴史ある商業都市リール。',
      municipalities: [
        { id: 'm-fr-hdf-01', name: 'リール', nameLocal: 'Lille', nameEn: 'Lille', level: 3, subDivisionId: 'fr-hdf', macroRegionId: 'fr-paris', coordinates: [3.06, 50.63], population: 235000, isPrefecturalCapital: true, designation: '最大都市' }
      ]
    },
    {
      id: 'fr-ges', code: '44', name: 'グラン・テスト地域圏', nameLocal: 'Grand Est', nameEn: 'Grand Est', level: 2,
      macroRegionId: 'fr-paris', capitalCity: 'ストラスブール (Strasbourg)', centroid: [5.5, 48.8], population: 5560000, areaKm2: 57433,
      mnemonic: '欧州議会が置かれるストラスブール（アルザス地方）とシャンパンの故郷シャンパーニュ。ドイツ国境。',
      municipalities: [
        { id: 'm-fr-ges-01', name: 'ストラスブール', nameLocal: 'Strasbourg', nameEn: 'Strasbourg', level: 3, subDivisionId: 'fr-ges', macroRegionId: 'fr-paris', coordinates: [7.75, 48.57], population: 290000, isPrefecturalCapital: true, designation: '欧州議会所在地' },
        { id: 'm-fr-ges-02', name: 'ランス', nameLocal: 'Reims', nameEn: 'Reims', level: 3, subDivisionId: 'fr-ges', macroRegionId: 'fr-paris', coordinates: [4.03, 49.26], population: 180000, designation: '大聖堂とシャンパン' }
      ]
    },
    // West (5)
    {
      id: 'fr-bre', code: '53', name: 'ブルターニュ地域圏', nameLocal: 'Bretagne', nameEn: 'Brittany', level: 2,
      macroRegionId: 'fr-west', capitalCity: 'レンヌ (Rennes)', centroid: [-2.8, 48.2], population: 3370000, areaKm2: 27208,
      mnemonic: '大西洋に突き出た半島。ケルトの言語と伝統文化、ガレット・クレープ発祥の地。',
      municipalities: [
        { id: 'm-fr-bre-01', name: 'レンヌ', nameLocal: 'Rennes', nameEn: 'Rennes', level: 3, subDivisionId: 'fr-bre', macroRegionId: 'fr-west', coordinates: [-1.68, 48.11], population: 220000, isPrefecturalCapital: true, designation: '首府' },
        { id: 'm-fr-bre-02', name: 'ブレスト', nameLocal: 'Brest', nameEn: 'Brest', level: 3, subDivisionId: 'fr-bre', macroRegionId: 'fr-west', coordinates: [-4.49, 48.39], population: 140000, designation: '海軍港湾都市' }
      ]
    },
    {
      id: 'fr-nor', code: '28', name: 'ノルマンディー地域圏', nameLocal: 'Normandie', nameEn: 'Normandy', level: 2,
      macroRegionId: 'fr-west', capitalCity: 'ルーアン (Rouen)', centroid: [0.1, 49.1], population: 3320000, areaKm2: 29906,
      mnemonic: '世界遺産モン・サン＝ミシェルとカマンベールチーズ。モネの睡蓮（ジヴェルニー）。',
      municipalities: [
        { id: 'm-fr-nor-01', name: 'ルーアン', nameLocal: 'Rouen', nameEn: 'Rouen', level: 3, subDivisionId: 'fr-nor', macroRegionId: 'fr-west', coordinates: [1.09, 49.44], population: 114000, isPrefecturalCapital: true, designation: '首府' },
        { id: 'm-fr-nor-02', name: 'カーン', nameLocal: 'Caen', nameEn: 'Caen', level: 3, subDivisionId: 'fr-nor', macroRegionId: 'fr-west', coordinates: [-0.37, 49.18], population: 107000, designation: '主要都市' }
      ]
    },
    {
      id: 'fr-pdl', code: '52', name: 'ペイ・ド・ラ・ロワール地域圏', nameLocal: 'Pays de la Loire', nameEn: 'Pays de la Loire', level: 2,
      macroRegionId: 'fr-west', capitalCity: 'ナント (Nantes)', centroid: [-0.8, 47.5], population: 3840000, areaKm2: 32082,
      mnemonic: 'ロワール川河口の大西洋岸。城郭都市ナントとル・マン24時間耐久レース。',
      municipalities: [
        { id: 'm-fr-pdl-01', name: 'ナント', nameLocal: 'Nantes', nameEn: 'Nantes', level: 3, subDivisionId: 'fr-pdl', macroRegionId: 'fr-west', coordinates: [-1.55, 47.22], population: 320000, isPrefecturalCapital: true, designation: '最大都市' },
        { id: 'm-fr-pdl-02', name: 'ル・マン', nameLocal: 'Le Mans', nameEn: 'Le Mans', level: 3, subDivisionId: 'fr-pdl', macroRegionId: 'fr-west', coordinates: [0.20, 48.00], population: 145000, designation: 'モータースポーツの街' }
      ]
    },
    {
      id: 'fr-cvl', code: '24', name: 'サントル＝ヴァル・ド・ロワール地域圏', nameLocal: 'Centre-Val de Loire', nameEn: 'Centre-Val de Loire', level: 2,
      macroRegionId: 'fr-west', capitalCity: 'オルレアン (Orléans)', centroid: [1.7, 47.5], population: 2570000, areaKm2: 39151,
      mnemonic: '「フランスの庭園」と呼ばれる美しい古城群（シャンボール城・シュノンソー城）。ジャンヌ・ダルクのオルレアン。',
      municipalities: [
        { id: 'm-fr-cvl-01', name: 'オルレアン', nameLocal: 'Orléans', nameEn: 'Orleans', level: 3, subDivisionId: 'fr-cvl', macroRegionId: 'fr-west', coordinates: [1.90, 47.90], population: 116000, isPrefecturalCapital: true, designation: '首府' },
        { id: 'm-fr-cvl-02', name: 'トゥール', nameLocal: 'Tours', nameEn: 'Tours', level: 3, subDivisionId: 'fr-cvl', macroRegionId: 'fr-west', coordinates: [0.69, 47.39], population: 137000, designation: '古城めぐりの拠点' }
      ]
    },
    {
      id: 'fr-naq', code: '75', name: 'ヌーヴェル＝アキテーヌ地域圏', nameLocal: 'Nouvelle-Aquitaine', nameEn: 'Nouvelle-Aquitaine', level: 2,
      macroRegionId: 'fr-west', capitalCity: 'ボルドー (Bordeaux)', centroid: [-0.3, 45.2], population: 6030000, areaKm2: 84036,
      mnemonic: 'フランス本土で最も広大な地域圏。世界最高峰のボルドーワインとビスケー湾の海岸線。',
      municipalities: [
        { id: 'm-fr-naq-01', name: 'ボルドー', nameLocal: 'Bordeaux', nameEn: 'Bordeaux', level: 3, subDivisionId: 'fr-naq', macroRegionId: 'fr-west', coordinates: [-0.58, 44.84], population: 260000, isPrefecturalCapital: true, designation: 'ワインの世界的首都' }
      ]
    },
    // Central-East (2)
    {
      id: 'fr-ara', code: '84', name: 'オーヴェルニュ＝ローヌ＝アルプ地域圏', nameLocal: 'Auvergne-Rhône-Alpes', nameEn: 'Auvergne-Rhône-Alpes', level: 2,
      macroRegionId: 'fr-east', capitalCity: 'リヨン (Lyon)', centroid: [4.8, 45.7], population: 8080000, areaKm2: 69711,
      mnemonic: 'フランス第2の経済圏。世界最高峰の美食の街リヨンと、アルプス山脈（シャモニー・モンブラン）。',
      municipalities: [
        { id: 'm-fr-ara-01', name: 'リヨン', nameLocal: 'Lyon', nameEn: 'Lyon', level: 3, subDivisionId: 'fr-ara', macroRegionId: 'fr-east', coordinates: [4.84, 45.76], population: 522000, isPrefecturalCapital: true, designation: '美食の首都', notableFor: ['旧市街(世界遺産)'] },
        { id: 'm-fr-ara-02', name: 'グルノーブル', nameLocal: 'Grenoble', nameEn: 'Grenoble', level: 3, subDivisionId: 'fr-ara', macroRegionId: 'fr-east', coordinates: [5.72, 45.19], population: 158000, designation: 'アルプスの首都' }
      ]
    },
    {
      id: 'fr-bfc', code: '27', name: 'ブルゴーニュ＝フランシュ＝コンテ地域圏', nameLocal: 'Bourgogne-Franche-Comté', nameEn: 'Bourgogne-Franche-Comte', level: 2,
      macroRegionId: 'fr-east', capitalCity: 'ディジョン (Dijon)', centroid: [4.5, 47.2], population: 2800000, areaKm2: 47784,
      mnemonic: 'ロマネ・コンティをはじめとする世界最高峰のブルゴーニュワインとマスタードのディジョン。',
      municipalities: [
        { id: 'm-fr-bfc-01', name: 'ディジョン', nameLocal: 'Dijon', nameEn: 'Dijon', level: 3, subDivisionId: 'fr-bfc', macroRegionId: 'fr-east', coordinates: [5.04, 47.32], population: 159000, isPrefecturalCapital: true, designation: '首府' },
        { id: 'm-fr-bfc-02', name: 'ブザンソン', nameLocal: 'Besançon', nameEn: 'Besancon', level: 3, subDivisionId: 'fr-bfc', macroRegionId: 'fr-east', coordinates: [6.02, 47.24], population: 118000, designation: '時計産業都市' }
      ]
    },
    // South (3)
    {
      id: 'fr-pac', code: '93', name: 'プロヴァンス＝アルプ＝コート・ダジュール', nameLocal: "Provence-Alpes-Côte d'Azur", nameEn: "Provence-Alpes-Cote d'Azur", level: 2,
      macroRegionId: 'fr-south', capitalCity: 'マルセイユ (Marseille)', centroid: [6.1, 43.9], population: 5080000, areaKm2: 31400,
      mnemonic: '地中海沿岸のリゾート地コート・ダジュール。ラベンダー畑と最古の港湾都市マルセイユ、ニース。',
      municipalities: [
        { id: 'm-fr-pac-01', name: 'マルセイユ', nameLocal: 'Marseille', nameEn: 'Marseille', level: 3, subDivisionId: 'fr-pac', macroRegionId: 'fr-south', coordinates: [5.37, 43.30], population: 870000, isPrefecturalCapital: true, designation: 'フランス第2の都市' },
        { id: 'm-fr-pac-02', name: 'ニース', nameLocal: 'Nice', nameEn: 'Nice', level: 3, subDivisionId: 'fr-pac', macroRegionId: 'fr-south', coordinates: [7.26, 43.70], population: 343000, designation: '世界的保養地' }
      ]
    },
    {
      id: 'fr-occ', code: '76', name: 'オクシタニー地域圏', nameLocal: 'Occitanie', nameEn: 'Occitania', level: 2,
      macroRegionId: 'fr-south', capitalCity: 'トゥールーズ (Toulouse)', centroid: [2.0, 43.6], population: 5970000, areaKm2: 72724,
      mnemonic: 'ピレネー山脈と地中海に挟まれた南部。ヨーロッパの航空宇宙の首都トゥールーズ（エアバス）。',
      municipalities: [
        { id: 'm-fr-occ-01', name: 'トゥールーズ', nameLocal: 'Toulouse', nameEn: 'Toulouse', level: 3, subDivisionId: 'fr-occ', macroRegionId: 'fr-south', coordinates: [1.44, 43.60], population: 493000, isPrefecturalCapital: true, designation: '首府', notableFor: ['エアバス本社'] },
        { id: 'm-fr-occ-02', name: 'モンペリエ', nameLocal: 'Montpellier', nameEn: 'Montpellier', level: 3, subDivisionId: 'fr-occ', macroRegionId: 'fr-south', coordinates: [3.88, 43.61], population: 295000, designation: '大学都市' }
      ]
    },
    {
      id: 'fr-cor', code: '94', name: 'コルス地域圏 (コルシカ島)', nameLocal: 'Corse', nameEn: 'Corsica', level: 2,
      macroRegionId: 'fr-south', capitalCity: 'アジャクシオ (Ajaccio)', centroid: [9.1, 42.1], population: 340000, areaKm2: 8680,
      mnemonic: '地中海に浮かぶナポレオン生誕の島。独自の言語と険しい花崗岩の山岳美。特別自治地位。',
      municipalities: [
        { id: 'm-fr-cor-01', name: 'アジャクシオ', nameLocal: 'Ajaccio', nameEn: 'Ajaccio', level: 3, subDivisionId: 'fr-cor', macroRegionId: 'fr-south', coordinates: [8.74, 41.93], population: 71000, isPrefecturalCapital: true, designation: '首府', notableFor: ['ナポレオン生誕地'] }
      ]
    }
  ]
};
