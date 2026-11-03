import {createRoot} from 'react-dom/client';
import App from './App.tsx';
// Noto Sans JP を自前で配信する（SIL OFL 1.1）。字種ごとに分割されており、ブラウザは必要な範囲だけを取得する。
// 太さは 400 と 700 のみ（500 は 400、600・800 は 700 に寄せて表示される）。
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/700.css';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
