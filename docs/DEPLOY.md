# GitHub Pages での公開手順

公開先の URL は、`https://<ユーザー名>.github.io/<リポジトリ名>/` です。`https://<ユーザー名>.github.io/GeoHierarchy/` にするには、リポジトリ名を `GeoHierarchy` にします。

アプリは、ベースパスを相対指定（`base: './'`）にしているため、リポジトリ名が変わっても、コードの修正は不要です。OGP や canonical の絶対 URL は、ビルド時に、GitHub Pages が返す公開 URL から自動で設定されます（`SITE_URL`）。

## 公開の前に

1. [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) の「公開前の未解決事項」を確認する（境界データの来歴、Esri・OSM France のタイルの利用条件）。
2. 手元で確認する。
   ```bash
   bun install --frozen-lockfile
   bun run lint && bun run validate && bun run test
   bun run build
   bun run preview     # 公開と同じ静的ファイルを確認
   ```

## 手順

### 1. 作業ブランチを `main` に取り込む
プルリクエストを作成して、マージします。`main` へのプッシュで、公開用のワークフロー（`.github/workflows/deploy.yml`）が動きます。プルリクエストでは、公開はせず、確認用のワークフロー（`ci.yml`）だけが動きます。

### 2. Pages を有効にする
1. リポジトリの **Settings → Pages** を開く。
2. **Build and deployment → Source** を **GitHub Actions** にする（「Deploy from a branch」ではない）。

### 3. 環境の保護ルールを確認する
**Settings → Environments → github-pages → Deployment branches and tags** を確認します。既定では `main` だけが許可されています。別のブランチから試験公開する場合は、そのブランチを追加します。

### 4. リポジトリ名を変更する（URL を `/GeoHierarchy/` にする場合）
1. **Settings → General → Repository name** を `GeoHierarchy` に変更して保存する。
2. 手元のリポジトリのリモートを更新する。
   ```bash
   git remote set-url origin https://github.com/<ユーザー名>/GeoHierarchy.git
   ```
3. 旧 URL は、GitHub 上でリダイレクトされますが、Pages の URL は新しい名前になります。
4. 改名の後に、一度、ワークフローを実行すると、OGP などの絶対 URL が、新しい URL になります（**Actions → Deploy to GitHub Pages → Run workflow**）。

### 5. ワークフローの実行と確認
- `main` にマージされると、自動で実行されます。手動では、**Actions → Deploy to GitHub Pages → Run workflow** です。
- 順序は、依存関係のインストール、型検査、データ検証、単体テスト、Pages 設定の取得、ビルド、公開です。どれかが失敗すると、公開されません。
- 成功すると、ジョブの `deploy` に公開 URL が表示されます。反映まで、数分かかることがあります。

### 6. 公開後の確認
- 地図のタイルが表示される（OSM の帰属表示が右下に出る）。
- 国の切り替え（日本・米国・中国・インドなど）で、境界が表示される。
- 都市圏比較が開く（`data/fua.json` の取得、約 1 MB・gzip 約 240 KB）。
- 「このアプリについて」に、「出典とライセンス」が表示される。
- スマートフォンの幅で、操作が崩れない。
- ブラウザの開発者ツールで、404 や、外部のフォント配信への通信がない。

## つまずきやすい点

| 症状 | 原因と対処 |
|---|---|
| ワークフローの `deploy` が、環境の保護ルールで拒否される | Settings → Environments → github-pages で、そのブランチを許可していない。許可リストに追加する |
| `Get Pages site failed` | Pages のソースが「GitHub Actions」になっていない。上記の手順 2 |
| 公開したが、空白の画面になる | ブラウザの開発者ツールで、404 の資産を確認する。サブパス配信は、`dist` を `/<リポジトリ名>/` に置いて、事前に確認できる |
| 地図の背景が灰色のまま | タイルの取得に失敗している。ネットワーク、タイル提供元の遮断・利用条件（`DATA_SOURCES.md` の 4）を確認する |
| OGP の画像が、旧 URL のまま | 改名の後に、ワークフローを再実行していない。手順 4 の 4 |

## サブパス配信を、手元で確認する方法
```bash
SITE_URL=https://<ユーザー名>.github.io/GeoHierarchy/ bun run build
mkdir -p /tmp/site/GeoHierarchy && cp -r dist/. /tmp/site/GeoHierarchy/
(cd /tmp/site && python3 -m http.server 4190)   # http://localhost:4190/GeoHierarchy/
```

## OGP 画像の再生成
```bash
bun scripts/make-ogp.ts /tmp/ogp.html
# /tmp/ogp.html を 1200x630 で撮影し、public/ogp.png として保存する（Playwright など）
```
