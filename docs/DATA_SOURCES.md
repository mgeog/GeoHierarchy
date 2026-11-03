# データ・ライセンスの出典一覧

公開前の確認（2026年11月3日時点）の記録です。出典は、次の3つの区分で書き分けています。

- **確認済み**：一次資料の本文、または、元のファイルとの照合で確かめたもの。
- **自己申告**：作成時の AI（Gemini）が、回答で示した出典（原文は [`PROVENANCE_GEMINI.md`](PROVENANCE_GEMINI.md)）。一次資料での照合はされていません。
- **独立した確認**：この記録の作成時に、実際のファイルなどで調べた結果。申告と矛盾しないか、を見るためのもの。

## 1. 行政境界（`public/data/`）

| ファイル | 自己申告（Gemini） | 独立した確認 | 状態 |
|---|---|---|---|
| `japan.geojson` | 国土交通省「国土数値情報（行政区域データ）」、Natural Earth | 来歴を裏付ける痕跡は見つからず。CARTO のテーブルのエクスポート（`cartodb_id`）の痕跡がある。Natural Earth の admin-1（50m）には日本が含まれず、照合できない | 自己申告のみ |
| `us-states.json` | U.S. Census Bureau, TIGER/Line Cartographic Boundary Files | Natural Earth の同名ポリゴンと、IoU の中央値 0.985 で一致（Census 由来の境界と矛盾しない）。ID がUSPS略称 | 自己申告・矛盾なし |
| `uk.json` | ONS Open Geography Portal、Natural Earth（ITL 1 の12地域） | 照合できる公開ファイルを特定できず | 自己申告のみ |
| `france.json` | IGN ADMIN EXPRESS / GEOFLA、INSEE（本土13地域圏） | プロパティ（`code`、`nom`）が、IGN Admin Express COG 2018 から作られた公開 GeoJSON の形式と一致 | 自己申告・矛盾なし |
| `germany.json` | BKG, VG250（16連邦州） | プロパティ（`id`、`name`、`type`）から、由来を特定できず。BKG 由来かどうかは、確認できていない | 自己申告のみ |
| `italy.json` | ISTAT, Confini amministrativi（20州） | プロパティ `reg_name`、`reg_istat_code_num` が、ISTAT の行政界から作られた公開 GeoJSON（geojson-italy 系）に見られるものと一致（`reg_iso_3166_2` は、確認できず） | 自己申告・矛盾なし |
| `canada.json` | Statistics Canada, Cartographic Boundary Files | Natural Earth の同名ポリゴンと、IoU の中央値 0.986 で一致。`cartodb_id` が残る | 自己申告・矛盾なし |
| `south-korea.json` | 統計庁（SGIS）・国土交通部の行政区域境界 | プロパティ（`code`、`name`、`name_eng`、`base_year`=2018）は、行政区域コード（2桁）と、基準年を持つ。統計庁の境界の形式に近いと推定されるが、公開データとの照合は、していない | 自己申告のみ |
| `china.json`、`india.json` | （申告なし。後から追加） | Natural Earth の admin-1 から抽出 | 確認済み |

- 「公開ファイルに見られるものと一致」は、プロパティ名などからの推定で、同一の元データであることの証明ではありません。フランスは、IGN Admin Express COG 2018 から作られた公開 GeoJSON のプロパティ（`code`、`nom`）と一致します。
- **韓国の加工**：2026年7月に、光州広域市と全羅南道が統合して「全南光州統合特別市」になったため、2018年基準の2つの境界を、結合しました。また、不正なリング（座標が4点未満）15件を除去しました。
- Natural Earth の係争地域の描画は、その標準に従い、独自の判断は加えていません。台湾・香港・マカオは収録していません。
- ライセンス（Natural Earth はパブリックドメイン）以外は、各提供元の条件を、個別に確認していません。**公開にあたっては、出典の明記を、アプリ内の「出典とライセンス」と本書で行っています。**

## 2. 都市圏（機能的都市圏）

- 出典：European Commission, Joint Research Centre. GHSL: GHS-FUA R2019A（`GHS_FUA_UCDB2015_GLOBE_R2019A`）。基準年 2015。
- ライセンス：CC BY 4.0（JRC の `copyright.txt` で確認済み）。出典の明記と、改変の明示が条件。
- 改変：投影変換（モルワイデ図法から WGS84）、境界の単純化、座標の丸め、人口密度などの集計。
- 取得元：`https://jeodpp.jrc.ec.europa.eu/ftp/jrc-opendata/GHSL/GHS_FUA_UCDB2015_GLOBE_R2019A/V1-0/`
- 再生成：`scripts/extract-fua-attributes.py`、`scripts/select-fua.ts`、`scripts/extract-fua-geometry.py`
- 除外した FUA とその理由：`data-src/fua-exclusions.json`

## 3. 人口・面積（第2階層）

`src/data/statistics.json` に、出典 ID・基準日・面積の基準とともに記録しています。**Gemini の申告（住民基本台帳人口、Annual Population Estimates など）とは異なり**、現在は、次の公表値を使っています。

| 国 | 人口の出典（基準日） |
|---|---|
| 日本 | 総務省統計局『令和2年国勢調査』（2020-10-01）。面積は国土地理院 |
| 米国 | U.S. Census Bureau, 2020 Census（2020-04-01） |
| 英国 | ONS（イングランドの地域は mid-2025、他の3構成国は mid-2021） |
| ドイツ | Destatis（2023-12-31） |
| フランス | INSEE（2022-01-01） |
| イタリア | ISTAT（2026-01-01） |
| カナダ | Statistics Canada, 2021 Census |
| 中国 | 国家統計局『第七次全国人口普査』（2020-11-01） |
| インド | Census of India 2011（2011-03-01） |
| 韓国 | Statistics Korea, 2020 Population and Housing Census（2020-11-01）。面積は行政安全部 |

- **取得経路**：各機関のサイトには、直接アクセスできなかったため、Wikipedia の統計表（脚注が当該機関の資料を参照）から転記しました。**一次資料での再照合は未実施**です。
- 第3階層のうち、既存の都市の人口は概数で、出典は未確認です。追加した都市の市域人口は空欄で、都市圏人口（GHS-FUA、推計）を表示します。
- 行政体系・首府・広域区分の記述は、[`PROVENANCE_GEMINI.md`](PROVENANCE_GEMINI.md) の自己申告に加え、国ごとに調べた内容（韓国の統合、英国イングランドの地域の代表都市など）を、`docs/ROADMAP.md` に記録しています。

## 4. 背景地図（タイル）

| 提供元 | URL | 条件 | 状態 |
|---|---|---|---|
| OpenStreetMap（標準） | `https://tile.openstreetmap.org/{z}/{x}/{y}.png` | [Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/)：指定 URL の使用、帰属表示、有効な Referer、一括取得の禁止、軽い利用。無保証（SLA なし）で、過剰な利用は予告なく遮断されうる | **確認済み**。アプリは、この URL と帰属表示に対応済み |
| OpenStreetMap France | `https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png` | 公開された利用ポリシーを、見つけられなかった。ボランティア運営で、帰属表示のない利用を遮断した例がある | **未確認** |
| OpenTopoMap | `https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png` | CC-BY-SA。帰属表示があれば自由に利用できる（[opentopomap.org/about](https://opentopomap.org/about)）。利用量の上限は、明記されていない | 概ね確認済み（量の条件は未確認） |
| Esri（衛星写真・地形図・淡色地図） | `https://server.arcgisonline.com/ArcGIS/rest/services/…` | 認証なしでの第三者利用を許可する記述を、見つけられなかった。公式の導線は ArcGIS Location Platform（API キー）。`World_Topo_Map` は、更新が止まっている旧サービス | **未確認（リスクあり）** |

- 作者の判断により、**現時点では、タイルの構成は変更していません**（OSM France と Esri は、利用条件が未確認のままです）。
- 帰属表示は、地図右下に常に表示されます（Leaflet の attribution）。アプリ内の「出典とライセンス」にも載せています。
- OSM のタイルは、ブラウザから直接取得します（サーバー経由のキャッシュなし）。

## 5. フォント・ライブラリ

| 名称 | ライセンス |
|---|---|
| Noto Sans JP（`@fontsource/noto-sans-jp` 5.3.1 経由で自前配信） | SIL OFL 1.1（`public/licenses/NotoSansJP-OFL.txt`） |
| React、react-dom | MIT |
| Leaflet | BSD-2-Clause |
| d3-geo、lucide-react、canvas-confetti | ISC |
| Vite、Tailwind CSS、@vitejs/plugin-react | MIT（ビルド時のみ） |

## 6. 未解決事項

1. 境界データの来歴：Gemini の申告は、一次資料で未検証（特に日本・英国・ドイツ）。
2. OSM France と Esri のタイルの利用条件。
3. 人口・面積の、一次資料での再照合。
