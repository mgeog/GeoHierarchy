import { useCallback, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  CountryAdministrativeData,
  HierarchyDisplayMode,
  MacroRegion,
  Municipality,
  SelectedEntity,
  SubDivision,
} from '../../types/geo';
import { BASEMAP_TILES, BasemapKey } from './basemaps';

function levelZoom(country: CountryAdministrativeData, mode: HierarchyDisplayMode): number {
  return mode === 'auto' ? country.zoomLevels.level1 : country.zoomLevels[`level${mode}`];
}

/**
 * Leaflet 地図の生成・破棄、サイズ追従、背景タイル、ズーム状態、移動後の再描画用カウンタを扱う。
 * 地図は state として返すので、レイヤー側の effect は map が用意されてから動く。
 */
export function useLeafletMap(country: CountryAdministrativeData, displayMode: HierarchyDisplayMode, basemap: BasemapKey) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [zoom, setZoom] = useState<number>(levelZoom(country, displayMode));
  /** 移動・ズームが終わるたびに増える。ラベルの重なり回避など、画面座標に依存する描画の更新に使う */
  const [viewVersion, setViewVersion] = useState(0);
  const initial = useRef({ country, displayMode });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const { country: c, displayMode: m } = initial.current;
    const instance = L.map(el, {
      center: [c.center[1], c.center[0]],
      zoom: levelZoom(c, m),
      zoomControl: false,
      attributionControl: true,
    });
    const onViewChange = () => {
      setZoom(instance.getZoom());
      setViewVersion((v) => v + 1);
    };
    instance.on('zoomend moveend', onViewChange);
    const observer = new ResizeObserver(() => instance.invalidateSize());
    observer.observe(el);
    const timer = setTimeout(() => instance.invalidateSize(), 100);
    setMap(instance);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      instance.off('zoomend moveend', onViewChange);
      instance.remove();
      setMap(null);
    };
  }, []);

  useEffect(() => {
    if (!map) return;
    const cfg = BASEMAP_TILES[basemap];
    const tile = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: cfg.maxZoom,
      subdomains: cfg.subdomains,
    }).addTo(map);
    tile.bringToBack();
    return () => {
      tile.remove();
    };
  }, [map, basemap]);

  /** サイズが 0 のときの flyTo 例外（NaN）を避けた移動 */
  const navigateTo = useCallback(
    (lat: number, lng: number, targetZoom: number) => {
      if (!map || Number.isNaN(lat) || Number.isNaN(lng)) return;
      try {
        map.invalidateSize();
        const size = map.getSize();
        if (size.x > 0 && size.y > 0) {
          map.flyTo([lat, lng], targetZoom, { duration: 1.0 });
          return;
        }
      } catch (e) {
        console.warn('flyTo exception caught, falling back to setView:', e);
      }
      try {
        map.setView([lat, lng], targetZoom);
      } catch (e) {
        console.warn('setView failed:', e);
      }
    },
    [map],
  );

  return { containerRef, map, zoom, viewVersion, navigateTo };
}

/** 国の切替・階層ボタン・選択項目の変化に応じて、地図を動かす */
export function useMapNavigation(
  navigateTo: (lat: number, lng: number, zoom: number) => void,
  map: L.Map | null,
  country: CountryAdministrativeData,
  displayMode: HierarchyDisplayMode,
  selectedEntity: SelectedEntity | null,
) {
  const prevCountryId = useRef(country.id);
  const prevDisplayMode = useRef(displayMode);
  const prevSelectedKey = useRef<string | null>(null);

  useEffect(() => {
    if (!map || prevCountryId.current === country.id) return;
    prevCountryId.current = country.id;
    navigateTo(country.center[1], country.center[0], levelZoom(country, displayMode));
  }, [map, country, displayMode, navigateTo]);

  useEffect(() => {
    if (!map || prevDisplayMode.current === displayMode) return;
    prevDisplayMode.current = displayMode;
    if (displayMode === 'auto') return;
    const center = map.getCenter();
    navigateTo(center.lat, center.lng, country.zoomLevels[`level${displayMode}`]);
  }, [map, displayMode, country.zoomLevels, navigateTo]);

  useEffect(() => {
    if (!map) return;
    if (!selectedEntity) {
      prevSelectedKey.current = null;
      return;
    }
    const key = `${selectedEntity.type}-${selectedEntity.item.id}`;
    if (prevSelectedKey.current === key) return;
    prevSelectedKey.current = key;

    const z = country.zoomLevels;
    if (selectedEntity.type === 'macro') {
      const { centroid } = selectedEntity.item as MacroRegion;
      if (centroid) navigateTo(centroid[1], centroid[0], z.level1 + 0.6);
    } else if (selectedEntity.type === 'subdivision') {
      const { centroid } = selectedEntity.item as SubDivision;
      if (centroid) navigateTo(centroid[1], centroid[0], z.level2 + 0.8);
    } else {
      const { coordinates } = selectedEntity.item as Municipality;
      if (coordinates) navigateTo(coordinates[1], coordinates[0], z.level3);
    }
  }, [map, selectedEntity, country.zoomLevels, navigateTo]);
}
