# データ・ライセンスの出典一覧

公開前の確認（2026年11月3日時点）の記録です。「確認済み」は一次資料の本文を読んだもの、「推定」は、ファイルの形式などからの推測、「未確認」は、確認できていないものを表します。

## 1. 行政境界（`public/data/`）

| ファイル | 国 | 出典 | ライセンス | 状態 |
|---|---|---|---|---|
| `us-states.json` | 米国 | Natural Earth（DCを含む） | パブリックドメイン | 推定（Natural Earth の同名ポリゴンと IoU の中央値 0.985 で一致） |
| `canada.json` | カナダ | Natural Earth | パブリックドメイン | 推定（同上。IoU の中央値 0.986） |
| `china.json`、`india.json` | 中国・インド | Natural Earth（admin-1） | パブリックドメイン | 確認済み（Natural Earth のファイルから抽出） |
| `italy.json` | イタリア | geojson-italy 系（ISTAT の行政界） | 推定：CC BY | 推定（プロパティ名 `reg_name`、`reg_istat_code_num` から） |
| `france.json` | フランス | france-geojson 系（IGN Admin Express COG） | 推定：Licence ouverte（Etalab） | 推定（プロパティ名 `code`、`nom` から） |
| `germany.json` | ドイツ | deutschlandGeoJSON 系 | 未確認 | 推定（プロパティ名 `id`、`name`、`type` から） |
| `japan.geojson` | 日本 | 不明（CARTO のテーブルからのエクスポート。`cartodb_id` が残る） | 未確認 | **来歴が不明** |
| `uk.json` | 英国 | 不明 | 未確認 | **来歴が不明** |

- Natural Earth の係争地域の描画は、その標準に従い、独自の判断は加えていません。台湾・香港・マカオは収録していません。
- README が従来記していた「国土数値情報」を、日本の境界データの出典とする根拠は、見つかりませんでした。
- **要対応**：日本・英国・ドイツの来歴とライセンスを確認する、または、出典が明確なデータ（国土数値情報、ONS Open Geography Portal、BKG など）に置き換える。

## 2. 都市圏（機能的都市圏）

- 出典：European Commission, Joint Research Centre. GHSL: GHS-FUA R2019A（`GHS_FUA_UCDB2015_GLOBE_R2019A`）。基準年 2015。
- ライセンス：CC BY 4.0（JRC の `copyright.txt` で確認済み）。出典の明記と、改変の明示が条件。
- 改変：投影変換（モルワイデ図法から WGS84）、境界の単純化、座標の丸め、人口密度などの集計。
- 取得元：`https://jeodpp.jrc.ec.europa.eu/ftp/jrc-opendata/GHSL/GHS_FUA_UCDB2015_GLOBE_R2019A/V1-0/`
- 再生成：`scripts/extract-fua-attributes.py`、`scripts/select-fua.ts`、`scripts/extract-fua-geometry.py`

## 3. 人口・面積（第2階層）

`src/data/statistics.json` に、出典 ID・基準日・面積の基準とともに記録しています。

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

- **取得経路**：各機関のサイトには、直接アクセスできなかったため、Wikipedia の統計表（脚注が当該機関の資料を参照）から転記しました。**一次資料での再照合は未実施**です。
- 第3階層の既存の都市の人口は概数で、出典は未確認です。追加した都市の市域人口は空欄で、都市圏人口（GHS-FUA、推計）を表示します。

## 4. 背景地図（タイル）

| 提供元 | URL | 条件 | 状態 |
|---|---|---|---|
| OpenStreetMap（標準） | `https://tile.openstreetmap.org/{z}/{x}/{y}.png` | [Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/)：指定 URL の使用、帰属表示、有効な Referer、一括取得の禁止、軽い利用。無保証（SLA なし）で、過剰な利用は予告なく遮断されうる | **確認済み**。アプリは、この URL と帰属表示に対応済み |
| OpenStreetMap France | `https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png` | 公開された利用ポリシーを、見つけられなかった。ボランティア運営で、帰属表示のない利用を遮断した例がある | **未確認** |
| OpenTopoMap | `https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png` | CC-BY-SA。帰属表示があれば自由に利用できる（[opentopomap.org/about](https://opentopomap.org/about)）。利用量の上限は、明記されていない | 概ね確認済み（量の条件は未確認） |
| Esri（衛星写真・地形図・淡色地図） | `https://server.arcgisonline.com/ArcGIS/rest/services/…` | 認証なしでの第三者利用を許可する記述を、見つけられなかった。公式の導線は ArcGIS Location Platform（API キー）。`World_Topo_Map` は、更新が止まっている旧サービス | **未確認（リスクあり）** |

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

## 6. 公開前の未解決事項

1. 日本・英国・ドイツの境界データの来歴とライセンス（上記 1）。
2. OSM France と Esri のタイルの利用条件（上記 4）。
3. 人口・面積の、一次資料での再照合（上記 3）。
