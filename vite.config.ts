import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// GitHub Pages のサブパス配信に対応するため、相対ベースパスを用いる。
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
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
