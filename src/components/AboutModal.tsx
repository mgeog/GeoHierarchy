import React from 'react';
import { X, Layers, Lightbulb, Trophy, BookOpen, Sparkles, Map } from 'lucide-react';
import { CREDIT_GROUPS } from '../data/credits';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/70 dark:bg-stone-800/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                GeoHierarchy 学習ガイド & 開発コンセプト
              </h3>
              <p className="text-xs text-stone-500">
                教育に特化したシンプルなWebマップで世界を覚える
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 overflow-y-auto text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
          {/* Motivation section */}
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-stone-800/70 border border-amber-200/70 dark:border-amber-900/40">
            <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm mb-1.5 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>なぜ教育特化型マップが必要なのか？</span>
            </h4>
            <p>
              Googleマップやオープンストリートマップなどの一般的なWebマップは、商業店舗や道路網、施設情報などの情報量が多すぎ、教育現場や自学自習で「国がどのような広域圏・州県・都市で構成されているか」を俯瞰・暗記するには複雑すぎます。
            </p>
            <p className="mt-1">
              本アプリは、そうしたノイズを徹底的に削ぎ落とし、<strong>「第1階層（広域圏）」「第2階層（州・県・省）」「第3階層（市区町村・都市）」</strong>の3つの行政ヒエラルキーにフォーカスした学習用Webマップです。
            </p>
          </div>

          {/* 3 levels explanation */}
          <div>
            <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>3つの階層構造 (Hierarchy)</span>
            </h4>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30">
                <span className="font-bold text-amber-700 dark:text-amber-400">第1階層（広域圏・地方）: </span>
                日本なら「8地方（東北、関東、近畿など）」、米国なら「4大国勢調査地域（West, Midwestなど）」、ドイツなら「北部・南部など」。広い地理的まとまりと気候・文化ブロックを把握します。
              </div>
              <div className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30">
                <span className="font-bold text-sky-700 dark:text-sky-400">第2階層（都道府県・州・省・レジオン）: </span>
                日本の47都道府県、米国の50州、ドイツの16連邦州など、広域自治権を持つ主要行政区分。形状と位置、州都/県庁所在地をセットで覚えるのが基本です。
              </div>
              <div className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">第3階層（市区町村・主要都市）: </span>
                基礎自治体や政令市、各州・県の主要経済都市。人口規模や重要度、産業の特色を学習できます。
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>おすすめの学習機能</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-stone-600 dark:text-stone-300">
              <li>
                <strong>実際のオープンソース地図背景 &amp; 高精度地理境界: </strong>OpenStreetMap（標準および視認性特化版）やOpenTopoMap地形図、衛星写真などのオープンソース地図を背景に採用。州や都道府県の形状も、Natural Earth等のオープンデータに基づく実際の海岸線・境界線を忠実に反映しています。
              </li>
              <li>
                <strong>縮尺連動モード (Auto): </strong>ズームイン・ズームアウトするだけで、広域圏→都道府県/州→都市と自動で表示レベルが切り替わります。
              </li>
              <li>
                <strong>暗記マスク機能: </strong>地図上の名称を伏せ、形状と位置だけで「どこの州/県か」をセルフテストできます。クリックやホバーで答え合わせが可能です。
              </li>
              <li>
                <strong>パズル・クイズモード: </strong>「まぷすた！」や地図パズルのように、出題された州・県・都市を地図上で直接クリックして解答！連続正解コンボやタイムアタックを楽しめます。
              </li>
              <li>
                <strong>各国の制度比較: </strong>日本、アメリカ、イギリス、ドイツ、フランス、イタリア、カナダの主要7カ国（G7）に、中国とインドを加えた9か国の行政区画の構造を、一目で比較できます。
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-5 border-t border-stone-200 dark:border-stone-800">
            <h4 className="text-sm font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-600" />
              出典とライセンス
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-3">
              本アプリは教育用です。表示する境界線・名称は、いかなる国家・地域の政治的立場も表明しません。地図データの誤りは、各提供元の訂正窓口にお寄せください（OpenStreetMap の誤りは
              <a className="underline" href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noopener noreferrer">fixthemap</a>）。
            </p>
            <dl className="space-y-3 text-xs">
              {CREDIT_GROUPS.map((g) => (
                <div key={g.title}>
                  <dt className="font-bold text-stone-800 dark:text-stone-200">{g.title}</dt>
                  <dd>
                    <ul className="mt-1 space-y-1 text-stone-600 dark:text-stone-400">
                      {g.items.map((c) => (
                        <li key={c.name}>
                          {c.url ? (
                            <a className="underline text-sky-700 dark:text-sky-400" href={c.url} target="_blank" rel="noopener noreferrer">{c.name}</a>
                          ) : (
                            <span className="font-medium">{c.name}</span>
                          )}
                          {c.licence && <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800">{c.licence}</span>}
                          {c.note && <span className="block text-[11px] text-stone-500">{c.note}</span>}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs cursor-pointer shadow-xs hover:opacity-90"
          >
            学習をはじめる
          </button>
        </div>
      </div>
    </div>
  );
};
