import { CountryAdministrativeData } from '../../types/geo';

export const usaData: CountryAdministrativeData = {
  id: 'usa',
  name: 'アメリカ合衆国',
  nameLocal: 'United States of America',
  nameEn: 'United States',
  flag: '🇺🇸',
  center: [-98.5, 39.5],
  defaultZoom: 3.8,
  zoomLevels: {
    level1: 3.8,
    level2: 4.8,
    level3: 6.2,
  },
  geoJsonUrl: '/data/us-states.json',
  geoJsonNameProp: 'name',
  systemDescription: '米国の統治構造は「連邦政府」のもとに、第1階層として統計・地域区分の「広域・地方（4大国勢調査地域）」、第2階層として強い自治権を持つ「州・首府（50州＋首都・各州都）」、第3階層として「主要都市・特別区（全米主要大都市・都市圏）」で成り立っています。',
  levelNames: {
    level1: { ja: '広域・地方', local: 'Census Regions (4)', desc: '西部(West), 中西部(Midwest), 南部(South), 北東部(Northeast)' },
    level2: { ja: '都道府県・州・首府', local: 'States & Capitals', desc: '独自の憲法・議会を持つ50州および州都・連邦特別区' },
    level3: { ja: '主要都市・特別区', local: 'Major Cities & Metros', desc: 'ニューヨーク、ロサンゼルス、シカゴ等全米主要大都市' },
  },
  macroRegions: [
    {
      id: 'us-west',
      name: '西部地域',
      nameLocal: 'West Region',
      nameEn: 'West',
      level: 1,
      centroid: [-117.0, 40.0],
      color: '#0284c7',
      description: '太平洋岸やロッキー山脈、砂漠地帯を抱える。ハイテク産業（シリコンバレー）やエンタメ（ハリウッド）の中心。',
      subDivisionIds: [
        'us-ca', 'us-wa', 'us-or', 'us-nv', 'us-az', 'us-co', 'us-ut', 'us-id',
        'us-mt', 'us-wy', 'us-nm', 'us-ak', 'us-hi'
      ],
      population: 78000000,
    },
    {
      id: 'us-midwest',
      name: '中西部地域',
      nameLocal: 'Midwest Region',
      nameEn: 'Midwest',
      level: 1,
      centroid: [-89.0, 42.0],
      color: '#059669',
      description: '大平原と五大湖。アメリカの穀倉地帯（コーンベルト）であり、ラストベルトと呼ばれる製造業拠点。シカゴが中心。',
      subDivisionIds: [
        'us-il', 'us-oh', 'us-mi', 'us-in', 'us-wi', 'us-mn', 'us-ia', 'us-mo',
        'us-nd', 'us-sd', 'us-ne', 'us-ks'
      ],
      population: 68000000,
    },
    {
      id: 'us-south',
      name: '南部地域',
      nameLocal: 'South Region',
      nameEn: 'South',
      level: 1,
      centroid: [-87.0, 33.0],
      color: '#ea580c',
      description: 'テキサスやフロリダ、ジョージアなど人口増加著しいサンベルト地帯。石油化学・航空宇宙・音楽文化。',
      subDivisionIds: [
        'us-tx', 'us-fl', 'us-ga', 'us-nc', 'us-va', 'us-tn', 'us-sc', 'us-al',
        'us-la', 'us-ky', 'us-ok', 'us-ar', 'us-ms', 'us-wv', 'us-md', 'us-de'
      ],
      population: 126000000,
    },
    {
      id: 'us-northeast',
      name: '北東部地域',
      nameLocal: 'Northeast Region',
      nameEn: 'Northeast',
      level: 1,
      centroid: [-74.0, 42.0],
      color: '#7c3aed',
      description: '建国以来の歴史と金融・学術の中心地。メガロポリス（ボストン〜ニューヨーク〜フィラデルフィア〜ワシントンDC）。',
      subDivisionIds: [
        'us-ny', 'us-pa', 'us-ma', 'us-nj', 'us-ct', 'us-ri', 'us-nh', 'us-vt', 'us-me'
      ],
      population: 57000000,
    },
  ],
  subDivisions: [
    // ==========================================
    // WEST (13 States)
    // ==========================================
    {
      id: 'us-ca', code: 'CA', name: 'カリフォルニア州', nameLocal: 'California', nameEn: 'California', level: 2,
      macroRegionId: 'us-west', capitalCity: 'サクラメント (Sacramento)', centroid: [-119.5, 37.0], population: 39000000, areaKm2: 423970,
      mnemonic: '全米最多人口。太平洋岸の細長い州。シリコンバレーとハリウッド。州都サクラメント。',
      municipalities: [
        { id: 'm-us-ca-01', name: 'ロサンゼルス', nameLocal: 'Los Angeles', nameEn: 'Los Angeles', level: 3, subDivisionId: 'us-ca', macroRegionId: 'us-west', coordinates: [-118.24, 34.05], population: 3820000, designation: '全米第2の都市', notableFor: ['ハリウッド', 'ビバリーヒルズ'] },
        { id: 'm-us-ca-02', name: 'サンフランシスコ', nameLocal: 'San Francisco', nameEn: 'San Francisco', level: 3, subDivisionId: 'us-ca', macroRegionId: 'us-west', coordinates: [-122.42, 37.77], population: 810000, designation: '金融・テック港湾', notableFor: ['ゴールデンゲートブリッジ'] },
        { id: 'm-us-ca-03', name: 'サクラメント', nameLocal: 'Sacramento', nameEn: 'Sacramento', level: 3, subDivisionId: 'us-ca', macroRegionId: 'us-west', coordinates: [-121.49, 38.58], population: 525000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-wa', code: 'WA', name: 'ワシントン州', nameLocal: 'Washington', nameEn: 'Washington', level: 2,
      macroRegionId: 'us-west', capitalCity: 'オリンピア (Olympia)', centroid: [-120.5, 47.5], population: 7800000, areaKm2: 184827,
      mnemonic: '太平洋岸北西部。シアトル、マイクロソフト、アマゾン本社。州都オリンピア。',
      municipalities: [
        { id: 'm-us-wa-01', name: 'シアトル', nameLocal: 'Seattle', nameEn: 'Seattle', level: 3, subDivisionId: 'us-wa', macroRegionId: 'us-west', coordinates: [-122.33, 47.61], population: 750000, designation: '最大都市', notableFor: ['スペースニードル', 'Amazon本社'] }
      ]
    },
    {
      id: 'us-or', code: 'OR', name: 'オレゴン州', nameLocal: 'Oregon', nameEn: 'Oregon', level: 2,
      macroRegionId: 'us-west', capitalCity: 'セイラム (Salem)', centroid: [-120.5, 44.0], population: 4240000, areaKm2: 254799,
      mnemonic: '環境都市ポートランドと雄大な大自然。ナイキ本社。州都セイラム。',
      municipalities: [
        { id: 'm-us-or-01', name: 'ポートランド', nameLocal: 'Portland', nameEn: 'Portland', level: 3, subDivisionId: 'us-or', macroRegionId: 'us-west', coordinates: [-122.67, 45.51], population: 650000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-nv', code: 'NV', name: 'ネバダ州', nameLocal: 'Nevada', nameEn: 'Nevada', level: 2,
      macroRegionId: 'us-west', capitalCity: 'カーソンシティ (Carson City)', centroid: [-116.4, 38.8], population: 3100000, areaKm2: 286382,
      mnemonic: '砂漠の中のカジノリゾート・ラスベガス。州都は歴史あるカーソンシティ。',
      municipalities: [
        { id: 'm-us-nv-01', name: 'ラスベガス', nameLocal: 'Las Vegas', nameEn: 'Las Vegas', level: 3, subDivisionId: 'us-nv', macroRegionId: 'us-west', coordinates: [-115.14, 36.17], population: 640000, designation: '世界最大歓楽都市', notableFor: ['カジノ', 'ストリップ'] }
      ]
    },
    {
      id: 'us-az', code: 'AZ', name: 'アリゾナ州', nameLocal: 'Arizona', nameEn: 'Arizona', level: 2,
      macroRegionId: 'us-west', capitalCity: 'フェニックス (Phoenix)', centroid: [-111.7, 34.0], population: 7300000, areaKm2: 295234,
      mnemonic: '世界遺産グランドキャニオンと砂漠。急成長都市フェニックス。',
      municipalities: [
        { id: 'm-us-az-01', name: 'フェニックス', nameLocal: 'Phoenix', nameEn: 'Phoenix', level: 3, subDivisionId: 'us-az', macroRegionId: 'us-west', coordinates: [-112.07, 33.45], population: 1600000, isPrefecturalCapital: true, designation: '州都・全米第5の都市' }
      ]
    },
    {
      id: 'us-co', code: 'CO', name: 'コロラド州', nameLocal: 'Colorado', nameEn: 'Colorado', level: 2,
      macroRegionId: 'us-west', capitalCity: 'デンバー (Denver)', centroid: [-105.5, 39.0], population: 5840000, areaKm2: 269837,
      mnemonic: 'ロッキー山脈の最高峰が連なる州。海抜1マイルの都市デンバー。',
      municipalities: [
        { id: 'm-us-co-01', name: 'デンバー', nameLocal: 'Denver', nameEn: 'Denver', level: 3, subDivisionId: 'us-co', macroRegionId: 'us-west', coordinates: [-104.99, 39.74], population: 710000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-ut', code: 'UT', name: 'ユタ州', nameLocal: 'Utah', nameEn: 'Utah', level: 2,
      macroRegionId: 'us-west', capitalCity: 'ソルトレイクシティ (Salt Lake City)', centroid: [-111.9, 39.3], population: 3380000, areaKm2: 219882,
      mnemonic: 'グレートソルト湖と国立公園群（ザイオン、ブライスキャニオン）。冬季五輪開催地。',
      municipalities: [
        { id: 'm-us-ut-01', name: 'ソルトレイクシティ', nameLocal: 'Salt Lake City', nameEn: 'Salt Lake City', level: 3, subDivisionId: 'us-ut', macroRegionId: 'us-west', coordinates: [-111.89, 40.76], population: 200000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-id', code: 'ID', name: 'アイダホ州', nameLocal: 'Idaho', nameEn: 'Idaho', level: 2,
      macroRegionId: 'us-west', capitalCity: 'ボイシ (Boise)', centroid: [-114.7, 44.2], population: 1940000, areaKm2: 216443,
      mnemonic: '「宝石の州」。全米屈指のジャガイモ産地。州都ボイシ。',
      municipalities: [
        { id: 'm-us-id-01', name: 'ボイシ', nameLocal: 'Boise', nameEn: 'Boise', level: 3, subDivisionId: 'us-id', macroRegionId: 'us-west', coordinates: [-116.20, 43.61], population: 235000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-mt', code: 'MT', name: 'モンタナ州', nameLocal: 'Montana', nameEn: 'Montana', level: 2,
      macroRegionId: 'us-west', capitalCity: 'ヘレナ (Helena)', centroid: [-110.4, 46.9], population: 1120000, areaKm2: 380831,
      mnemonic: '「ビッグスカイ・カントリー」。氷河国立公園とイエローストーン北口。',
      municipalities: [
        { id: 'm-us-mt-01', name: 'ビリングス', nameLocal: 'Billings', nameEn: 'Billings', level: 3, subDivisionId: 'us-mt', macroRegionId: 'us-west', coordinates: [-108.50, 45.78], population: 117000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-wy', code: 'WY', name: 'ワイオミング州', nameLocal: 'Wyoming', nameEn: 'Wyoming', level: 2,
      macroRegionId: 'us-west', capitalCity: 'シャイアン (Cheyenne)', centroid: [-107.3, 43.0], population: 580000, areaKm2: 253335,
      mnemonic: '全米人口最少州（約58万人）。イエローストーン国立公園とカウボーイ文化。',
      municipalities: [
        { id: 'm-us-wy-01', name: 'シャイアン', nameLocal: 'Cheyenne', nameEn: 'Cheyenne', level: 3, subDivisionId: 'us-wy', macroRegionId: 'us-west', coordinates: [-104.82, 41.14], population: 65000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-nm', code: 'NM', name: 'ニューメキシコ州', nameLocal: 'New Mexico', nameEn: 'New Mexico', level: 2,
      macroRegionId: 'us-west', capitalCity: 'サンタフェ (Santa Fe)', centroid: [-106.0, 34.5], population: 2110000, areaKm2: 314917,
      mnemonic: '「魅惑の地」。先住民プエブロ文化と日干しレンガ建築の古都サンタフェ。アルバカーキ。',
      municipalities: [
        { id: 'm-us-nm-01', name: 'アルバカーキ', nameLocal: 'Albuquerque', nameEn: 'Albuquerque', level: 3, subDivisionId: 'us-nm', macroRegionId: 'us-west', coordinates: [-106.65, 35.08], population: 560000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-ak', code: 'AK', name: 'アラスカ州', nameLocal: 'Alaska', nameEn: 'Alaska', level: 2,
      macroRegionId: 'us-west', capitalCity: 'ジュノー (Juneau)', centroid: [-152.4, 64.2], population: 733000, areaKm2: 1723337,
      mnemonic: '全米最大の面積（日本の約4.5倍）。デナリ山（北米最高峰）、氷河、石油資源。',
      municipalities: [
        { id: 'm-us-ak-01', name: 'アンカレッジ', nameLocal: 'Anchorage', nameEn: 'Anchorage', level: 3, subDivisionId: 'us-ak', macroRegionId: 'us-west', coordinates: [-149.90, 61.21], population: 290000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-hi', code: 'HI', name: 'ハワイ州', nameLocal: 'Hawaii', nameEn: 'Hawaii', level: 2,
      macroRegionId: 'us-west', capitalCity: 'ホノルル (Honolulu)', centroid: [-157.8, 21.3], population: 1440000, areaKm2: 28313,
      mnemonic: '太平洋上の楽園・50番目の州。ワイキキビーチ、キラウエア火山、オアフ島ホノルル。',
      municipalities: [
        { id: 'm-us-hi-01', name: 'ホノルル', nameLocal: 'Honolulu', nameEn: 'Honolulu', level: 3, subDivisionId: 'us-hi', macroRegionId: 'us-west', coordinates: [-157.85, 21.30], population: 350000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },

    // ==========================================
    // MIDWEST (12 States)
    // ==========================================
    {
      id: 'us-il', code: 'IL', name: 'イリノイ州', nameLocal: 'Illinois', nameEn: 'Illinois', level: 2,
      macroRegionId: 'us-midwest', capitalCity: 'スプリングフィールド (Springfield)', centroid: [-89.2, 40.0], population: 12600000, areaKm2: 149995,
      mnemonic: '中西部の中核。ミシガン湖南岸に摩天楼の街シカゴ。リンカーンの地。',
      municipalities: [
        { id: 'm-us-il-01', name: 'シカゴ', nameLocal: 'Chicago', nameEn: 'Chicago', level: 3, subDivisionId: 'us-il', macroRegionId: 'us-midwest', coordinates: [-87.63, 41.88], population: 2660000, designation: '全米第3の都市', notableFor: ['摩天楼建築', '金融先物'] }
      ]
    },
    {
      id: 'us-oh', code: 'OH', name: 'オハイオ州', nameLocal: 'Ohio', nameEn: 'Ohio', level: 2,
      macroRegionId: 'us-midwest', capitalCity: 'コロンバス (Columbus)', centroid: [-82.7, 40.2], population: 11800000, areaKm2: 116096,
      mnemonic: 'エリー湖南岸。大統領のふるさと。自動車・製造業の中心。コロンバス、クリーブランド。',
      municipalities: [
        { id: 'm-us-oh-01', name: 'コロンバス', nameLocal: 'Columbus', nameEn: 'Columbus', level: 3, subDivisionId: 'us-oh', macroRegionId: 'us-midwest', coordinates: [-82.99, 39.96], population: 900000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-mi', code: 'MI', name: 'ミシガン州', nameLocal: 'Michigan', nameEn: 'Michigan', level: 2,
      macroRegionId: 'us-midwest', capitalCity: 'ランシング (Lansing)', centroid: [-84.5, 43.3], population: 10000000, areaKm2: 250487,
      mnemonic: 'ミトンの形。五大湖に囲まれた自動車の街デトロイト（モータウン）。',
      municipalities: [
        { id: 'm-us-mi-01', name: 'デトロイト', nameLocal: 'Detroit', nameEn: 'Detroit', level: 3, subDivisionId: 'us-mi', macroRegionId: 'us-midwest', coordinates: [-83.05, 42.33], population: 630000, designation: '自動車産業の都' }
      ]
    },
    {
      id: 'us-in', code: 'IN', name: 'インディアナ州', nameLocal: 'Indiana', nameEn: 'Indiana', level: 2,
      macroRegionId: 'us-midwest', capitalCity: 'インディアナポリス (Indianapolis)', centroid: [-86.1, 39.8], population: 6830000, areaKm2: 94326,
      mnemonic: '「アメリカの十字路」。世界三大レース「インディ500」で名高い。',
      municipalities: [
        { id: 'm-us-in-01', name: 'インディアナポリス', nameLocal: 'Indianapolis', nameEn: 'Indianapolis', level: 3, subDivisionId: 'us-in', macroRegionId: 'us-midwest', coordinates: [-86.15, 39.76], population: 880000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-wi', code: 'WI', name: 'ウィスコンシン州', nameLocal: 'Wisconsin', nameEn: 'Wisconsin', level: 2,
      macroRegionId: 'us-midwest', capitalCity: 'マディソン (Madison)', centroid: [-89.6, 44.5], population: 5890000, areaKm2: 169635,
      mnemonic: '「アメリカの酪農郷（America\'s Dairyland）」。チーズとビール。ミルウォーキー。',
      municipalities: [
        { id: 'm-us-wi-01', name: 'ミルウォーキー', nameLocal: 'Milwaukee', nameEn: 'Milwaukee', level: 3, subDivisionId: 'us-wi', macroRegionId: 'us-midwest', coordinates: [-87.90, 43.03], population: 570000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-mn', code: 'MN', name: 'ミネソタ州', nameLocal: 'Minnesota', nameEn: 'Minnesota', level: 2,
      macroRegionId: 'us-midwest', capitalCity: 'セントポール (Saint Paul)', centroid: [-94.6, 46.7], population: 5710000, areaKm2: 225163,
      mnemonic: '「1万の湖の地」。ミシシッピ川の水源。双子都市ミネアポリス＆セントポール。',
      municipalities: [
        { id: 'm-us-mn-01', name: 'ミネアポリス', nameLocal: 'Minneapolis', nameEn: 'Minneapolis', level: 3, subDivisionId: 'us-mn', macroRegionId: 'us-midwest', coordinates: [-93.26, 44.97], population: 425000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-ia', code: 'IA', name: 'アイオワ州', nameLocal: 'Iowa', nameEn: 'Iowa', level: 2,
      macroRegionId: 'us-midwest', capitalCity: 'デモイン (Des Moines)', centroid: [-93.5, 42.0], population: 3200000, areaKm2: 145746,
      mnemonic: 'コーンベルトの中心。全米有数のトウモロコシ・大豆生産地。大統領予備選挙の初戦。',
      municipalities: [
        { id: 'm-us-ia-01', name: 'デモイン', nameLocal: 'Des Moines', nameEn: 'Des Moines', level: 3, subDivisionId: 'us-ia', macroRegionId: 'us-midwest', coordinates: [-93.60, 41.58], population: 215000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-mo', code: 'MO', name: 'ミズーリ州', nameLocal: 'Missouri', nameEn: 'Missouri', level: 2,
      macroRegionId: 'us-midwest', capitalCity: 'ジェファーソンシティ (Jefferson City)', centroid: [-92.3, 38.6], population: 6180000, areaKm2: 180540,
      mnemonic: '西部開拓の玄関口セントルイスのゲートウェイ・アーチ。カンザスシティ。',
      municipalities: [
        { id: 'm-us-mo-01', name: 'セントルイス', nameLocal: 'St. Louis', nameEn: 'St. Louis', level: 3, subDivisionId: 'us-mo', macroRegionId: 'us-midwest', coordinates: [-90.19, 38.62], population: 300000, designation: '歴史的大都市' }
      ]
    },
    {
      id: 'us-nd', code: 'ND', name: 'ノースダコタ州', nameLocal: 'North Dakota', nameEn: 'North Dakota', level: 2,
      macroRegionId: 'us-midwest', capitalCity: 'ビスマーク (Bismarck)', centroid: [-100.8, 47.5], population: 780000, areaKm2: 183108,
      mnemonic: 'カナダ国境の大平原。農業とシェールオイル（バッケン油田）のエネルギー拠点。',
      municipalities: [
        { id: 'm-us-nd-01', name: 'ファーゴ', nameLocal: 'Fargo', nameEn: 'Fargo', level: 3, subDivisionId: 'us-nd', macroRegionId: 'us-midwest', coordinates: [-96.78, 46.87], population: 125000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-sd', code: 'SD', name: 'サウスダコタ州', nameLocal: 'South Dakota', nameEn: 'South Dakota', level: 2,
      macroRegionId: 'us-midwest', capitalCity: 'ピア (Pierre)', centroid: [-99.9, 44.3], population: 910000, areaKm2: 199729,
      mnemonic: 'ラシュモア山（4人の大統領彫像）とバッドランズ国立公園。大平原。',
      municipalities: [
        { id: 'm-us-sd-01', name: 'スーフォールズ', nameLocal: 'Sioux Falls', nameEn: 'Sioux Falls', level: 3, subDivisionId: 'us-sd', macroRegionId: 'us-midwest', coordinates: [-96.73, 43.54], population: 200000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-ne', code: 'NE', name: 'ネブラスカ州', nameLocal: 'Nebraska', nameEn: 'Nebraska', level: 2,
      macroRegionId: 'us-midwest', capitalCity: 'リンカーン (Lincoln)', centroid: [-99.9, 41.5], population: 1960000, areaKm2: 200330,
      mnemonic: '広大な大平原とオマハ（ウォーレン・バフェットの投資会社バークシャー・ハサウェイ）。',
      municipalities: [
        { id: 'm-us-ne-01', name: 'オマハ', nameLocal: 'Omaha', nameEn: 'Omaha', level: 3, subDivisionId: 'us-ne', macroRegionId: 'us-midwest', coordinates: [-95.93, 41.25], population: 485000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-ks', code: 'KS', name: 'カンザス州', nameLocal: 'Kansas', nameEn: 'Kansas', level: 2,
      macroRegionId: 'us-midwest', capitalCity: 'トピカ (Topeka)', centroid: [-98.5, 38.5], population: 2940000, areaKm2: 213100,
      mnemonic: 'アメリカ合衆国本土の地理的中心（48州のヘソ）。「ひまわりの州」。小麦の大産地。',
      municipalities: [
        { id: 'm-us-ks-01', name: 'ウィチタ', nameLocal: 'Wichita', nameEn: 'Wichita', level: 3, subDivisionId: 'us-ks', macroRegionId: 'us-midwest', coordinates: [-97.33, 37.68], population: 395000, designation: '航空機の街' }
      ]
    },

    // ==========================================
    // SOUTH (16 States)
    // ==========================================
    {
      id: 'us-tx', code: 'TX', name: 'テキサス州', nameLocal: 'Texas', nameEn: 'Texas', level: 2,
      macroRegionId: 'us-south', capitalCity: 'オースティン (Austin)', centroid: [-99.5, 31.5], population: 30000000, areaKm2: 695662,
      mnemonic: '全米第2の面積と人口。「孤高の星 (Lone Star)」。エネルギー、NASA、ハイテク。',
      municipalities: [
        { id: 'm-us-tx-01', name: 'ヒューストン', nameLocal: 'Houston', nameEn: 'Houston', level: 3, subDivisionId: 'us-tx', macroRegionId: 'us-south', coordinates: [-95.37, 29.76], population: 2300000, designation: '全米第4の都市', notableFor: ['NASAジョンソン宇宙センター'] },
        { id: 'm-us-tx-02', name: 'ダラス', nameLocal: 'Dallas', nameEn: 'Dallas', level: 3, subDivisionId: 'us-tx', macroRegionId: 'us-south', coordinates: [-96.80, 32.78], population: 1300000, designation: '商業・空港ハブ' },
        { id: 'm-us-tx-03', name: 'オースティン', nameLocal: 'Austin', nameEn: 'Austin', level: 3, subDivisionId: 'us-tx', macroRegionId: 'us-south', coordinates: [-97.74, 30.27], population: 975000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-fl', code: 'FL', name: 'フロリダ州', nameLocal: 'Florida', nameEn: 'Florida', level: 2,
      macroRegionId: 'us-south', capitalCity: 'タラハシー (Tallahassee)', centroid: [-82.5, 28.5], population: 22200000, areaKm2: 170312,
      mnemonic: '「サンシャイン・ステート」。ケネディ宇宙センター、マイアミ、ディズニー。',
      municipalities: [
        { id: 'm-us-fl-01', name: 'マイアミ', nameLocal: 'Miami', nameEn: 'Miami', level: 3, subDivisionId: 'us-fl', macroRegionId: 'us-south', coordinates: [-80.19, 25.76], population: 450000, designation: '中南米への玄関口' },
        { id: 'm-us-fl-02', name: 'オーランド', nameLocal: 'Orlando', nameEn: 'Orlando', level: 3, subDivisionId: 'us-fl', macroRegionId: 'us-south', coordinates: [-81.38, 28.54], population: 316000, designation: '観光都市' }
      ]
    },
    {
      id: 'us-ga', code: 'GA', name: 'ジョージア州', nameLocal: 'Georgia', nameEn: 'Georgia', level: 2,
      macroRegionId: 'us-south', capitalCity: 'アトランタ (Atlanta)', centroid: [-83.5, 32.7], population: 10900000, areaKm2: 153910,
      mnemonic: '南部の中心。「桃の州」。コカコーラ、CNN、デルタ航空の本拠アトランタ。',
      municipalities: [
        { id: 'm-us-ga-01', name: 'アトランタ', nameLocal: 'Atlanta', nameEn: 'Atlanta', level: 3, subDivisionId: 'us-ga', macroRegionId: 'us-south', coordinates: [-84.39, 33.75], population: 500000, isPrefecturalCapital: true, designation: '州都・最大都市' }
      ]
    },
    {
      id: 'us-nc', code: 'NC', name: 'ノースカロライナ州', nameLocal: 'North Carolina', nameEn: 'North Carolina', level: 2,
      macroRegionId: 'us-south', capitalCity: 'ローリー (Raleigh)', centroid: [-79.0, 35.8], population: 10700000, areaKm2: 139391,
      mnemonic: 'リサーチ・トライアングル（学術・バイオ先端特区）と金融の街シャーロット。ライト兄弟飛行の地。',
      municipalities: [
        { id: 'm-us-nc-01', name: 'シャーロット', nameLocal: 'Charlotte', nameEn: 'Charlotte', level: 3, subDivisionId: 'us-nc', macroRegionId: 'us-south', coordinates: [-80.84, 35.22], population: 890000, designation: '全米屈指の金融拠点' }
      ]
    },
    {
      id: 'us-va', code: 'VA', name: 'バージニア州', nameLocal: 'Virginia', nameEn: 'Virginia', level: 2,
      macroRegionId: 'us-south', capitalCity: 'リッチモンド (Richmond)', centroid: [-78.6, 37.5], population: 8680000, areaKm2: 110787,
      mnemonic: '「大統領の母」。初代ワシントンら8名の大統領を輩出。国防総省ペンタゴン。',
      municipalities: [
        { id: 'm-us-va-01', name: 'バージニアビーチ', nameLocal: 'Virginia Beach', nameEn: 'Virginia Beach', level: 3, subDivisionId: 'us-va', macroRegionId: 'us-south', coordinates: [-75.97, 36.85], population: 450000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-tn', code: 'TN', name: 'テネシー州', nameLocal: 'Tennessee', nameEn: 'Tennessee', level: 2,
      macroRegionId: 'us-south', capitalCity: 'ナッシュビル (Nashville)', centroid: [-86.6, 35.9], population: 7050000, areaKm2: 109153,
      mnemonic: '音楽の聖地。カントリーミュージックのナッシュビルと、エルヴィス・プレスリーのメンフィス。',
      municipalities: [
        { id: 'm-us-tn-01', name: 'ナッシュビル', nameLocal: 'Nashville', nameEn: 'Nashville', level: 3, subDivisionId: 'us-tn', macroRegionId: 'us-south', coordinates: [-86.78, 36.16], population: 690000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-sc', code: 'SC', name: 'サウスカロライナ州', nameLocal: 'South Carolina', nameEn: 'South Carolina', level: 2,
      macroRegionId: 'us-south', capitalCity: 'コロンビア (Columbia)', centroid: [-80.9, 34.0], population: 5280000, areaKm2: 82933,
      mnemonic: '大西洋沿岸のパルメットヤシの州。歴史ある港町チャールストンと温暖な気候。',
      municipalities: [
        { id: 'm-us-sc-01', name: 'チャールストン', nameLocal: 'Charleston', nameEn: 'Charleston', level: 3, subDivisionId: 'us-sc', macroRegionId: 'us-south', coordinates: [-79.93, 32.77], population: 150000, designation: '歴史的港町' }
      ]
    },
    {
      id: 'us-al', code: 'AL', name: 'アラバマ州', nameLocal: 'Alabama', nameEn: 'Alabama', level: 2,
      macroRegionId: 'us-south', capitalCity: 'モントゴメリー (Montgomery)', centroid: [-86.9, 32.8], population: 5070000, areaKm2: 135767,
      mnemonic: 'ディープサウスの中心。公民権運動の歴史（バーミングハム、セルマ）とNASAロケット開発（ハンツビル）。',
      municipalities: [
        { id: 'm-us-al-01', name: 'バーミングハム', nameLocal: 'Birmingham', nameEn: 'Birmingham', level: 3, subDivisionId: 'us-al', macroRegionId: 'us-south', coordinates: [-86.81, 33.52], population: 200000, designation: '工業都市' }
      ]
    },
    {
      id: 'us-la', code: 'LA', name: 'ルイジアナ州', nameLocal: 'Louisiana', nameEn: 'Louisiana', level: 2,
      macroRegionId: 'us-south', capitalCity: 'バトンルージュ (Baton Rouge)', centroid: [-91.9, 30.9], population: 4590000, areaKm2: 135659,
      mnemonic: 'ミシシッピ川河口デルタ。ジャズ発祥の地ニューオーリンズとフランス風フレンチクォーター。',
      municipalities: [
        { id: 'm-us-la-01', name: 'ニューオーリンズ', nameLocal: 'New Orleans', nameEn: 'New Orleans', level: 3, subDivisionId: 'us-la', macroRegionId: 'us-south', coordinates: [-90.07, 29.95], population: 380000, designation: 'ジャズの都' }
      ]
    },
    {
      id: 'us-ky', code: 'KY', name: 'ケンタッキー州', nameLocal: 'Kentucky', nameEn: 'Kentucky', level: 2,
      macroRegionId: 'us-south', capitalCity: 'フランクフォート (Frankfort)', centroid: [-84.7, 37.8], population: 4510000, areaKm2: 104656,
      mnemonic: '「ブルーグラス・ステート」。ケンタッキーダービー（競馬）、バーボンウイスキー。ルイビル。',
      municipalities: [
        { id: 'm-us-ky-01', name: 'ルイビル', nameLocal: 'Louisville', nameEn: 'Louisville', level: 3, subDivisionId: 'us-ky', macroRegionId: 'us-south', coordinates: [-85.75, 38.25], population: 630000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-ok', code: 'OK', name: 'オクラホマ州', nameLocal: 'Oklahoma', nameEn: 'Oklahoma', level: 2,
      macroRegionId: 'us-south', capitalCity: 'オクラホマシティ (Oklahoma City)', centroid: [-97.5, 35.6], population: 4020000, areaKm2: 181037,
      mnemonic: 'かつてのインディアン準州。石油産業とルート66。竜巻街道（トルネードアレー）。',
      municipalities: [
        { id: 'm-us-ok-01', name: 'オクラホマシティ', nameLocal: 'Oklahoma City', nameEn: 'Oklahoma City', level: 3, subDivisionId: 'us-ok', macroRegionId: 'us-south', coordinates: [-97.51, 35.46], population: 690000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-ar', code: 'AR', name: 'アーカンソー州', nameLocal: 'Arkansas', nameEn: 'Arkansas', level: 2,
      macroRegionId: 'us-south', capitalCity: 'リトルロック (Little Rock)', centroid: [-92.3, 34.7], population: 3040000, areaKm2: 137732,
      mnemonic: '「自然の州」。オザーク高原。世界最大の小売業者ウォルマートの本社（ベントンビル）。',
      municipalities: [
        { id: 'm-us-ar-01', name: 'リトルロック', nameLocal: 'Little Rock', nameEn: 'Little Rock', level: 3, subDivisionId: 'us-ar', macroRegionId: 'us-south', coordinates: [-92.28, 34.74], population: 200000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-ms', code: 'MS', name: 'ミシシッピ州', nameLocal: 'Mississippi', nameEn: 'Mississippi', level: 2,
      macroRegionId: 'us-south', capitalCity: 'ジャクソン (Jackson)', centroid: [-89.7, 32.7], population: 2940000, areaKm2: 125438,
      mnemonic: '大河ミシシッピ川と綿花地帯。デルタ・ブルース発祥の地。',
      municipalities: [
        { id: 'm-us-ms-01', name: 'ジャクソン', nameLocal: 'Jackson', nameEn: 'Jackson', level: 3, subDivisionId: 'us-ms', macroRegionId: 'us-south', coordinates: [-90.18, 32.29], population: 150000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-wv', code: 'WV', name: 'ウェストバージニア州', nameLocal: 'West Virginia', nameEn: 'West Virginia', level: 2,
      macroRegionId: 'us-south', capitalCity: 'チャールストン (Charleston)', centroid: [-80.4, 38.6], population: 1770000, areaKm2: 62756,
      mnemonic: '「山岳の州（Mountain State）」。アパラチア山脈の雄大な大自然と石炭鉱業の歴史。',
      municipalities: [
        { id: 'm-us-wv-01', name: 'チャールストン', nameLocal: 'Charleston', nameEn: 'Charleston', level: 3, subDivisionId: 'us-wv', macroRegionId: 'us-south', coordinates: [-81.63, 38.34], population: 48000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-md', code: 'MD', name: 'メリーランド州', nameLocal: 'Maryland', nameEn: 'Maryland', level: 2,
      macroRegionId: 'us-south', capitalCity: 'アナポリス (Annapolis)', centroid: [-76.6, 39.0], population: 6160000, areaKm2: 32131,
      mnemonic: 'チェサピーク湾の青蟹。首都ワシントンDCに隣接し、港湾都市ボルチモアを擁する。',
      municipalities: [
        { id: 'm-us-md-01', name: 'ボルチモア', nameLocal: 'Baltimore', nameEn: 'Baltimore', level: 3, subDivisionId: 'us-md', macroRegionId: 'us-south', coordinates: [-76.61, 39.29], population: 585000, designation: '歴史的港町' }
      ]
    },
    {
      id: 'us-de', code: 'DE', name: 'デラウェア州', nameLocal: 'Delaware', nameEn: 'Delaware', level: 2,
      macroRegionId: 'us-south', capitalCity: 'ドーバー (Dover)', centroid: [-75.5, 39.0], population: 1020000, areaKm2: 6446,
      mnemonic: '「最初の州 (The First State)」。合衆国憲法を最初に批准。全米有数の企業登記天国。',
      municipalities: [
        { id: 'm-us-de-01', name: 'ウィルミントン', nameLocal: 'Wilmington', nameEn: 'Wilmington', level: 3, subDivisionId: 'us-de', macroRegionId: 'us-south', coordinates: [-75.54, 39.74], population: 70000, designation: '企業金融都市' }
      ]
    },

    // ==========================================
    // NORTHEAST (9 States)
    // ==========================================
    {
      id: 'us-ny', code: 'NY', name: 'ニューヨーク州', nameLocal: 'New York', nameEn: 'New York', level: 2,
      macroRegionId: 'us-northeast', capitalCity: 'オールバニ (Albany)', centroid: [-75.5, 43.0], population: 19600000, areaKm2: 141300,
      mnemonic: '「帝国州 (Empire State)」。世界経済・文化の中心ニューヨーク市を擁する。州都はオールバニ。',
      municipalities: [
        { id: 'm-us-ny-01', name: 'ニューヨーク市', nameLocal: 'New York City (NYC)', nameEn: 'New York City', level: 3, subDivisionId: 'us-ny', macroRegionId: 'us-northeast', coordinates: [-74.00, 40.71], population: 8340000, designation: '全米最大都市', notableFor: ['自由の女神', 'ウォール街', 'タイムズスクエア'] },
        { id: 'm-us-ny-02', name: 'バッファロー', nameLocal: 'Buffalo', nameEn: 'Buffalo', level: 3, subDivisionId: 'us-ny', macroRegionId: 'us-northeast', coordinates: [-78.88, 42.89], population: 275000, designation: '五大湖沿岸都市' }
      ]
    },
    {
      id: 'us-pa', code: 'PA', name: 'ペンシルベニア州', nameLocal: 'Pennsylvania', nameEn: 'Pennsylvania', level: 2,
      macroRegionId: 'us-northeast', capitalCity: 'ハリスバーグ (Harrisburg)', centroid: [-77.2, 40.8], population: 12900000, areaKm2: 119283,
      mnemonic: 'アメリカ独立宣言の地フィラデルフィアと鉄鋼の街ピッツバーグ。州都ハリスバーグ。',
      municipalities: [
        { id: 'm-us-pa-01', name: 'フィラデルフィア', nameLocal: 'Philadelphia', nameEn: 'Philadelphia', level: 3, subDivisionId: 'us-pa', macroRegionId: 'us-northeast', coordinates: [-75.16, 39.95], population: 1570000, designation: '最大都市', notableFor: ['自由の鐘', '独立記念館'] }
      ]
    },
    {
      id: 'us-ma', code: 'MA', name: 'マサチューセッツ州', nameLocal: 'Massachusetts', nameEn: 'Massachusetts', level: 2,
      macroRegionId: 'us-northeast', capitalCity: 'ボストン (Boston)', centroid: [-71.8, 42.2], population: 7000000, areaKm2: 27336,
      mnemonic: 'アメリカ独立の揺りかご。ハーバード大学・MITなど世界最高峰の学術拠点ボストン。',
      municipalities: [
        { id: 'm-us-ma-01', name: 'ボストン', nameLocal: 'Boston', nameEn: 'Boston', level: 3, subDivisionId: 'us-ma', macroRegionId: 'us-northeast', coordinates: [-71.06, 42.36], population: 675000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-nj', code: 'NJ', name: 'ニュージャージー州', nameLocal: 'New Jersey', nameEn: 'New Jersey', level: 2,
      macroRegionId: 'us-northeast', capitalCity: 'トレントン (Trenton)', centroid: [-74.4, 40.1], population: 9280000, areaKm2: 22591,
      mnemonic: '全米最高水準の人口密度。「庭園の州（Garden State）」。製薬・化学産業とプリンストン大学。',
      municipalities: [
        { id: 'm-us-nj-01', name: 'ニューアーク', nameLocal: 'Newark', nameEn: 'Newark', level: 3, subDivisionId: 'us-nj', macroRegionId: 'us-northeast', coordinates: [-74.17, 40.73], population: 310000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-ct', code: 'CT', name: 'コネチカット州', nameLocal: 'Connecticut', nameEn: 'Connecticut', level: 2,
      macroRegionId: 'us-northeast', capitalCity: 'ハートフォード (Hartford)', centroid: [-72.7, 41.6], population: 3600000, areaKm2: 14357,
      mnemonic: '「憲法の州」。エール大学（ニューヘイブン）と全米保険業の都ハートフォード。',
      municipalities: [
        { id: 'm-us-ct-01', name: 'ブリッジポート', nameLocal: 'Bridgeport', nameEn: 'Bridgeport', level: 3, subDivisionId: 'us-ct', macroRegionId: 'us-northeast', coordinates: [-73.20, 41.18], population: 148000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-ri', code: 'RI', name: 'ロードアイランド州', nameLocal: 'Rhode Island', nameEn: 'Rhode Island', level: 2,
      macroRegionId: 'us-northeast', capitalCity: 'プロビデンス (Providence)', centroid: [-71.4, 41.6], population: 1090000, areaKm2: 4001,
      mnemonic: '全米最小面積の州（滋賀県と同規模）。「海洋の州（Ocean State）」。アイビーリーグ・ブラウン大学。',
      municipalities: [
        { id: 'm-us-ri-01', name: 'プロビデンス', nameLocal: 'Providence', nameEn: 'Providence', level: 3, subDivisionId: 'us-ri', macroRegionId: 'us-northeast', coordinates: [-71.41, 41.82], population: 190000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'us-nh', code: 'NH', name: 'ニューハンプシャー州', nameLocal: 'New Hampshire', nameEn: 'New Hampshire', level: 2,
      macroRegionId: 'us-northeast', capitalCity: 'コンコード (Concord)', centroid: [-71.6, 43.2], population: 1390000, areaKm2: 24214,
      mnemonic: 'モットーは「自由に生きる、さもなくば死を」。所得税・消費税なし。大統領予備選。',
      municipalities: [
        { id: 'm-us-nh-01', name: 'マンチェスター', nameLocal: 'Manchester', nameEn: 'Manchester', level: 3, subDivisionId: 'us-nh', macroRegionId: 'us-northeast', coordinates: [-71.45, 42.99], population: 115000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-vt', code: 'VT', name: 'バーモント州', nameLocal: 'Vermont', nameEn: 'Vermont', level: 2,
      macroRegionId: 'us-northeast', capitalCity: 'モントピリア (Montpelier)', centroid: [-72.7, 44.0], population: 647000, areaKm2: 24906,
      mnemonic: '「緑の山（グリーンマウンテン）の州」。メープルシロップと大自然。モントピリアは全米最少人口の州都。',
      municipalities: [
        { id: 'm-us-vt-01', name: 'バーリントン', nameLocal: 'Burlington', nameEn: 'Burlington', level: 3, subDivisionId: 'us-vt', macroRegionId: 'us-northeast', coordinates: [-73.21, 44.47], population: 45000, designation: '最大都市' }
      ]
    },
    {
      id: 'us-me', code: 'ME', name: 'メイン州', nameLocal: 'Maine', nameEn: 'Maine', level: 2,
      macroRegionId: 'us-northeast', capitalCity: 'オーガスタ (Augusta)', centroid: [-69.4, 45.3], population: 1380000, areaKm2: 91633,
      mnemonic: '合衆国本土の最東端。「松の木の州」。ロブスター漁と険しい灯台海岸線。',
      municipalities: [
        { id: 'm-us-me-01', name: 'ポートランド', nameLocal: 'Portland', nameEn: 'Portland', level: 3, subDivisionId: 'us-me', macroRegionId: 'us-northeast', coordinates: [-70.25, 43.66], population: 68000, designation: '最大都市' }
      ]
    }
  ]
};
