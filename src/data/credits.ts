/** アプリ内の「出典とライセンス」に表示する一覧。詳細は docs/DATA_SOURCES.md */
export interface Credit {
  name: string;
  url?: string;
  licence?: string;
  note?: string;
}

export interface CreditGroup {
  title: string;
  items: Credit[];
}

export const CREDIT_GROUPS: CreditGroup[] = [
  {
    title: '行政境界',
    items: [
      { name: 'Natural Earth', url: 'https://www.naturalearthdata.com/', licence: 'パブリックドメイン', note: '中国・インド（米国・カナダも、一致から由来と推定）。係争地域の描画も、その標準に従う' },
      { name: 'その他の国（日本・英国・ドイツ・フランス・イタリア）', note: '各国の公開データを簡略化したもの。出典を整理中です（docs/DATA_SOURCES.md）' },
    ],
  },
  {
    title: '都市圏（機能的都市圏）',
    items: [
      {
        name: 'GHSL: GHS-FUA R2019A（欧州委員会 共同研究センター）',
        url: 'https://human-settlement.emergency.copernicus.eu/ghs_fua.php',
        licence: 'CC BY 4.0',
        note: '投影変換・境界の単純化・座標の丸め・人口密度等の集計を行っています（改変あり）。人口は2015年の推計値',
      },
    ],
  },
  {
    title: '人口・面積',
    items: [
      { name: '各国の統計機関の公表値', note: '総務省統計局、U.S. Census Bureau、ONS、Destatis、INSEE、ISTAT、Statistics Canada、国家統計局（中国）、Census of India。基準年は国により異なります' },
    ],
  },
  {
    title: '背景地図（タイル）',
    items: [
      { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org/copyright', licence: 'ODbL', note: '© OpenStreetMap contributors' },
      { name: 'OpenStreetMap France', url: 'https://www.openstreetmap.fr', note: '© OpenStreetMap France, © OpenStreetMap contributors' },
      { name: 'OpenTopoMap', url: 'https://opentopomap.org', licence: 'CC-BY-SA', note: 'Map data: © OpenStreetMap contributors, SRTM' },
      { name: 'Esri（衛星写真・地形図・淡色地図）', url: 'https://www.esri.com', note: '© Esri、Maxar、Earthstar Geographics ほか' },
    ],
  },
  {
    title: 'フォント・ライブラリ',
    items: [
      { name: 'Noto Sans JP', url: 'https://fonts.google.com/noto/specimen/Noto+Sans+JP', licence: 'SIL OFL 1.1', note: './licenses/NotoSansJP-OFL.txt' },
      { name: 'React、Leaflet、d3-geo、lucide-react、canvas-confetti', licence: 'MIT / BSD-2-Clause / ISC' },
    ],
  },
];
