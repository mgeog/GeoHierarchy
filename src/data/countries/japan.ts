import { CountryAdministrativeData } from '../../types/geo';

export const japanData: CountryAdministrativeData = {
  id: 'japan',
  name: '日本',
  nameLocal: '日本 (Japan)',
  nameEn: 'Japan',
  flag: '🇯🇵',
  center: [137.5, 36.5],
  defaultZoom: 4.5,
  zoomLevels: {
    level1: 4.5,
    level2: 5.8,
    level3: 7.2,
  },
  geoJsonUrl: '/data/japan.geojson',
  geoJsonNameProp: 'name',
  systemDescription: '日本の地方自治体系は「国」のもとに、第1階層の地域区分（広域・地方、8地方）、第2階層の広域自治体「47都道府県・県庁所在地」、第3階層の基礎自治体「主要都市・特別区」から構成されています。',
  levelNames: {
    level1: { ja: '広域・地方', local: '地方 (8地方)', desc: '北海道、東北、関東、中部、近畿、中国、四国、九州沖縄の広域ブロック' },
    level2: { ja: '都道府県・首府', local: '都道府県 (47)', desc: '1都1道2府43県の広域自治体および県庁所在地' },
    level3: { ja: '主要都市・特別区', local: '市区町村・主要都市', desc: '政令指定都市、東京23特別区、主要中核都市' },
  },
  projectionConfig: {
    type: 'conicConformal',
    center: [137.5, 37.0],
    parallels: [30, 42],
    scaleMultiplier: 2400,
  },
  macroRegions: [
    {
      id: 'hokkaido',
      name: '北海道地方',
      nameLocal: '北海道',
      nameEn: 'Hokkaido',
      level: 1,
      centroid: [142.5, 43.5],
      color: '#0284c7',
      description: '日本最大の面積を誇る単独の道。豊かな大自然、農業・酪農・水産業、観光が盛ん。',
      subDivisionIds: ['jp-01'],
      population: 5180000,
    },
    {
      id: 'tohoku',
      name: '東北地方',
      nameLocal: '東北',
      nameEn: 'Tohoku',
      level: 1,
      centroid: [140.7, 39.5],
      color: '#059669',
      description: '本州北部の6県。米どころとして知られ、奥羽山脈を中心に自然豊か。伝統文化と四季の祭り。',
      subDivisionIds: ['jp-02', 'jp-03', 'jp-04', 'jp-05', 'jp-06', 'jp-07'],
      population: 8600000,
    },
    {
      id: 'kanto',
      name: '関東地方',
      nameLocal: '関東',
      nameEn: 'Kanto',
      level: 1,
      centroid: [139.8, 35.8],
      color: '#d97706',
      description: '首都東京を擁する日本最大のメガロポリス・政治経済の中枢。関東平野が広がる。',
      subDivisionIds: ['jp-08', 'jp-09', 'jp-10', 'jp-11', 'jp-12', 'jp-13', 'jp-14'],
      population: 43500000,
    },
    {
      id: 'chubu',
      name: '中部地方',
      nameLocal: '中部',
      nameEn: 'Chubu',
      level: 1,
      centroid: [137.2, 36.0],
      color: '#7c3aed',
      description: '日本アルプスを抱え、北陸・中央高地・東海に大別される。中京工業地帯など製造業・ものづくりの王国。',
      subDivisionIds: ['jp-15', 'jp-16', 'jp-17', 'jp-18', 'jp-19', 'jp-20', 'jp-21', 'jp-22', 'jp-23'],
      population: 21300000,
    },
    {
      id: 'kinki',
      name: '近畿地方 (関西)',
      nameLocal: '近畿・関西',
      nameEn: 'Kinki / Kansai',
      level: 1,
      centroid: [135.5, 34.8],
      color: '#dc2626',
      description: '京都・奈良など千年の古都の歴史と文化。大阪を中心とする西日本最大の経済圏。',
      subDivisionIds: ['jp-24', 'jp-25', 'jp-26', 'jp-27', 'jp-28', 'jp-29', 'jp-30'],
      population: 22400000,
    },
    {
      id: 'chugoku',
      name: '中国地方',
      nameLocal: '中国',
      nameEn: 'Chugoku',
      level: 1,
      centroid: [132.8, 34.8],
      color: '#ea580c',
      description: '山陰（日本海側）と山陽（瀬戸内海側）に分かれる。瀬戸内工業地域と歴史ある出雲・厳島。',
      subDivisionIds: ['jp-31', 'jp-32', 'jp-33', 'jp-34', 'jp-35'],
      population: 7150000,
    },
    {
      id: 'shikoku',
      name: '四国地方',
      nameLocal: '四国',
      nameEn: 'Shikoku',
      level: 1,
      centroid: [133.5, 33.7],
      color: '#16a34a',
      description: '瀬戸内海と太平洋に挟まれた四島。四国山地が東西に走る。お遍路文化と豊かな自然。',
      subDivisionIds: ['jp-36', 'jp-37', 'jp-38', 'jp-39'],
      population: 3650000,
    },
    {
      id: 'kyushu',
      name: '九州・沖縄地方',
      nameLocal: '九州・沖縄',
      nameEn: 'Kyushu & Okinawa',
      level: 1,
      centroid: [130.5, 32.5],
      color: '#0891b2',
      description: 'アジアへの玄関口。火山活動が盛んで温泉が多い。「シリコンアイランド」としても知られる。',
      subDivisionIds: ['jp-40', 'jp-41', 'jp-42', 'jp-43', 'jp-44', 'jp-45', 'jp-46', 'jp-47'],
      population: 14200000,
    },
  ],
  subDivisions: [
    // Hokkaido
    {
      id: 'jp-01', code: '01', name: '北海道', nameLocal: '北海道', nameEn: 'Hokkaido', level: 2,
      macroRegionId: 'hokkaido', capitalCity: '札幌市', centroid: [142.5, 43.5], population: 5180000, areaKm2: 83424,
      mnemonic: '日本最大の面積を誇る北の大地。四方を海に囲まれた巨大なひし形。',
      municipalities: [
        { id: 'm-01-01', name: '札幌市', nameLocal: '札幌市', nameEn: 'Sapporo', level: 3, subDivisionId: 'jp-01', macroRegionId: 'hokkaido', coordinates: [141.35, 43.06], population: 1970000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['道庁所在地', '雪まつり', 'ラーメン', '時計台'] },
        { id: 'm-01-02', name: '旭川市', nameLocal: '旭川市', nameEn: 'Asahikawa', level: 3, subDivisionId: 'jp-01', macroRegionId: 'hokkaido', coordinates: [142.36, 43.77], population: 330000, designation: '中核市', notableFor: ['旭山動物園', '家具'] },
        { id: 'm-01-03', name: '函館市', nameLocal: '函館市', nameEn: 'Hakodate', level: 3, subDivisionId: 'jp-01', macroRegionId: 'hokkaido', coordinates: [140.73, 41.77], population: 250000, designation: '中核市', notableFor: ['函館山夜景', '五稜郭'] },
      ]
    },
    // Tohoku
    {
      id: 'jp-02', code: '02', name: '青森県', nameLocal: '青森県', nameEn: 'Aomori', level: 2,
      macroRegionId: 'tohoku', capitalCity: '青森市', centroid: [140.7, 40.8], population: 1220000, areaKm2: 9645,
      mnemonic: '本州最北端。津軽半島と下北半島の斧の形。リンゴ生産日本一。',
      municipalities: [
        { id: 'm-02-01', name: '青森市', nameLocal: '青森市', nameEn: 'Aomori', level: 3, subDivisionId: 'jp-02', macroRegionId: 'tohoku', coordinates: [140.74, 40.82], population: 270000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['ねぶた祭', '八甲田山'] },
        { id: 'm-02-02', name: '八戸市', nameLocal: '八戸市', nameEn: 'Hachinohe', level: 3, subDivisionId: 'jp-02', macroRegionId: 'tohoku', coordinates: [141.49, 40.51], population: 220000, designation: '中核市', notableFor: ['八戸港', 'せんべい汁'] }
      ]
    },
    {
      id: 'jp-03', code: '03', name: '岩手県', nameLocal: '岩手県', nameEn: 'Iwate', level: 2,
      macroRegionId: 'tohoku', capitalCity: '盛岡市', centroid: [141.3, 39.6], population: 1200000, areaKm2: 15275,
      mnemonic: '北海道に次ぎ日本で2番目に広い県。三陸海岸のリアス式海岸。南部鉄器とわんこそば。',
      municipalities: [
        { id: 'm-03-01', name: '盛岡市', nameLocal: '盛岡市', nameEn: 'Morioka', level: 3, subDivisionId: 'jp-03', macroRegionId: 'tohoku', coordinates: [141.15, 39.70], population: 290000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['わんこそば', '盛岡冷麺'] }
      ]
    },
    {
      id: 'jp-04', code: '04', name: '宮城県', nameLocal: '宮城県', nameEn: 'Miyagi', level: 2,
      macroRegionId: 'tohoku', capitalCity: '仙台市', centroid: [140.9, 38.4], population: 2300000, areaKm2: 7282,
      mnemonic: '東北最大のメガシティ仙台を擁する。「杜の都」と日本三景・松島。',
      municipalities: [
        { id: 'm-04-01', name: '仙台市', nameLocal: '仙台市', nameEn: 'Sendai', level: 3, subDivisionId: 'jp-04', macroRegionId: 'tohoku', coordinates: [140.87, 38.27], population: 1090000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['杜の都', '七夕まつり', '牛タン', '伊達政宗'] }
      ]
    },
    {
      id: 'jp-05', code: '05', name: '秋田県', nameLocal: '秋田県', nameEn: 'Akita', level: 2,
      macroRegionId: 'tohoku', capitalCity: '秋田市', centroid: [140.3, 39.7], population: 950000, areaKm2: 11637,
      mnemonic: '男鹿半島の突き出た形となまはげ。あきたこまちと竿燈まつり。',
      municipalities: [
        { id: 'm-05-01', name: '秋田市', nameLocal: '秋田市', nameEn: 'Akita', level: 3, subDivisionId: 'jp-05', macroRegionId: 'tohoku', coordinates: [140.10, 39.72], population: 300000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['竿燈まつり', 'きりたんぽ'] }
      ]
    },
    {
      id: 'jp-06', code: '06', name: '山形県', nameLocal: '山形県', nameEn: 'Yamagata', level: 2,
      macroRegionId: 'tohoku', capitalCity: '山形市', centroid: [140.1, 38.4], population: 1060000, areaKm2: 9323,
      mnemonic: '人の横顔の形。サクランボ生産量日本一と最上川。',
      municipalities: [
        { id: 'm-06-01', name: '山形市', nameLocal: '山形市', nameEn: 'Yamagata', level: 3, subDivisionId: 'jp-06', macroRegionId: 'tohoku', coordinates: [140.34, 38.25], population: 246000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['花笠まつり', 'サクランボ'] }
      ]
    },
    {
      id: 'jp-07', code: '07', name: '福島県', nameLocal: '福島県', nameEn: 'Fukushima', level: 2,
      macroRegionId: 'tohoku', capitalCity: '福島市', centroid: [140.4, 37.4], population: 1820000, areaKm2: 13783,
      mnemonic: '会津・中通り・浜通りの3地域。猪苗代湖と磐梯山。果樹王国。',
      municipalities: [
        { id: 'm-07-01', name: '福島市', nameLocal: '福島市', nameEn: 'Fukushima', level: 3, subDivisionId: 'jp-07', macroRegionId: 'tohoku', coordinates: [140.47, 37.76], population: 280000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['桃の生産', '飯坂温泉'] },
        { id: 'm-07-02', name: '郡山市', nameLocal: '郡山市', nameEn: 'Koriyama', level: 3, subDivisionId: 'jp-07', macroRegionId: 'tohoku', coordinates: [140.38, 37.40], population: 325000, designation: '中核市', notableFor: ['経済の中心地'] }
      ]
    },
    // Kanto
    {
      id: 'jp-08', code: '08', name: '茨城県', nameLocal: '茨城県', nameEn: 'Ibaraki', level: 2,
      macroRegionId: 'kanto', capitalCity: '水戸市', centroid: [140.4, 36.3], population: 2850000, areaKm2: 6097,
      mnemonic: '霞ヶ浦と筑波山。水戸納豆とつくば研究学園都市。',
      municipalities: [
        { id: 'm-08-01', name: '水戸市', nameLocal: '水戸市', nameEn: 'Mito', level: 3, subDivisionId: 'jp-08', macroRegionId: 'kanto', coordinates: [140.45, 36.37], population: 268000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['偕楽園', '水戸納豆'] },
        { id: 'm-08-02', name: 'つくば市', nameLocal: 'つくば市', nameEn: 'Tsukuba', level: 3, subDivisionId: 'jp-08', macroRegionId: 'kanto', coordinates: [140.10, 36.08], population: 250000, designation: '中核市', notableFor: ['JAXA', '研究学園都市'] }
      ]
    },
    {
      id: 'jp-09', code: '09', name: '栃木県', nameLocal: '栃木県', nameEn: 'Tochigi', level: 2,
      macroRegionId: 'kanto', capitalCity: '宇都宮市', centroid: [139.8, 36.6], population: 1920000, areaKm2: 6408,
      mnemonic: '日光東照宮といちご（とちおとめ）。餃子の街宇都宮。',
      municipalities: [
        { id: 'm-09-01', name: '宇都宮市', nameLocal: '宇都宮市', nameEn: 'Utsunomiya', level: 3, subDivisionId: 'jp-09', macroRegionId: 'kanto', coordinates: [139.88, 36.56], population: 518000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['宇都宮餃子', 'LRT'] }
      ]
    },
    {
      id: 'jp-10', code: '10', name: '群馬県', nameLocal: '群馬県', nameEn: 'Gunma', level: 2,
      macroRegionId: 'kanto', capitalCity: '前橋市', centroid: [139.0, 36.4], population: 1910000, areaKm2: 6362,
      mnemonic: '鶴舞う形の群馬県。草津温泉と世界遺産・富岡製糸場。',
      municipalities: [
        { id: 'm-10-01', name: '前橋市', nameLocal: '前橋市', nameEn: 'Maebashi', level: 3, subDivisionId: 'jp-10', macroRegionId: 'kanto', coordinates: [139.06, 36.39], population: 330000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['赤城山', '県庁所在地'] },
        { id: 'm-10-02', name: '高崎市', nameLocal: '高崎市', nameEn: 'Takasaki', level: 3, subDivisionId: 'jp-10', macroRegionId: 'kanto', coordinates: [139.00, 36.32], population: 370000, designation: '中核市', notableFor: ['高崎だるま', '新幹線分岐点'] }
      ]
    },
    {
      id: 'jp-11', code: '11', name: '埼玉県', nameLocal: '埼玉県', nameEn: 'Saitama', level: 2,
      macroRegionId: 'kanto', capitalCity: 'さいたま市', centroid: [139.4, 36.0], population: 7340000, areaKm2: 3798,
      mnemonic: '東京北部のベッドタウン。秩父の山々と川越小江戸。',
      municipalities: [
        { id: 'm-11-01', name: 'さいたま市', nameLocal: 'さいたま市', nameEn: 'Saitama', level: 3, subDivisionId: 'jp-11', macroRegionId: 'kanto', coordinates: [139.64, 35.86], population: 1340000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['大宮駅ターミナル', 'さいたまスーパーアリーナ'] }
      ]
    },
    {
      id: 'jp-12', code: '12', name: '千葉県', nameLocal: '千葉県', nameEn: 'Chiba', level: 2,
      macroRegionId: 'kanto', capitalCity: '千葉市', centroid: [140.2, 35.5], population: 6280000, areaKm2: 5157,
      mnemonic: '房総半島をまるごと占める犬の形。成田国際空港とディズニーリゾート。',
      municipalities: [
        { id: 'm-12-01', name: '千葉市', nameLocal: '千葉市', nameEn: 'Chiba', level: 3, subDivisionId: 'jp-12', macroRegionId: 'kanto', coordinates: [140.12, 35.61], population: 980000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['幕張メッセ', '千葉都市モノレール'] }
      ]
    },
    {
      id: 'jp-13', code: '13', name: '東京都', nameLocal: '東京都', nameEn: 'Tokyo', level: 2,
      macroRegionId: 'kanto', capitalCity: '新宿区', centroid: [139.5, 35.7], population: 14000000, areaKm2: 2194,
      mnemonic: '日本の首都・政治経済文化の中枢。23特別区と多摩地域、島嶼部。',
      municipalities: [
        { id: 'm-13-01', name: '東京特別区 (23区)', nameLocal: '東京23区', nameEn: 'Tokyo 23 Wards', level: 3, subDivisionId: 'jp-13', macroRegionId: 'kanto', coordinates: [139.69, 35.69], population: 9700000, isCapital: true, isPrefecturalCapital: true, designation: '特別区群', notableFor: ['都庁(新宿)', '皇居', '渋谷', '銀座'] }
      ]
    },
    {
      id: 'jp-14', code: '14', name: '神奈川県', nameLocal: '神奈川県', nameEn: 'Kanagawa', level: 2,
      macroRegionId: 'kanto', capitalCity: '横浜市', centroid: [139.3, 35.4], population: 9230000, areaKm2: 2416,
      mnemonic: '東京に次ぐ人口2位。横浜・川崎・相模原の3政令指定都市。湘南海岸と箱根温泉。',
      municipalities: [
        { id: 'm-14-01', name: '横浜市', nameLocal: '横浜市', nameEn: 'Yokohama', level: 3, subDivisionId: 'jp-14', macroRegionId: 'kanto', coordinates: [139.64, 35.44], population: 3770000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['みなとみらい', '横浜中華街'] },
        { id: 'm-14-02', name: '川崎市', nameLocal: '川崎市', nameEn: 'Kawasaki', level: 3, subDivisionId: 'jp-14', macroRegionId: 'kanto', coordinates: [139.70, 35.53], population: 1540000, designation: '政令指定都市', notableFor: ['京浜工業地帯', '武蔵小杉'] }
      ]
    },
    // Chubu
    {
      id: 'jp-15', code: '15', name: '新潟県', nameLocal: '新潟県', nameEn: 'Niigata', level: 2,
      macroRegionId: 'chubu', capitalCity: '新潟市', centroid: [139.0, 37.7], population: 2200000, areaKm2: 12584,
      mnemonic: '日本一の米どころ。信濃川河口の港湾政令市新潟と佐渡島。',
      municipalities: [
        { id: 'm-15-01', name: '新潟市', nameLocal: '新潟市', nameEn: 'Niigata', level: 3, subDivisionId: 'jp-15', macroRegionId: 'chubu', coordinates: [139.03, 37.91], population: 780000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['萬代橋', '日本海側の政令市'] }
      ]
    },
    {
      id: 'jp-16', code: '16', name: '富山県', nameLocal: '富山県', nameEn: 'Toyama', level: 2,
      macroRegionId: 'chubu', capitalCity: '富山市', centroid: [137.2, 36.7], population: 1030000, areaKm2: 4247,
      mnemonic: '富山湾の神秘・ホタルイカと立山連峰・黒部ダム。くすりのまち。',
      municipalities: [
        { id: 'm-16-01', name: '富山市', nameLocal: '富山市', nameEn: 'Toyama', level: 3, subDivisionId: 'jp-16', macroRegionId: 'chubu', coordinates: [137.21, 36.70], population: 410000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['富山ライトレール', '薬売り'] }
      ]
    },
    {
      id: 'jp-17', code: '17', name: '石川県', nameLocal: '石川県', nameEn: 'Ishikawa', level: 2,
      macroRegionId: 'chubu', capitalCity: '金沢市', centroid: [136.7, 36.8], population: 1130000, areaKm2: 4186,
      mnemonic: '能登半島が日本海に突き出す。兼六園と加賀百万石の伝統工芸。',
      municipalities: [
        { id: 'm-17-01', name: '金沢市', nameLocal: '金沢市', nameEn: 'Kanazawa', level: 3, subDivisionId: 'jp-17', macroRegionId: 'chubu', coordinates: [136.65, 36.56], population: 460000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['兼六園', '21世紀美術館', '金箔'] }
      ]
    },
    {
      id: 'jp-18', code: '18', name: '福井県', nameLocal: '福井県', nameEn: 'Fukui', level: 2,
      macroRegionId: 'chubu', capitalCity: '福井市', centroid: [136.2, 35.9], population: 760000, areaKm2: 4190,
      mnemonic: '恐竜王国・勝山と越前ガニ。東尋坊の断崖絶壁とメガネ枠生産日本一。',
      municipalities: [
        { id: 'm-18-01', name: '福井市', nameLocal: '福井市', nameEn: 'Fukui', level: 3, subDivisionId: 'jp-18', macroRegionId: 'chubu', coordinates: [136.22, 36.06], population: 260000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['一乗谷朝倉氏遺跡', '越前ガニ'] }
      ]
    },
    {
      id: 'jp-19', code: '19', name: '山梨県', nameLocal: '山梨県', nameEn: 'Yamanashi', level: 2,
      macroRegionId: 'chubu', capitalCity: '甲府市', centroid: [138.6, 35.6], population: 810000, areaKm2: 4465,
      mnemonic: '富士山北麓と甲府盆地。ぶどう・桃の生産日本一と甲州ワイン。武田信玄。',
      municipalities: [
        { id: 'm-19-01', name: '甲府市', nameLocal: '甲府市', nameEn: 'Kofu', level: 3, subDivisionId: 'jp-19', macroRegionId: 'chubu', coordinates: [138.57, 35.66], population: 187000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['武田神社', 'ほうとう'] }
      ]
    },
    {
      id: 'jp-20', code: '20', name: '長野県', nameLocal: '長野県', nameEn: 'Nagano', level: 2,
      macroRegionId: 'chubu', capitalCity: '長野市', centroid: [138.0, 36.3], population: 2030000, areaKm2: 13562,
      mnemonic: '日本の屋根・日本アルプス。善光寺と松本城。軽井沢リゾート。',
      municipalities: [
        { id: 'm-20-01', name: '長野市', nameLocal: '長野市', nameEn: 'Nagano', level: 3, subDivisionId: 'jp-20', macroRegionId: 'chubu', coordinates: [138.18, 36.65], population: 370000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['善光寺', '信州そば'] },
        { id: 'm-20-02', name: '松本市', nameLocal: '松本市', nameEn: 'Matsumoto', level: 3, subDivisionId: 'jp-20', macroRegionId: 'chubu', coordinates: [137.97, 36.23], population: 240000, designation: '中核市', notableFor: ['国宝松本城', '上高地'] }
      ]
    },
    {
      id: 'jp-21', code: '21', name: '岐阜県', nameLocal: '岐阜県', nameEn: 'Gifu', level: 2,
      macroRegionId: 'chubu', capitalCity: '岐阜市', centroid: [137.0, 35.7], population: 1970000, areaKm2: 10621,
      mnemonic: '飛騨高山の古い町並みと世界遺産・白川郷合掌造り。美濃和紙と刃物の関市。',
      municipalities: [
        { id: 'm-21-01', name: '岐阜市', nameLocal: '岐阜市', nameEn: 'Gifu', level: 3, subDivisionId: 'jp-21', macroRegionId: 'chubu', coordinates: [136.76, 35.42], population: 400000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['長良川鵜飼', '岐阜城'] }
      ]
    },
    {
      id: 'jp-22', code: '22', name: '静岡県', nameLocal: '静岡県', nameEn: 'Shizuoka', level: 2,
      macroRegionId: 'chubu', capitalCity: '静岡市', centroid: [138.3, 35.0], population: 3600000, areaKm2: 7777,
      mnemonic: '富士山南麓とお茶・みかん。浜松市と静岡市の2政令指定都市。ものづくり産業。',
      municipalities: [
        { id: 'm-22-01', name: '静岡市', nameLocal: '静岡市', nameEn: 'Shizuoka', level: 3, subDivisionId: 'jp-22', macroRegionId: 'chubu', coordinates: [138.38, 34.97], population: 685000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['駿府城', 'プラモデルの街'] },
        { id: 'm-22-02', name: '浜松市', nameLocal: '浜松市', nameEn: 'Hamamatsu', level: 3, subDivisionId: 'jp-22', macroRegionId: 'chubu', coordinates: [137.72, 34.71], population: 790000, designation: '政令指定都市', notableFor: ['楽器産業(ヤマハ/カワイ)', 'うなぎ'] }
      ]
    },
    {
      id: 'jp-23', code: '23', name: '愛知県', nameLocal: '愛知県', nameEn: 'Aichi', level: 2,
      macroRegionId: 'chubu', capitalCity: '名古屋市', centroid: [137.1, 35.0], population: 7500000, areaKm2: 5173,
      mnemonic: 'ものづくり王国・中京工業地帯の中心。トヨタ自動車と名古屋めし。',
      municipalities: [
        { id: 'm-23-01', name: '名古屋市', nameLocal: '名古屋市', nameEn: 'Nagoya', level: 3, subDivisionId: 'jp-23', macroRegionId: 'chubu', coordinates: [136.90, 35.18], population: 2330000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['名古屋城金鯱', 'ひつまぶし', '熱田神宮'] },
        { id: 'm-23-02', name: '豊田市', nameLocal: '豊田市', nameEn: 'Toyota', level: 3, subDivisionId: 'jp-23', macroRegionId: 'chubu', coordinates: [137.15, 35.08], population: 420000, designation: '中核市', notableFor: ['トヨタ自動車本社'] }
      ]
    },
    // Kinki
    {
      id: 'jp-24', code: '24', name: '三重県', nameLocal: '三重県', nameEn: 'Mie', level: 2,
      macroRegionId: 'kinki', capitalCity: '津市', centroid: [136.5, 34.5], population: 1770000, areaKm2: 5777,
      mnemonic: 'お伊勢さん（伊勢神宮）と志摩半島の真珠養殖。松阪牛と四日市コンビナート。',
      municipalities: [
        { id: 'm-24-01', name: '津市', nameLocal: '津市', nameEn: 'Tsu', level: 3, subDivisionId: 'jp-24', macroRegionId: 'kinki', coordinates: [136.51, 34.72], population: 275000, isPrefecturalCapital: true, notableFor: ['県庁所在地', 'うなぎ消費量'] },
        { id: 'm-24-02', name: '四日市市', nameLocal: '四日市市', nameEn: 'Yokkaichi', level: 3, subDivisionId: 'jp-24', macroRegionId: 'kinki', coordinates: [136.62, 34.96], population: 310000, designation: '中核市', notableFor: ['石油化学コンビナート'] }
      ]
    },
    {
      id: 'jp-25', code: '25', name: '滋賀県', nameLocal: '滋賀県', nameEn: 'Shiga', level: 2,
      macroRegionId: 'kinki', capitalCity: '大津市', centroid: [136.0, 35.2], population: 1410000, areaKm2: 4017,
      mnemonic: '日本最大の湖・琵琶湖が中央に広がる。近江商人・近江牛。',
      municipalities: [
        { id: 'm-25-01', name: '大津市', nameLocal: '大津市', nameEn: 'Otsu', level: 3, subDivisionId: 'jp-25', macroRegionId: 'kinki', coordinates: [135.86, 35.00], population: 345000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['比叡山延暦寺', 'びわ湖花火'] }
      ]
    },
    {
      id: 'jp-26', code: '26', name: '京都府', nameLocal: '京都府', nameEn: 'Kyoto', level: 2,
      macroRegionId: 'kinki', capitalCity: '京都市', centroid: [135.5, 35.2], population: 2550000, areaKm2: 4612,
      mnemonic: '千年の都。日本文化・伝統芸能・寺社仏閣の世界的中心。先端ハイテク企業も多数。',
      municipalities: [
        { id: 'm-26-01', name: '京都市', nameLocal: '京都市', nameEn: 'Kyoto', level: 3, subDivisionId: 'jp-26', macroRegionId: 'kinki', coordinates: [135.76, 35.01], population: 1450000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['金閣寺・清水寺', '任天堂本社', '祇園祭'] }
      ]
    },
    {
      id: 'jp-27', code: '27', name: '大阪府', nameLocal: '大阪府', nameEn: 'Osaka', level: 2,
      macroRegionId: 'kinki', capitalCity: '大阪市', centroid: [135.5, 34.6], population: 8800000, areaKm2: 1905,
      mnemonic: '西日本の経済中枢。「天下の台所」と商人の町。大阪市・堺市の2政令指定都市。',
      municipalities: [
        { id: 'm-27-01', name: '大阪市', nameLocal: '大阪市', nameEn: 'Osaka', level: 3, subDivisionId: 'jp-27', macroRegionId: 'kinki', coordinates: [135.50, 34.69], population: 2750000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['大阪城', '道頓堀', '梅田'] },
        { id: 'm-27-02', name: '堺市', nameLocal: '堺市', nameEn: 'Sakai', level: 3, subDivisionId: 'jp-27', macroRegionId: 'kinki', coordinates: [135.48, 34.57], population: 820000, designation: '政令指定都市', notableFor: ['仁徳天皇陵(百舌鳥古墳群)', '刃物'] }
      ]
    },
    {
      id: 'jp-28', code: '28', name: '兵庫県', nameLocal: '兵庫県', nameEn: 'Hyogo', level: 2,
      macroRegionId: 'kinki', capitalCity: '神戸市', centroid: [134.8, 35.0], population: 5400000, areaKm2: 8400,
      mnemonic: '日本海と瀬戸内海の2つの海に面する。港町神戸と世界遺産姫路城。',
      municipalities: [
        { id: 'm-28-01', name: '神戸市', nameLocal: '神戸市', nameEn: 'Kobe', level: 3, subDivisionId: 'jp-28', macroRegionId: 'kinki', coordinates: [135.19, 34.69], population: 1520000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['神戸港', '神戸ビーフ', '六甲山'] },
        { id: 'm-28-02', name: '姫路市', nameLocal: '姫路市', nameEn: 'Himeji', level: 3, subDivisionId: 'jp-28', macroRegionId: 'kinki', coordinates: [134.69, 34.83], population: 530000, designation: '中核市', notableFor: ['国宝・世界遺産姫路城'] }
      ]
    },
    {
      id: 'jp-29', code: '29', name: '奈良県', nameLocal: '奈良県', nameEn: 'Nara', level: 2,
      macroRegionId: 'kinki', capitalCity: '奈良市', centroid: [135.8, 34.3], population: 1320000, areaKm2: 3691,
      mnemonic: '平城京と大仏の東大寺。奈良公園の鹿。法隆寺の世界最古木造建築。',
      municipalities: [
        { id: 'm-29-01', name: '奈良市', nameLocal: '奈良市', nameEn: 'Nara', level: 3, subDivisionId: 'jp-29', macroRegionId: 'kinki', coordinates: [135.80, 34.68], population: 350000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['東大寺大仏', '奈良公園'] }
      ]
    },
    {
      id: 'jp-30', code: '30', name: '和歌山県', nameLocal: '和歌山県', nameEn: 'Wakayama', level: 2,
      macroRegionId: 'kinki', capitalCity: '和歌山市', centroid: [135.4, 33.9], population: 910000, areaKm2: 4726,
      mnemonic: '紀伊半島の南西。高野山と熊野古道の世界遺産。有田みかんと南高梅。',
      municipalities: [
        { id: 'm-30-01', name: '和歌山市', nameLocal: '和歌山市', nameEn: 'Wakayama', level: 3, subDivisionId: 'jp-30', macroRegionId: 'kinki', coordinates: [135.17, 34.23], population: 350000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['和歌山城', '紀州梅'] }
      ]
    },
    // Chugoku
    {
      id: 'jp-31', code: '31', name: '鳥取県', nameLocal: '鳥取県', nameEn: 'Tottori', level: 2,
      macroRegionId: 'chugoku', capitalCity: '鳥取市', centroid: [133.9, 35.4], population: 550000, areaKm2: 3507,
      mnemonic: '日本で最も人口が少ない県。広大な鳥取砂丘と二十世紀梨。',
      municipalities: [
        { id: 'm-31-01', name: '鳥取市', nameLocal: '鳥取市', nameEn: 'Tottori', level: 3, subDivisionId: 'jp-31', macroRegionId: 'chugoku', coordinates: [134.23, 35.50], population: 185000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['鳥取砂丘', '白兎海岸'] }
      ]
    },
    {
      id: 'jp-32', code: '32', name: '島根県', nameLocal: '島根県', nameEn: 'Shimane', level: 2,
      macroRegionId: 'chugoku', capitalCity: '松江市', centroid: [132.5, 34.9], population: 660000, areaKm2: 6708,
      mnemonic: '神話の国・出雲大社と宍道湖。世界遺産の石見銀山。',
      municipalities: [
        { id: 'm-32-01', name: '松江市', nameLocal: '松江市', nameEn: 'Matsue', level: 3, subDivisionId: 'jp-32', macroRegionId: 'chugoku', coordinates: [133.05, 35.47], population: 200000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['松江城', '宍道湖のシジミ'] }
      ]
    },
    {
      id: 'jp-33', code: '33', name: '岡山県', nameLocal: '岡山県', nameEn: 'Okayama', level: 2,
      macroRegionId: 'chugoku', capitalCity: '岡山市', centroid: [133.8, 34.8], population: 1880000, areaKm2: 7114,
      mnemonic: '「晴れの国」岡山。政令市岡山市と白壁の美観地区・倉敷市。後楽園とマスカット。',
      municipalities: [
        { id: 'm-33-01', name: '岡山市', nameLocal: '岡山市', nameEn: 'Okayama', level: 3, subDivisionId: 'jp-33', macroRegionId: 'chugoku', coordinates: [133.93, 34.66], population: 720000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['岡山後楽園', '桃太郎伝説'] },
        { id: 'm-33-02', name: '倉敷市', nameLocal: '倉敷市', nameEn: 'Kurashiki', level: 3, subDivisionId: 'jp-33', macroRegionId: 'chugoku', coordinates: [133.77, 34.58], population: 470000, designation: '中核市', notableFor: ['倉敷美観地区', '水島臨海工業地帯'] }
      ]
    },
    {
      id: 'jp-34', code: '34', name: '広島県', nameLocal: '広島県', nameEn: 'Hiroshima', level: 2,
      macroRegionId: 'chugoku', capitalCity: '広島市', centroid: [132.8, 34.5], population: 2780000, areaKm2: 8479,
      mnemonic: '中国地方の中枢。世界遺産の原爆ドームと厳島神社。マツダ自動車と牡蠣。',
      municipalities: [
        { id: 'm-34-01', name: '広島市', nameLocal: '広島市', nameEn: 'Hiroshima', level: 3, subDivisionId: 'jp-34', macroRegionId: 'chugoku', coordinates: [132.46, 34.39], population: 1190000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['平和記念公園・原爆ドーム', 'お好み焼き'] },
        { id: 'm-34-02', name: '福山市', nameLocal: '福山市', nameEn: 'Fukuyama', level: 3, subDivisionId: 'jp-34', macroRegionId: 'chugoku', coordinates: [133.36, 34.48], population: 460000, designation: '中核市', notableFor: ['鉄鋼の街', '鞆の浦'] }
      ]
    },
    {
      id: 'jp-35', code: '35', name: '山口県', nameLocal: '山口県', nameEn: 'Yamaguchi', level: 2,
      macroRegionId: 'chugoku', capitalCity: '山口市', centroid: [131.5, 34.2], population: 1330000, areaKm2: 6112,
      mnemonic: '本州最西端。日本最大のカルスト台地・秋吉台。下関のフグと錦帯橋。',
      municipalities: [
        { id: 'm-35-01', name: '山口市', nameLocal: '山口市', nameEn: 'Yamaguchi', level: 3, subDivisionId: 'jp-35', macroRegionId: 'chugoku', coordinates: [131.47, 34.18], population: 190000, isPrefecturalCapital: true, notableFor: ['瑠璃光寺五重塔', '湯田温泉'] },
        { id: 'm-35-02', name: '下関市', nameLocal: '下関市', nameEn: 'Shimonoseki', level: 3, subDivisionId: 'jp-35', macroRegionId: 'chugoku', coordinates: [130.93, 33.95], population: 250000, designation: '中核市', notableFor: ['下関ふぐ', '関門海峡'] }
      ]
    },
    // Shikoku
    {
      id: 'jp-36', code: '36', name: '徳島県', nameLocal: '徳島県', nameEn: 'Tokushima', level: 2,
      macroRegionId: 'shikoku', capitalCity: '徳島市', centroid: [134.2, 33.9], population: 710000, areaKm2: 4146,
      mnemonic: '鳴門の渦潮と阿波おどり。吉野川とすだちの産地。',
      municipalities: [
        { id: 'm-36-01', name: '徳島市', nameLocal: '徳島市', nameEn: 'Tokushima', level: 3, subDivisionId: 'jp-36', macroRegionId: 'shikoku', coordinates: [134.55, 34.07], population: 250000, isPrefecturalCapital: true, notableFor: ['阿波おどり', '鳴門海峡'] }
      ]
    },
    {
      id: 'jp-37', code: '37', name: '香川県', nameLocal: '香川県', nameEn: 'Kagawa', level: 2,
      macroRegionId: 'shikoku', capitalCity: '高松市', centroid: [134.0, 34.2], population: 940000, areaKm2: 1876,
      mnemonic: '日本で最も面積が小さい県。「うどん県」として有名。瀬戸大橋の四国側玄関口。',
      municipalities: [
        { id: 'm-37-01', name: '高松市', nameLocal: '高松市', nameEn: 'Takamatsu', level: 3, subDivisionId: 'jp-37', macroRegionId: 'shikoku', coordinates: [134.04, 34.34], population: 415000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['栗林公園', '讃岐うどん'] }
      ]
    },
    {
      id: 'jp-38', code: '38', name: '愛媛県', nameLocal: '愛媛県', nameEn: 'Ehime', level: 2,
      macroRegionId: 'shikoku', capitalCity: '松山市', centroid: [132.8, 33.6], population: 1320000, areaKm2: 5676,
      mnemonic: '道後温泉と松山城。しまなみ海道の起点。みかんと今治タオル。',
      municipalities: [
        { id: 'm-38-01', name: '松山市', nameLocal: '松山市', nameEn: 'Matsuyama', level: 3, subDivisionId: 'jp-38', macroRegionId: 'shikoku', coordinates: [132.76, 33.84], population: 510000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['道後温泉本館', '松山城'] }
      ]
    },
    {
      id: 'jp-39', code: '39', name: '高知県', nameLocal: '高知県', nameEn: 'Kochi', level: 2,
      macroRegionId: 'shikoku', capitalCity: '高知市', centroid: [133.4, 33.4], population: 680000, areaKm2: 7103,
      mnemonic: '太平洋を臨む扇形の県。桂浜の坂本龍馬像とよさこい祭り。清流・四万十川。カツオのタタキ。',
      municipalities: [
        { id: 'm-39-01', name: '高知市', nameLocal: '高知市', nameEn: 'Kochi', level: 3, subDivisionId: 'jp-39', macroRegionId: 'shikoku', coordinates: [133.53, 33.56], population: 320000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['高知城', 'カツオのタタキ', 'よさこい'] }
      ]
    },
    // Kyushu
    {
      id: 'jp-40', code: '40', name: '福岡県', nameLocal: '福岡県', nameEn: 'Fukuoka', level: 2,
      macroRegionId: 'kyushu', capitalCity: '福岡市', centroid: [130.6, 33.6], population: 5120000, areaKm2: 4986,
      mnemonic: '九州最大の拠点。福岡市と北九州市の2大政令指定都市。アジアへの門戸。',
      municipalities: [
        { id: 'm-40-01', name: '福岡市', nameLocal: '福岡市', nameEn: 'Fukuoka', level: 3, subDivisionId: 'jp-40', macroRegionId: 'kyushu', coordinates: [130.40, 33.59], population: 1630000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['博多どんたく', '屋台文化', '豚骨ラーメン'] },
        { id: 'm-40-02', name: '北九州市', nameLocal: '北九州市', nameEn: 'Kitakyushu', level: 3, subDivisionId: 'jp-40', macroRegionId: 'kyushu', coordinates: [130.88, 33.88], population: 920000, designation: '政令指定都市', notableFor: ['八幡製鐵所', '門司港レトロ'] }
      ]
    },
    {
      id: 'jp-41', code: '41', name: '佐賀県', nameLocal: '佐賀県', nameEn: 'Saga', level: 2,
      macroRegionId: 'kyushu', capitalCity: '佐賀市', centroid: [130.1, 33.3], population: 800000, areaKm2: 2440,
      mnemonic: '有明海と玄界灘の2つの海。有田焼・伊万里焼の陶磁器と吉野ヶ里遺跡。',
      municipalities: [
        { id: 'm-41-01', name: '佐賀市', nameLocal: '佐賀市', nameEn: 'Saga', level: 3, subDivisionId: 'jp-41', macroRegionId: 'kyushu', coordinates: [130.30, 33.26], population: 230000, isPrefecturalCapital: true, notableFor: ['佐賀インターナショナルバルーンフェスタ'] }
      ]
    },
    {
      id: 'jp-42', code: '42', name: '長崎県', nameLocal: '長崎県', nameEn: 'Nagasaki', level: 2,
      macroRegionId: 'kyushu', capitalCity: '長崎市', centroid: [129.8, 33.0], population: 1300000, areaKm2: 4132,
      mnemonic: '日本一島が多い県。出島とキリシタン文化。世界新三大夜景の長崎港。',
      municipalities: [
        { id: 'm-42-01', name: '長崎市', nameLocal: '長崎市', nameEn: 'Nagasaki', level: 3, subDivisionId: 'jp-42', macroRegionId: 'kyushu', coordinates: [129.87, 32.75], population: 400000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['平和祈念像', 'グラバー園', '長崎ちゃんぽん'] },
        { id: 'm-42-02', name: '佐世保市', nameLocal: '佐世保市', nameEn: 'Sasebo', level: 3, subDivisionId: 'jp-42', macroRegionId: 'kyushu', coordinates: [129.72, 33.16], population: 240000, designation: '中核市', notableFor: ['ハウステンボス', '佐世保バーガー'] }
      ]
    },
    {
      id: 'jp-43', code: '43', name: '熊本県', nameLocal: '熊本県', nameEn: 'Kumamoto', level: 2,
      macroRegionId: 'kyushu', capitalCity: '熊本市', centroid: [130.8, 32.7], population: 1730000, areaKm2: 7409,
      mnemonic: '火の国・阿蘇山の大カルデラと名城・熊本城。TSMC進出で半導体集積地。',
      municipalities: [
        { id: 'm-43-01', name: '熊本市', nameLocal: '熊本市', nameEn: 'Kumamoto', level: 3, subDivisionId: 'jp-43', macroRegionId: 'kyushu', coordinates: [130.74, 32.79], population: 740000, isPrefecturalCapital: true, designation: '政令指定都市', notableFor: ['熊本城', 'くまモン', '馬刺し'] }
      ]
    },
    {
      id: 'jp-44', code: '44', name: '大分県', nameLocal: '大分県', nameEn: 'Oita', level: 2,
      macroRegionId: 'kyushu', capitalCity: '大分市', centroid: [131.5, 33.2], population: 1120000, areaKm2: 6340,
      mnemonic: '「おんせん県おおいた」。別府温泉と湯布院温泉の湧出量日本一。',
      municipalities: [
        { id: 'm-44-01', name: '大分市', nameLocal: '大分市', nameEn: 'Oita', level: 3, subDivisionId: 'jp-44', macroRegionId: 'kyushu', coordinates: [131.61, 33.23], population: 475000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['大分臨海工業地域', '高崎山'] },
        { id: 'm-44-02', name: '別府市', nameLocal: '別府市', nameEn: 'Beppu', level: 3, subDivisionId: 'jp-44', macroRegionId: 'kyushu', coordinates: [131.50, 33.28], population: 115000, notableFor: ['別府八湯', '地獄めぐり'] }
      ]
    },
    {
      id: 'jp-45', code: '45', name: '宮崎県', nameLocal: '宮崎県', nameEn: 'Miyazaki', level: 2,
      macroRegionId: 'kyushu', capitalCity: '宮崎市', centroid: [131.4, 32.2], population: 1060000, areaKm2: 7735,
      mnemonic: '南国情緒豊かな日南海岸とフェニックスの並木。高千穂峡とマンゴー、地鶏。',
      municipalities: [
        { id: 'm-45-01', name: '宮崎市', nameLocal: '宮崎市', nameEn: 'Miyazaki', level: 3, subDivisionId: 'jp-45', macroRegionId: 'kyushu', coordinates: [131.42, 31.91], population: 400000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['青島神社', 'チキン南蛮'] }
      ]
    },
    {
      id: 'jp-46', code: '46', name: '鹿児島県', nameLocal: '鹿児島県', nameEn: 'Kagoshima', level: 2,
      macroRegionId: 'kyushu', capitalCity: '鹿児島市', centroid: [130.5, 31.5], population: 1580000, areaKm2: 9187,
      mnemonic: '錦江湾に浮かぶ活火山・桜島。薩摩藩・西郷隆盛の歴史。屋久島・奄美大島。',
      municipalities: [
        { id: 'm-46-01', name: '鹿児島市', nameLocal: '鹿児島市', nameEn: 'Kagoshima', level: 3, subDivisionId: 'jp-46', macroRegionId: 'kyushu', coordinates: [130.55, 31.59], population: 590000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['桜島', '仙巌園', '黒豚'] }
      ]
    },
    {
      id: 'jp-47', code: '47', name: '沖縄県', nameLocal: '沖縄県', nameEn: 'Okinawa', level: 2,
      macroRegionId: 'kyushu', capitalCity: '那覇市', centroid: [127.8, 26.3], population: 1460000, areaKm2: 2281,
      mnemonic: '日本最南端・最西端の亜熱帯諸島。琉球王国の歴史と美しい珊瑚礁。',
      municipalities: [
        { id: 'm-47-01', name: '那覇市', nameLocal: '那覇市', nameEn: 'Naha', level: 3, subDivisionId: 'jp-47', macroRegionId: 'kyushu', coordinates: [127.68, 26.21], population: 315000, isPrefecturalCapital: true, designation: '中核市', notableFor: ['首里城', '国際通り', 'ゆいレール'] }
      ]
    }
  ]
};
