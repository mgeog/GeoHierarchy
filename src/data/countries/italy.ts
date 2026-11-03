import { CountryAdministrativeData } from '../../types/geo';

export const italyData: CountryAdministrativeData = {
  id: 'italy',
  name: 'イタリア共和国',
  nameLocal: 'Repubblica Italiana',
  nameEn: 'Italy',
  flag: '🇮🇹',
  center: [12.5, 42.0],
  defaultZoom: 5.4,
  zoomLevels: {
    level1: 5.4,
    level2: 6.4,
    level3: 7.5,
  },
  geoJsonUrl: '/data/italy.json',
  geoJsonNameProp: 'reg_name',
  systemDescription: 'イタリアは、第1階層として「広域・地方（5大地域区分）」、第2階層として「都道府県・州・首府（20州・各州都）」、第3階層として「主要都市・特別区（ローマ首都圏、主要コムーネ）」で構成されています。',
  levelNames: {
    level1: { ja: '広域・地方', local: 'Grandi Regioni (5)', desc: '北西部、北東部、中部、南部、島嶼部の5大広域ブロック' },
    level2: { ja: '都道府県・州・首府', local: 'Regioni & Capoluoghi', desc: 'ロンバルディア、トスカーナ等の20州および州都' },
    level3: { ja: '主要都市・特別区', local: 'Città & Comuni', desc: 'ローマ、ミラノ、ナポリ、フィレンツェ等の主要都市' },
  },
  macroRegions: [
    {
      id: 'it-nw',
      name: '北西部イタリア',
      nameLocal: 'Nord-Ovest',
      nameEn: 'North-West',
      level: 1,
      centroid: [8.5, 45.2],
      color: '#0284c7',
      description: 'イタリア経済・工業の中心。ファッションと金融の都ミラノ、自動車のトリノ、港湾都市ジェノヴァ。',
      subDivisionIds: ['it-lom', 'it-pie', 'it-lig', 'it-vda'],
      population: 16100000,
    },
    {
      id: 'it-ne',
      name: '北東部イタリア',
      nameLocal: 'Nord-Est',
      nameEn: 'North-East',
      level: 1,
      centroid: [11.8, 45.5],
      color: '#059669',
      description: '水の都ヴェネツィア、ドロミテ渓谷、美食のボローニャ（エミリア＝ロマーニャ）。中小企業の集積地。',
      subDivisionIds: ['it-ven', 'it-emr', 'it-taa', 'it-fvg'],
      population: 11600000,
    },
    {
      id: 'it-center',
      name: '中部イタリア',
      nameLocal: 'Centro',
      nameEn: 'Central',
      level: 1,
      centroid: [12.4, 42.8],
      color: '#d97706',
      description: 'ルネサンスの揺りかごフィレンツェ（トスカーナ）と、永遠の都・首都ローマ（ラツィオ）。',
      subDivisionIds: ['it-tos', 'it-laz', 'it-umb', 'it-mar'],
      population: 11800000,
    },
    {
      id: 'it-south',
      name: '南部イタリア',
      nameLocal: 'Sud',
      nameEn: 'South',
      level: 1,
      centroid: [15.0, 40.8],
      color: '#ea580c',
      description: 'ナポリとポンペイ、アマルフィ海岸、太陽とオリーブのプーリア。温暖な地中海気候。',
      subDivisionIds: ['it-cam', 'it-pug', 'it-cal', 'it-bas', 'it-abr', 'it-mol'],
      population: 13900000,
    },
    {
      id: 'it-islands',
      name: '島嶼部イタリア',
      nameLocal: 'Isole',
      nameEn: 'Islands',
      level: 1,
      centroid: [14.0, 37.8],
      color: '#7c3aed',
      description: '地中海最大の島シチリアと、エメラルドの海サルデーニャ。独自の言語文化と古代遺跡。',
      subDivisionIds: ['it-sic', 'it-sar'],
      population: 6600000,
    },
  ],
  subDivisions: [
    // North-West (4)
    {
      id: 'it-lom', code: 'LOM', name: 'ロンバルディア州', nameLocal: 'Lombardia', nameEn: 'Lombardy', level: 2,
      macroRegionId: 'it-nw', capitalCity: 'ミラノ (Milano)', centroid: [9.8, 45.7], population: 10000000, areaKm2: 23861,
      mnemonic: 'イタリア最大の人口とGDPを誇る経済中枢。ミラノのドゥオーモ、ファッション、コモ湖。',
      municipalities: [
        { id: 'm-it-lom-01', name: 'ミラノ', nameLocal: 'Milano', nameEn: 'Milan', level: 3, subDivisionId: 'it-lom', macroRegionId: 'it-nw', coordinates: [9.19, 45.46], population: 1400000, isPrefecturalCapital: true, designation: '経済・ファッションの中心', notableFor: ['ドゥオーモ', '最後の晩餐'] },
        { id: 'm-it-lom-02', name: 'ベルガモ', nameLocal: 'Bergamo', nameEn: 'Bergamo', level: 3, subDivisionId: 'it-lom', macroRegionId: 'it-nw', coordinates: [9.67, 45.69], population: 120000, designation: '城壁都市' }
      ]
    },
    {
      id: 'it-pie', code: 'PIE', name: 'ピエモンテ州', nameLocal: 'Piemonte', nameEn: 'Piedmont', level: 2,
      macroRegionId: 'it-nw', capitalCity: 'トリノ (Torino)', centroid: [7.9, 45.0], population: 4300000, areaKm2: 25402,
      mnemonic: '「山の足元」を意味するアルプス南麓の州。自動車のFIAT、ワイン（バローロ）、トリノ五輪。',
      municipalities: [
        { id: 'm-it-pie-01', name: 'トリノ', nameLocal: 'Torino', nameEn: 'Turin', level: 3, subDivisionId: 'it-pie', macroRegionId: 'it-nw', coordinates: [7.68, 45.07], population: 850000, isPrefecturalCapital: true, designation: '州都', notableFor: ['フィアット本社', 'エジプト博物館'] }
      ]
    },
    {
      id: 'it-lig', code: 'LIG', name: 'リグーリア州', nameLocal: 'Liguria', nameEn: 'Liguria', level: 2,
      macroRegionId: 'it-nw', capitalCity: 'ジェノヴァ (Genova)', centroid: [8.9, 44.4], population: 1500000, areaKm2: 5422,
      mnemonic: 'ジェノヴァ湾沿いに弓なりに伸びる海岸州。海洋共和国ジェノヴァと世界遺産チンクエ・テッレ。',
      municipalities: [
        { id: 'm-it-lig-01', name: 'ジェノヴァ', nameLocal: 'Genova', nameEn: 'Genoa', level: 3, subDivisionId: 'it-lig', macroRegionId: 'it-nw', coordinates: [8.94, 44.41], population: 580000, isPrefecturalCapital: true, designation: '最大港湾都市', notableFor: ['コロンブスの生家', 'ジェノヴァ港'] }
      ]
    },
    {
      id: 'it-vda', code: 'VDA', name: 'ヴァッレ・ダオスタ州', nameLocal: "Valle d'Aosta", nameEn: 'Aosta Valley', level: 2,
      aliases: ["Valle d'Aosta", "Vallée d'Aoste", "Valle d'Aosta/Vallée d'Aoste"],
      macroRegionId: 'it-nw', capitalCity: 'アオスタ (Aosta)', centroid: [7.3, 45.7], population: 125000, areaKm2: 3263,
      mnemonic: 'イタリア最小の特別自治州。モンブラン（モンテ・ビアンコ）やマッターホルンを望むアルプス山岳地。',
      municipalities: [
        { id: 'm-it-vda-01', name: 'アオスタ', nameLocal: 'Aosta', nameEn: 'Aosta', level: 3, subDivisionId: 'it-vda', macroRegionId: 'it-nw', coordinates: [7.31, 45.73], population: 34000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    // North-East (4)
    {
      id: 'it-ven', code: 'VEN', name: 'ヴェネト州', nameLocal: 'Veneto', nameEn: 'Veneto', level: 2,
      macroRegionId: 'it-ne', capitalCity: 'ヴェネツィア (Venezia)', centroid: [11.9, 45.6], population: 4850000, areaKm2: 18345,
      mnemonic: 'アドリア海の真珠・水の都ヴェネツィアとゴンドラ。ヴェローナ（ロミオとジュリエット）。',
      municipalities: [
        { id: 'm-it-ven-01', name: 'ヴェネツィア', nameLocal: 'Venezia', nameEn: 'Venice', level: 3, subDivisionId: 'it-ven', macroRegionId: 'it-ne', coordinates: [12.33, 45.44], population: 250000, isPrefecturalCapital: true, designation: '州都', notableFor: ['サン・マルコ寺院', 'カナル・グランデ'] },
        { id: 'm-it-ven-02', name: 'ヴェローナ', nameLocal: 'Verona', nameEn: 'Verona', level: 3, subDivisionId: 'it-ven', macroRegionId: 'it-ne', coordinates: [10.99, 45.43], population: 260000, designation: '古代円形闘技場' }
      ]
    },
    {
      id: 'it-emr', code: 'EMR', name: 'エミリア＝ロマーニャ州', nameLocal: 'Emilia-Romagna', nameEn: 'Emilia-Romagna', level: 2,
      macroRegionId: 'it-ne', capitalCity: 'ボローニャ (Bologna)', centroid: [11.3, 44.5], population: 4460000, areaKm2: 22453,
      mnemonic: 'イタリア屈指の美食街道。パルマハム、パルメザンチーズ、フェラーリやランボルギーニのモーターバレー。',
      municipalities: [
        { id: 'm-it-emr-01', name: 'ボローニャ', nameLocal: 'Bologna', nameEn: 'Bologna', level: 3, subDivisionId: 'it-emr', macroRegionId: 'it-ne', coordinates: [11.34, 44.49], population: 390000, isPrefecturalCapital: true, designation: '最古の大学都市', notableFor: ['ボローニャ大学', 'ボロネーゼ'] }
      ]
    },
    {
      id: 'it-taa', code: 'TAA', name: 'トレンティーノ＝アルト・アディジェ州', nameLocal: 'Trentino-Alto Adige', nameEn: 'Trentino-South Tyrol', level: 2,
      aliases: ['Trentino-Alto Adige', 'Südtirol', 'Trentino-Alto Adige/Südtirol', 'Trentino - Alto Adige'],
      macroRegionId: 'it-ne', capitalCity: 'トレント (Trento)', centroid: [11.3, 46.4], population: 1070000, areaKm2: 13607,
      mnemonic: 'オーストリア国境のドロミテ渓谷。ドイツ語系住民も多い山岳特別自治州。',
      municipalities: [
        { id: 'm-it-taa-01', name: 'トレント', nameLocal: 'Trento', nameEn: 'Trento', level: 3, subDivisionId: 'it-taa', macroRegionId: 'it-ne', coordinates: [11.12, 46.07], population: 120000, isPrefecturalCapital: true, designation: '州都' }
      ]
    },
    {
      id: 'it-fvg', code: 'FVG', name: 'フリウリ＝ヴェネツィア・ジュリア州', nameLocal: 'Friuli-Venezia Giulia', nameEn: 'Friuli Venezia Giulia', level: 2,
      macroRegionId: 'it-ne', capitalCity: 'トリエステ (Trieste)', centroid: [13.2, 46.1], population: 1200000, areaKm2: 7858,
      mnemonic: 'スロベニアと国境を接する北東端の港湾州。中欧と地中海が交差する歴史。',
      municipalities: [
        { id: 'm-it-fvg-01', name: 'トリエステ', nameLocal: 'Trieste', nameEn: 'Trieste', level: 3, subDivisionId: 'it-fvg', macroRegionId: 'it-ne', coordinates: [13.78, 45.65], population: 200000, isPrefecturalCapital: true, designation: '歴史的港町', notableFor: ['ミラマーレ城'] },
        { id: 'm-it-fvg-02', name: 'ウーディネ', nameLocal: 'Udine', nameEn: 'Udine', level: 3, subDivisionId: 'it-fvg', macroRegionId: 'it-ne', coordinates: [13.23, 46.06], population: 100000, designation: 'フリウリの中心' }
      ]
    },
    // Central (4)
    {
      id: 'it-tos', code: 'TOS', name: 'トスカーナ州', nameLocal: 'Toscana', nameEn: 'Tuscany', level: 2,
      macroRegionId: 'it-center', capitalCity: 'フィレンツェ (Firenze)', centroid: [11.2, 43.4], population: 3670000, areaKm2: 22987,
      mnemonic: 'ルネサンス発祥の地。ウフィツィ美術館、ピサの斜塔、シエナの競馬。',
      municipalities: [
        { id: 'm-it-tos-01', name: 'フィレンツェ', nameLocal: 'Firenze', nameEn: 'Florence', level: 3, subDivisionId: 'it-tos', macroRegionId: 'it-center', coordinates: [11.25, 43.77], population: 360000, isPrefecturalCapital: true, designation: '花の都', notableFor: ['ドゥオーモ', 'ウフィツィ美術館', 'ポンテ・ヴェッキオ'] },
        { id: 'm-it-tos-02', name: 'ピサ', nameLocal: 'Pisa', nameEn: 'Pisa', level: 3, subDivisionId: 'it-tos', macroRegionId: 'it-center', coordinates: [10.40, 43.72], population: 90000, designation: '学術都市', notableFor: ['ピサの斜塔', '奇跡の広場'] },
        { id: 'm-it-tos-03', name: 'シエナ', nameLocal: 'Siena', nameEn: 'Siena', level: 3, subDivisionId: 'it-tos', macroRegionId: 'it-center', coordinates: [11.33, 43.32], population: 54000, designation: '中世城塞都市', notableFor: ['カンポ広場', 'パリオ競馬'] }
      ]
    },
    {
      id: 'it-laz', code: 'LAZ', name: 'ラツィオ州', nameLocal: 'Lazio', nameEn: 'Lazio', level: 2,
      macroRegionId: 'it-center', capitalCity: 'ローマ (Roma)', centroid: [12.7, 41.8], population: 5700000, areaKm2: 17242,
      mnemonic: '「永遠の都」首都ローマを擁する。コロッセオ、バチカン市国、ティベル川。',
      municipalities: [
        { id: 'm-it-laz-01', name: 'ローマ', nameLocal: 'Roma', nameEn: 'Rome', level: 3, subDivisionId: 'it-laz', macroRegionId: 'it-center', coordinates: [12.49, 41.90], population: 2870000, isCapital: true, isPrefecturalCapital: true, designation: '首都コムーネ', notableFor: ['コロッセオ', 'トレビの泉', 'フォロ・ロマーノ'] },
        { id: 'm-it-laz-02', name: 'ティヴォリ', nameLocal: 'Tivoli', nameEn: 'Tivoli', level: 3, subDivisionId: 'it-laz', macroRegionId: 'it-center', coordinates: [12.80, 41.96], population: 56000, designation: '世界遺産の街', notableFor: ['エステ家別荘の噴水庭園', 'ハドリアヌス帝の別荘'] }
      ]
    },
    {
      id: 'it-umb', code: 'UMB', name: 'ウンブリア州', nameLocal: 'Umbria', nameEn: 'Umbria', level: 2,
      macroRegionId: 'it-center', capitalCity: 'ペルージャ (Perugia)', centroid: [12.5, 43.0], population: 860000, areaKm2: 8456,
      mnemonic: '「イタリアの緑の心臓」。海に面さない内陸州。聖フランチェスコのアッシジ。',
      municipalities: [
        { id: 'm-it-umb-01', name: 'ペルージャ', nameLocal: 'Perugia', nameEn: 'Perugia', level: 3, subDivisionId: 'it-umb', macroRegionId: 'it-center', coordinates: [12.39, 43.11], population: 165000, isPrefecturalCapital: true, designation: '州都', notableFor: ['チョコレート祭', '外国人大学'] },
        { id: 'm-it-umb-02', name: 'アッシジ', nameLocal: 'Assisi', nameEn: 'Assisi', level: 3, subDivisionId: 'it-umb', macroRegionId: 'it-center', coordinates: [12.62, 43.07], population: 28000, designation: '聖地コムーネ', notableFor: ['聖フランチェスコ聖堂', 'ジオットの壁画'] }
      ]
    },
    {
      id: 'it-mar', code: 'MAR', name: 'マルケ州', nameLocal: 'Marche', nameEn: 'Marche', level: 2,
      macroRegionId: 'it-center', capitalCity: 'アンコーナ (Ancona)', centroid: [13.2, 43.5], population: 1480000, areaKm2: 9366,
      mnemonic: 'アドリア海沿岸の中部州。ラファエロ生誕のウルビーノと靴産業。',
      municipalities: [
        { id: 'm-it-mar-01', name: 'アンコーナ', nameLocal: 'Ancona', nameEn: 'Ancona', level: 3, subDivisionId: 'it-mar', macroRegionId: 'it-center', coordinates: [13.51, 43.62], population: 100000, isPrefecturalCapital: true, designation: '港湾都市' },
        { id: 'm-it-mar-02', name: 'ウルビーノ', nameLocal: 'Urbino', nameEn: 'Urbino', level: 3, subDivisionId: 'it-mar', macroRegionId: 'it-center', coordinates: [12.63, 43.72], population: 14000, designation: 'ルネサンス世界遺産', notableFor: ['ドゥカーレ宮殿', 'ラファエロ生家'] }
      ]
    },
    // South (6)
    {
      id: 'it-cam', code: 'CAM', name: 'カンパニア州', nameLocal: 'Campania', nameEn: 'Campania', level: 2,
      macroRegionId: 'it-south', capitalCity: 'ナポリ (Napoli)', centroid: [14.8, 40.9], population: 5600000, areaKm2: 13671,
      mnemonic: '「ナポリを見て死ね」。ピッツァ発祥の地、ヴェスヴィオ火山、青の洞窟のカプリ島。',
      municipalities: [
        { id: 'm-it-cam-01', name: 'ナポリ', nameLocal: 'Napoli', nameEn: 'Naples', level: 3, subDivisionId: 'it-cam', macroRegionId: 'it-south', coordinates: [14.26, 40.85], population: 920000, isPrefecturalCapital: true, designation: '南部の中心', notableFor: ['本場ナポリピッツァ', '卵城', '国立考古学博物館'] },
        { id: 'm-it-cam-02', name: 'サレルノ', nameLocal: 'Salerno', nameEn: 'Salerno', level: 3, subDivisionId: 'it-cam', macroRegionId: 'it-south', coordinates: [14.76, 40.68], population: 130000, designation: 'アマルフィ海岸の玄関口' }
      ]
    },
    {
      id: 'it-pug', code: 'PUG', name: 'プーリア州', nameLocal: 'Puglia', nameEn: 'Apulia', level: 2,
      macroRegionId: 'it-south', capitalCity: 'バーリ (Bari)', centroid: [16.8, 41.0], population: 3900000, areaKm2: 19541,
      mnemonic: 'イタリアの「ブーツのかかと」。円錐屋根のトゥルッリ（アルベロベッロ）とオリーブ畑。',
      municipalities: [
        { id: 'm-it-pug-01', name: 'バーリ', nameLocal: 'Bari', nameEn: 'Bari', level: 3, subDivisionId: 'it-pug', macroRegionId: 'it-south', coordinates: [16.87, 41.12], population: 320000, isPrefecturalCapital: true, designation: '州都' },
        { id: 'm-it-pug-02', name: 'レッチェ', nameLocal: 'Lecce', nameEn: 'Lecce', level: 3, subDivisionId: 'it-pug', macroRegionId: 'it-south', coordinates: [18.17, 40.35], population: 95000, designation: '南のフィレンツェ', notableFor: ['プーリア・バロック建築'] }
      ]
    },
    {
      id: 'it-cal', code: 'CAL', name: 'カラブリア州', nameLocal: 'Calabria', nameEn: 'Calabria', level: 2,
      macroRegionId: 'it-south', capitalCity: 'カタンザーロ (Catanzaro)', centroid: [16.4, 39.0], population: 1850000, areaKm2: 15222,
      mnemonic: 'イタリアの「ブーツのつま先」。美しい海岸線と唐辛子、メッシーナ海峡を挟んでシチリアと対面。',
      municipalities: [
        { id: 'm-it-cal-01', name: 'カタンザーロ', nameLocal: 'Catanzaro', nameEn: 'Catanzaro', level: 3, subDivisionId: 'it-cal', macroRegionId: 'it-south', coordinates: [16.60, 38.91], population: 88000, isPrefecturalCapital: true, designation: '州都' },
        { id: 'm-it-cal-02', name: 'レッジョ・カラブリア', nameLocal: 'Reggio Calabria', nameEn: 'Reggio Calabria', level: 3, subDivisionId: 'it-cal', macroRegionId: 'it-south', coordinates: [15.65, 38.11], population: 175000, designation: '海峡都市', notableFor: ['リアーチェのブロンズ像'] }
      ]
    },
    {
      id: 'it-bas', code: 'BAS', name: 'バジリカータ州', nameLocal: 'Basilicata', nameEn: 'Basilicata', level: 2,
      macroRegionId: 'it-south', capitalCity: 'ポテンツァ (Potenza)', centroid: [16.0, 40.5], population: 540000, areaKm2: 10073,
      mnemonic: '世界遺産・マテーラの洞窟住居（サッシ）で世界的に有名な南部山岳州。',
      municipalities: [
        { id: 'm-it-bas-01', name: 'ポテンツァ', nameLocal: 'Potenza', nameEn: 'Potenza', level: 3, subDivisionId: 'it-bas', macroRegionId: 'it-south', coordinates: [15.80, 40.64], population: 66000, isPrefecturalCapital: true, designation: '州都' },
        { id: 'm-it-bas-02', name: 'マテーラ', nameLocal: 'Matera', nameEn: 'Matera', level: 3, subDivisionId: 'it-bas', macroRegionId: 'it-south', coordinates: [16.60, 40.66], population: 60000, designation: '世界遺産都市', notableFor: ['サッシ（洞窟住居群）'] }
      ]
    },
    {
      id: 'it-abr', code: 'ABR', name: 'アブルッツォ州', nameLocal: 'Abruzzo', nameEn: 'Abruzzo', level: 2,
      macroRegionId: 'it-south', capitalCity: 'ラクイラ (L\'Aquila)', centroid: [13.7, 42.2], population: 1280000, areaKm2: 10831,
      mnemonic: 'アペニン山脈最高峰グラン・サッソを抱く大自然と国立公園。',
      municipalities: [
        { id: 'm-it-abr-01', name: 'ラクイラ', nameLocal: "L'Aquila", nameEn: "L'Aquila", level: 3, subDivisionId: 'it-abr', macroRegionId: 'it-south', coordinates: [13.40, 42.35], population: 70000, isPrefecturalCapital: true, designation: '州都' },
        { id: 'm-it-abr-02', name: 'ペスカーラ', nameLocal: 'Pescara', nameEn: 'Pescara', level: 3, subDivisionId: 'it-abr', macroRegionId: 'it-south', coordinates: [14.21, 42.46], population: 120000, designation: 'アドリア海リゾート' }
      ]
    },
    {
      id: 'it-mol', code: 'MOL', name: 'モリーゼ州', nameLocal: 'Molise', nameEn: 'Molise', level: 2,
      macroRegionId: 'it-south', capitalCity: 'カンポバッソ (Campobasso)', centroid: [14.6, 41.7], population: 290000, areaKm2: 4461,
      mnemonic: 'イタリア本土で最も人口が少ない静かな州。1963年にアブルッツォから分離。',
      municipalities: [
        { id: 'm-it-mol-01', name: 'カンポバッソ', nameLocal: 'Campobasso', nameEn: 'Campobasso', level: 3, subDivisionId: 'it-mol', macroRegionId: 'it-south', coordinates: [14.66, 41.56], population: 48000, isPrefecturalCapital: true, designation: '州都' },
        { id: 'm-it-mol-02', name: 'テルモリ', nameLocal: 'Termoli', nameEn: 'Termoli', level: 3, subDivisionId: 'it-mol', macroRegionId: 'it-south', coordinates: [14.99, 42.00], population: 33000, designation: 'アドリア海の港' }
      ]
    },
    // Islands (2)
    {
      id: 'it-sic', code: 'SIC', name: 'シチリア州', nameLocal: 'Sicilia', nameEn: 'Sicily', level: 2,
      macroRegionId: 'it-islands', capitalCity: 'パレルモ (Palermo)', centroid: [14.0, 37.5], population: 4800000, areaKm2: 25711,
      mnemonic: '地中海最大の島。活火山エトナ山、古代ギリシャ神殿の谷、パレルモのモザイク建築。',
      municipalities: [
        { id: 'm-it-sic-01', name: 'パレルモ', nameLocal: 'Palermo', nameEn: 'Palermo', level: 3, subDivisionId: 'it-sic', macroRegionId: 'it-islands', coordinates: [13.36, 38.12], population: 630000, isPrefecturalCapital: true, designation: '州都', notableFor: ['ノルマンニ宮殿', 'マッシモ劇場'] },
        { id: 'm-it-sic-02', name: 'カターニア', nameLocal: 'Catania', nameEn: 'Catania', level: 3, subDivisionId: 'it-sic', macroRegionId: 'it-islands', coordinates: [15.08, 37.50], population: 310000, designation: 'エトナ山の麓の商都', notableFor: ['エトナ火山', 'ドゥオーモ広場'] },
        { id: 'm-it-sic-03', name: 'シラクーサ', nameLocal: 'Siracusa', nameEn: 'Syracuse', level: 3, subDivisionId: 'it-sic', macroRegionId: 'it-islands', coordinates: [15.28, 37.07], population: 120000, designation: '古代ギリシャ遺跡都市', notableFor: ['オルティージャ島', 'ギリシャ劇場'] }
      ]
    },
    {
      id: 'it-sar', code: 'SAR', name: 'サルデーニャ州', nameLocal: 'Sardegna', nameEn: 'Sardinia', level: 2,
      macroRegionId: 'it-islands', capitalCity: 'カリャリ (Cagliari)', centroid: [9.0, 40.0], population: 1580000, areaKm2: 24100,
      mnemonic: '地中海で2番目に大きい島。エメラルド色の海と古代巨石遺跡ヌラーゲ。特別自治州。',
      municipalities: [
        { id: 'm-it-sar-01', name: 'カリャリ', nameLocal: 'Cagliari', nameEn: 'Cagliari', level: 3, subDivisionId: 'it-sar', macroRegionId: 'it-islands', coordinates: [9.11, 39.22], population: 150000, isPrefecturalCapital: true, designation: '州都', notableFor: ['カステッロ地区'] },
        { id: 'm-it-sar-02', name: 'サッサリ', nameLocal: 'Sassari', nameEn: 'Sassari', level: 3, subDivisionId: 'it-sar', macroRegionId: 'it-islands', coordinates: [8.55, 40.72], population: 127000, designation: 'サルデーニャ第2の都市' }
      ]
    }
  ]
};
