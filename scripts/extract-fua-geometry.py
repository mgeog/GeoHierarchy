#!/usr/bin/env python3
"""GHS-FUA R2019A (GeoPackage) から、src/data/fua-selected.json の FUA の境界を
public/data/fua.json（GeoJSON、WGS84）に書き出す。

出典: European Commission, JRC. GHS-FUA R2019A (CC BY 4.0).
改変: 世界モルワイデ図法（EPSG:54009）から WGS84 へ投影変換し、単純化（許容誤差 TOL 度）と
      座標の丸め（小数 3 桁）を行った。
使い方: python3 scripts/extract-fua-geometry.py <gpkgのパス>
依存: shapely, pyproj
"""
import json, pathlib, sqlite3, sys
import shapely
from shapely import wkb
from shapely.ops import transform
from pyproj import Transformer

TOL = 0.004      # 単純化の許容誤差（度、約 0.4km）。比較表示に十分で、容量を抑えられる
SRC_CRS = "+proj=moll +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs"
root = pathlib.Path(__file__).resolve().parent.parent
selected = json.loads((root / "src/data/fua-selected.json").read_text())["fuas"]
ids = {f["id"] for f in selected}

con = sqlite3.connect(sys.argv[1])
table = con.execute("select table_name from gpkg_contents where data_type='features'").fetchone()[0]
to_wgs = Transformer.from_crs(SRC_CRS, 4326, always_xy=True).transform

def geom(blob):
    env = (blob[3] >> 1) & 7
    return wkb.loads(bytes(blob[8 + [0, 32, 48, 48, 64][env]:]))

features = []
for fid, blob in con.execute(f"select eFUA_ID, geom from {table}"):
    if int(fid) not in ids:
        continue
    g = transform(to_wgs, geom(blob)).simplify(TOL, preserve_topology=True)
    g = shapely.set_precision(g, 0.001)
    if g.is_empty:
        raise SystemExit(f"FUA {int(fid)} の境界が空になりました")
    features.append({"type": "Feature", "properties": {"id": int(fid)}, "geometry": json.loads(shapely.to_geojson(g))})

features.sort(key=lambda f: f["properties"]["id"])
missing = ids - {f["properties"]["id"] for f in features}
if missing:
    raise SystemExit(f"境界が見つからない FUA: {sorted(missing)}")
out = root / "public/data/fua.json"
out.write_text(json.dumps({"type": "FeatureCollection", "features": features}, separators=(",", ":")))
print(f"{len(features)} 件, {out.stat().st_size / 1024:.0f} KB を {out} に書き出しました")
