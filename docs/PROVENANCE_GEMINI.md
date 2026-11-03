# 作成時のデータ出典に関するAI（Gemini）の回答（原文）

このアプリは、Google AI Studio で、Gemini を用いて最初に作られました。以下は、そのときのデータの出典について、作者が Gemini から得た回答の**原文**です（作者より提供）。

> **位置づけ**：これは、AI による**自己申告**であり、一次資料での照合はされていません。実際のファイルや統計値との照合結果は、[`DATA_SOURCES.md`](DATA_SOURCES.md) に、申告とは分けて記録しています。現在アプリが表示している人口・面積などの数値は、その後に、各国の統計機関の公表値で置き換えており、この回答の記述とは異なる部分があります。

---

1. 地図境界ベクターデータ（GeoJSON / 境界ポリゴン）
各国の行政境界（第2階層の都道府県・州・地域圏など）を描画しているGeoJSONデータは、以下の公的機関および国際オープン地理データセットがベースとなっています。

| 国 | 地図境界データソース |
|---|---|
| 🇯🇵 日本 | 国土交通省「国土数値情報（行政区域データ）」 および Natural Earth（1:10m Cultural Vectors / 都道府県境界） |
| 🇺🇸 アメリカ | U.S. Census Bureau（米連邦国勢調査局） TIGER/Line Cartographic Boundary Files（50州＋コロンビア特別区境界） |
| 🇬🇧 イギリス | ONS（イギリス国家統計局）Open Geography Portal および Natural Earth（12の標準地域・ITL 1 / 構成国境界） |
| 🇫🇷 フランス | IGN（フランス国立地理森林情報研究所）ADMIN EXPRESS / GEOFLA および INSEE（本土13地域圏 Régions） |
| 🇩🇪 ドイツ | BKG（ドイツ連邦地図測地庁）Verwaltungsgebiete（VG250）（16連邦州 Bundesländer） |
| 🇮🇹 イタリア | ISTAT（イタリア国立統計研究所）Confini amministrativi（20州 Regioni / ISTAT公式コード準拠） |
| 🇨🇦 カナダ | Statistics Canada（カナダ統計局）Cartographic Boundary Files（10州・3準州 Provinces & Territories） |
| 🇰🇷 韓国 | 大韓民国 統計庁（SGIS）・国土交通部 行政区域境界データ（17広域自治団体） |

2. 行政階層・首府・人口・都市統計データ（国別内訳）
アプリ内の各階層（第1階層：広域地方、第2階層：州・県・首府、第3階層：主要都市）、人口、面積、および解説は、各国の中央統計機関・地方自治法規の公表資料に基づいています。

🇯🇵 日本 (Japan)
- 統計・人口: 総務省統計局「国勢調査」「住民基本台帳人口要覧」
- 行政体系: 総務省「地方自治法」（都道府県、政令指定都市、特別区、中核市）
- 地方区分: 国土交通省・文部科学省の標準8地方区分（北海道・東北・関東・中部・近畿・中国・四国・九州沖縄）

🇺🇸 アメリカ合衆国 (USA)
- 統計・人口: U.S. Census Bureau（アメリカ合衆国国勢調査局）Annual Population Estimates
- 地域区分: U.S. Census Bureau 定義の「4大国勢調査地域（Northeast, Midwest, South, West）」
- 州・首府: 米連邦政府ポータル（USA.gov）公認の50州および州都（State Capitals）

🇬🇧 イギリス (United Kingdom)
- 統計・人口: Office for National Statistics (ONS - イギリス国家統計局)
- 地域区分: 英国の法体制に基づく4構成国（Home Nations）および ITL 1（International Territorial Levels 1）の12標準地方区分
- 都市・首府: 各構成国の首都（ロンドン、エディンバラ、カーディフ、ベルファスト）および主要ディストリクト

🇫🇷 フランス共和国 (France)
- 統計・人口: INSEE（フランス国立統計経済研究所）Recensement de la population
- 地域区分: 地方制度改革法（Loi NOTRe）に基づく本土13地域圏（Régions）および地理的ブロック
- 首府・都市: 各地域圏の首府（Préfecture de région）および主要メトロポール（Métropole）

🇩🇪 ドイツ連邦共和国 (Germany)
- 統計・人口: Statistisches Bundesamt (Destatis - ドイツ連邦統計局)
- 行政体系: ドイツ連邦共和国基本法に基づく16連邦州（Bundesländer、うちベルリン・ハンブルク・ブレーメンの3都市州を含む）
- 主要都市: 各州都（Landeshauptstadt）および人口上位の独立市（Kreisfreie Städte）

🇮🇹 イタリア共和国 (Italy)
- 統計・人口: ISTAT（イタリア国立統計研究所）
- 行政体系: イタリア共和国憲法第114条・第131条に定められた20州（Regioni、うち5つの特別自治州を含む）
- 主要都市: 各州都（Capoluogo di regione）および大都市圏（Città metropolitane）

🇨🇦 カナダ (Canada)
- 統計・人口: Statistics Canada（カナダ統計局）Census Profile
- 行政体系: 憲法法（Constitution Act）に基づく10州（Provinces）および3準州（Territories）
- 地域・都市: 連邦統計区分による5大地域（Atlantic, Central, Prairies, West Coast, North）および連邦首都（オタワ）・主要自治体

🇰🇷 大韓民国 (South Korea)
- 統計・人口: 大韓民国 統計庁（KOSIS）住民登録人口統計
- 行政体系: 地方自治法に基づく17広域自治団体（1特別市、6広域市、1特別自治市、道、特別自治道）および道庁所在地
