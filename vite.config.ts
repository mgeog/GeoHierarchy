import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/**
 * Fontsource の CSS は、woff2 と、旧形式の woff の両方を指す。woff2 は主要ブラウザがすべて対応しているため、
 * woff を取り除き、ビルド成果物（dist）に重複して含まれないようにする。
 */
const dropWoffFallback = (): Plugin => ({
  name: 'drop-woff-fallback',
  enforce: 'pre',
  transform(code, id) {
    if (!/@fontsource[\\/].+\.css$/.test(id)) return null;
    return code.replace(/,\s*url\([^)]*\.woff\)\s*format\(['"]woff['"]\)/g, '');
  },
});

/**
 * index.html の %SITE_URL% を、公開 URL に置き換える（OGP や canonical は絶対 URL が必要なため）。
 * CI では、GitHub Pages が返す URL を SITE_URL として渡す。未指定のときは、既定値を使う。
 */
const siteUrl = (process.env.SITE_URL ?? 'https://mgeog.github.io/GeoHierarchy/').replace(/\/?$/, '/');
const injectSiteUrl = (): Plugin => ({
  name: 'inject-site-url',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
});

// GitHub Pages のサブパス配信に対応するため、相対ベースパスを用いる。
export default defineConfig({
  base: './',
  plugins: [dropWoffFallback(), injectSiteUrl(), react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // 変更頻度の低いライブラリを別チャンクにして、キャッシュを効かせる
        codeSplitting: {
          groups: [
            { name: 'vendor-leaflet', test: /node_modules[\\/]leaflet/ },
            { name: 'vendor-d3', test: /node_modules[\\/]d3-/ },
            { name: 'vendor-react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
          ],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
    },
  },
});
