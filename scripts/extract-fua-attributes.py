#!/usr/bin/env python3
"""GHS-FUA R2019A (GeoPackage) から、指定国の属性表を data-src/fua-attributes.json に書き出す。

出典: European Commission, JRC. GHS-FUA R2019A (CC BY 4.0).
  https://jeodpp.jrc.ec.europa.eu/ftp/jrc-opendata/GHSL/GHS_FUA_UCDB2015_GLOBE_R2019A/V1-0/
使い方: python3 scripts/extract-fua-attributes.py <gpkgのパス> [ISO3 ...]
ジオメトリは含めない（境界ポリゴンは Phase 4 で別途扱う）。
"""
import json, sqlite3, sys, pathlib

gpkg = sys.argv[1]
isos = sys.argv[2:] or ["JPN", "USA", "GBR", "FRA", "DEU", "ITA", "CAN"]
con = sqlite3.connect(gpkg)
table = con.execute("select table_name from gpkg_contents where data_type='features'").fetchone()[0]
rows = con.execute(
    f"select eFUA_ID,eFUA_name,Cntry_ISO,FUA_p_2015,FUA_area,UC_p_2015,UC_area,Com_p_2015 "
    f"from {table} where Cntry_ISO in ({','.join('?' * len(isos))}) order by Cntry_ISO, FUA_p_2015 desc",
    isos,
).fetchall()
out = {
    "source": "European Commission, JRC. GHS-FUA R2019A (GHS_FUA_UCDB2015_GLOBE_R2019A). CC BY 4.0. 基準年 2015。人口は 1km 格子からの推計値。",
    "fuas": [
        {"id": int(r[0]), "name": r[1], "iso": r[2], "fuaPop2015": round(r[3]), "fuaAreaKm2": round(r[4]),
         "ucPop2015": round(r[5]), "ucAreaKm2": round(r[6]), "commutingPop2015": round(r[7])}
        for r in rows
    ],
}
dest = pathlib.Path(__file__).resolve().parent.parent / "data-src" / "fua-attributes.json"
dest.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n")
print(f"{len(rows)} 件を {dest} に書き出しました")
