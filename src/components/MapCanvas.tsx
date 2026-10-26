import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import L from 'leaflet';
import {
  AdminLevel,
  CountryAdministrativeData,
  HierarchyDisplayMode,
  MacroRegion,
  MapMode,
  MapTheme,
  Municipality,
  SubDivision,
} from '../types/geo';
import { MAP_THEMES } from '../utils/theme';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Navigation,
  Layers,
  Map as MapIcon,
  Eye,
  EyeOff,
} from 'lucide-react';

interface MapCanvasProps {
  country: CountryAdministrativeData;
  mode: MapMode;
  displayMode: HierarchyDisplayMode;
  theme: MapTheme;
  isBlindMode: boolean;
  isBilingual: boolean;
  selectedEntity: {
    type: 'macro' | 'subdivision' | 'municipality';
    item: MacroRegion | SubDivision | Municipality;
  } | null;
  onSelectEntity: (
    entity: {
      type: 'macro' | 'subdivision' | 'municipality';
      item: MacroRegion | SubDivision | Municipality;
    } | null
  ) => void;
  // Quiz hooks
  quizTarget: {
    level: AdminLevel;
    id: string;
    name: string;
  } | null;
  onQuizAnswer: (clickedId: string, level: AdminLevel) => void;
  lastAnswerFeedback: { correct: boolean; id: string } | null;
}

// Basemap Tile Providers (100% Free Open Source & No API Key)
const BASEMAP_TILES = {
  osm: {
    name: 'オープンストリートマップ (標準 OSM)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abc',
    maxZoom: 19,
  },
  osmFr: {
    name: 'OSM フランス (高視認性・行政界明瞭)',
    url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap France | &copy; OpenStreetMap contributors',
    subdomains: 'abc',
    maxZoom: 19,
  },
  topo: {
    name: 'OpenTopoMap (地形・等高線・山岳)',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map: &copy; OSM contributors, SRTM | Style: &copy; OpenTopoMap',
    subdomains: 'abc',
    maxZoom: 17,
  },
  satellite: {
    name: 'リアル衛星写真 (Esri Satellite)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics',
    subdomains: 'abc',
    maxZoom: 18,
  },
  esriTopo: {
    name: '自然地形図 (Esri Topographic)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, DeLorme, NAVTEQ',
    subdomains: 'abc',
    maxZoom: 18,
  },
  gray: {
    name: '淡色シンプル背景 (Esri Light Gray)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, HERE, Garmin',
    subdomains: 'abc',
    maxZoom: 16,
  },
};

type BasemapKey = keyof typeof BASEMAP_TILES;

export const MapCanvas: React.FC<MapCanvasProps> = ({
  country,
  mode,
  displayMode,
  theme,
  isBlindMode,
  isBilingual,
  selectedEntity,
  onSelectEntity,
  quizTarget,
  onQuizAnswer,
  lastAnswerFeedback,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const macroMarkersLayerRef = useRef<L.LayerGroup | null>(null);
  const subDivisionMarkersLayerRef = useRef<L.LayerGroup | null>(null);
  const cityMarkersLayerRef = useRef<L.LayerGroup | null>(null);

  const [currentZoom, setCurrentZoom] = useState<number>(country.zoomLevels?.level1 || country.defaultZoom || 4.0);
  const [activeBasemap, setActiveBasemap] = useState<BasemapKey>('osm');
  const [geoJsonData, setGeoJsonData] = useState<any | null>(null);
  const [isLoadingGeoJson, setIsLoadingGeoJson] = useState<boolean>(false);
  const [showBasemapMenu, setShowBasemapMenu] = useState<boolean>(false);
  const prevCountryIdRef = useRef<string>(country.id);
  const prevDisplayModeRef = useRef<HierarchyDisplayMode>(displayMode);
  const prevSelectedEntityIdRef = useRef<string | null>(null);

  // Safe navigation wrapper avoiding Leaflet (NaN, NaN) flyTo exceptions when size is 0
  const safeNavigateTo = useCallback((lat?: number, lng?: number, zoom?: number) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (lat == null || lng == null || isNaN(lat) || isNaN(lng)) return;

    try {
      map.invalidateSize();
      const size = map.getSize();
      const targetZoom = zoom ?? country.zoomLevels?.level1 ?? country.defaultZoom ?? 4.0;

      if (size && size.x > 0 && size.y > 0) {
        map.flyTo([lat, lng], targetZoom, { duration: 1.0 });
        return;
      }
    } catch (e) {
      console.warn('flyTo exception caught, falling back to setView:', e);
    }

    try {
      map.setView([lat, lng], zoom ?? country.zoomLevels?.level1 ?? country.defaultZoom ?? 4.0);
    } catch (e) {
      console.warn('setView failed:', e);
    }
  }, [country.zoomLevels, country.defaultZoom]);

  // Synchronize basemap when aesthetic theme changes
  useEffect(() => {
    if (theme === 'blueprint') {
      setActiveBasemap('satellite');
    } else if (theme === 'minimal') {
      setActiveBasemap('gray');
    } else if (theme === 'textbook') {
      setActiveBasemap('esriTopo');
    } else {
      setActiveBasemap('osm');
    }
  }, [theme]);

  // Derive effective level - progressive scale disclosure relative to each country's calibrated zoomLevels
  const effectiveLevel: AdminLevel = useMemo(() => {
    if (displayMode !== 'auto') {
      return displayMode;
    }
    const { level1, level2, level3 } = country.zoomLevels || {
      level1: 4.5,
      level2: 5.8,
      level3: 7.2,
    };
    const t12 = (level1 + level2) / 2;
    const t23 = (level2 + level3) / 2;

    if (currentZoom < t12) return 1;
    if (currentZoom < t23) return 2;
    return 3;
  }, [displayMode, currentZoom, country.zoomLevels]);

  // Quick lookup for MacroRegions
  const macroMap = useMemo(() => {
    const map = new Map<string, MacroRegion>();
    country.macroRegions.forEach((m) => map.set(m.id, m));
    return map;
  }, [country.macroRegions]);

  // Lookup for SubDivisions
  const subDivisionMap = useMemo(() => {
    const map = new Map<string, SubDivision>();
    country.subDivisions.forEach((s) => {
      map.set(s.id, s);
      map.set(s.id.toLowerCase(), s);
      map.set(s.name, s);
      map.set(s.name.toLowerCase(), s);
      map.set(s.nameEn.toLowerCase(), s);
      map.set(s.nameLocal.toLowerCase(), s);
      if (s.code) {
        map.set(s.code, s);
        map.set(s.code.toLowerCase(), s);
      }
      if (s.aliases) {
        s.aliases.forEach((a) => {
          map.set(a, s);
          map.set(a.toLowerCase(), s);
        });
      }
    });
    return map;
  }, [country.subDivisions]);

  // Match GeoJSON Feature with a SubDivision
  const findSubDivisionForFeature = useCallback(
    (properties: any): SubDivision | undefined => {
      if (!properties) return undefined;
      const candidates: string[] = [
        properties[country.geoJsonNameProp || 'name'],
        properties.name,
        properties.name_english,
        properties.nom,
        properties.reg_name,
        properties.name_ja,
        properties.name_en,
        properties.id,
      ].filter(Boolean);

      for (const val of candidates) {
        const str = String(val).trim();
        const lower = str.toLowerCase();
        // Exact match
        if (subDivisionMap.has(str)) return subDivisionMap.get(str);
        if (subDivisionMap.has(lower)) return subDivisionMap.get(lower);

        // Splitting by slash, parenthesis, dash
        const parts = str.split(/[\/\(\)]/).map((p) => p.trim()).filter(Boolean);
        for (const p of parts) {
          if (subDivisionMap.has(p)) return subDivisionMap.get(p);
          if (subDivisionMap.has(p.toLowerCase())) return subDivisionMap.get(p.toLowerCase());
        }

        // Partial substring match
        for (const sub of country.subDivisions) {
          if (
            str.includes(sub.name) ||
            sub.name.includes(str) ||
            lower.includes(sub.nameEn.toLowerCase()) ||
            sub.nameEn.toLowerCase().includes(lower) ||
            lower.includes(sub.nameLocal.toLowerCase()) ||
            sub.nameLocal.toLowerCase().includes(lower)
          ) {
            return sub;
          }
        }
      }
      return undefined;
    },
    [country.geoJsonNameProp, country.subDivisions, subDivisionMap]
  );

  // Observe container size to keep Leaflet viewport geometry synchronized
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const container = mapContainerRef.current;
    const observer = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const lat = country.center?.[1] ?? 36.5;
      const lng = country.center?.[0] ?? 137.5;
      const zoom = country.defaultZoom || 5.0;

      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom,
        zoomControl: false,
        attributionControl: true,
      });

      // Add Base Tile Layer
      const baseCfg = BASEMAP_TILES[activeBasemap];
      const tile = L.tileLayer(baseCfg.url, {
        attribution: baseCfg.attribution,
        maxZoom: baseCfg.maxZoom,
        subdomains: baseCfg.subdomains,
      }).addTo(map);

      tileLayerRef.current = tile;

      // Layer groups for markers
      macroMarkersLayerRef.current = L.layerGroup().addTo(map);
      subDivisionMarkersLayerRef.current = L.layerGroup().addTo(map);
      cityMarkersLayerRef.current = L.layerGroup().addTo(map);

      // Listen for zoom changes
      map.on('zoomend', () => {
        setCurrentZoom(map.getZoom());
      });

      mapInstanceRef.current = map;

      // Invalidate size once DOM layout is settled
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 100);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center & zoom ONLY when country genuinely changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (prevCountryIdRef.current === country.id) return;
    prevCountryIdRef.current = country.id;

    const targetZoom =
      displayMode !== 'auto'
        ? country.zoomLevels[`level${displayMode}`]
        : country.zoomLevels.level1;

    safeNavigateTo(country.center[1], country.center[0], targetZoom);
  }, [country.id, country.center, country.zoomLevels, displayMode, safeNavigateTo]);

  // Update zoom when displayMode is changed by user clicking hierarchy buttons
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (prevDisplayModeRef.current === displayMode) return;
    prevDisplayModeRef.current = displayMode;

    if (displayMode !== 'auto') {
      const targetZoom = country.zoomLevels[`level${displayMode}`];
      if (typeof targetZoom === 'number') {
        const center = mapInstanceRef.current.getCenter();
        safeNavigateTo(center.lat, center.lng, targetZoom);
      }
    }
  }, [displayMode, country.zoomLevels, safeNavigateTo]);

  // Navigate when selectedEntity changes (from search or direct click)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (!selectedEntity) {
      prevSelectedEntityIdRef.current = null;
      return;
    }
    const currentId = `${selectedEntity.type}-${selectedEntity.item.id}`;
    if (prevSelectedEntityIdRef.current === currentId) return;
    prevSelectedEntityIdRef.current = currentId;

    if (selectedEntity.type === 'macro') {
      const macro = selectedEntity.item as MacroRegion;
      if (macro.centroid) {
        safeNavigateTo(
          macro.centroid[1],
          macro.centroid[0],
          country.zoomLevels.level1 + 0.6
        );
      }
    } else if (selectedEntity.type === 'subdivision') {
      const sub = selectedEntity.item as SubDivision;
      if (sub.centroid) {
        safeNavigateTo(
          sub.centroid[1],
          sub.centroid[0],
          country.zoomLevels.level2 + 0.8
        );
      }
    } else if (selectedEntity.type === 'municipality') {
      const mun = selectedEntity.item as Municipality;
      if (mun.coordinates) {
        safeNavigateTo(
          mun.coordinates[1],
          mun.coordinates[0],
          country.zoomLevels.level3
        );
      }
    }
  }, [selectedEntity, country.zoomLevels, safeNavigateTo]);

  // Update Basemap Tiles
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }
    const baseCfg = BASEMAP_TILES[activeBasemap];
    const tile = L.tileLayer(baseCfg.url, {
      attribution: baseCfg.attribution,
      maxZoom: baseCfg.maxZoom,
      subdomains: baseCfg.subdomains,
    }).addTo(mapInstanceRef.current);
    tile.bringToBack();
    tileLayerRef.current = tile;
  }, [activeBasemap]);

  // Fetch GeoJSON file with GitHub Pages base URL resolution
  useEffect(() => {
    let isCancelled = false;
    if (country.geoJsonUrl) {
      setIsLoadingGeoJson(true);
      const rawUrl = country.geoJsonUrl;
      const baseUrl = import.meta.env.BASE_URL || '/';
      const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const cleanPath = rawUrl.startsWith('/') ? rawUrl.slice(1) : rawUrl;
      const resolvedUrl = rawUrl.startsWith('http') ? rawUrl : `${cleanBase}${cleanPath}`;

      fetch(resolvedUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to load GeoJSON: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (!isCancelled) {
            setGeoJsonData(data);
            setIsLoadingGeoJson(false);
          }
        })
        .catch((err) => {
          console.error('GeoJSON fetch error:', err);
          if (!isCancelled) {
            setGeoJsonData(null);
            setIsLoadingGeoJson(false);
          }
        });
    } else {
      setGeoJsonData(null);
    }

    return () => {
      isCancelled = true;
    };
  }, [country.id, country.geoJsonUrl]);

  // Dynamic styling calculation for GeoJSON polygons
  const getFeatureStyle = useCallback(
    (feature: any) => {
      const sub = findSubDivisionForFeature(feature?.properties);
      const macro = sub ? macroMap.get(sub.macroRegionId) : undefined;

      const isSelected =
        selectedEntity?.type === 'subdivision' &&
        selectedEntity.item.id === sub?.id;
      const isMacroSelected =
        selectedEntity?.type === 'macro' &&
        selectedEntity.item.id === sub?.macroRegionId;

      // Quiz feedback pulse
      const isLastTargetHit =
        sub &&
        lastAnswerFeedback &&
        (lastAnswerFeedback.id === sub.id ||
          lastAnswerFeedback.id === sub.macroRegionId);
      const feedbackColor =
        isLastTargetHit && lastAnswerFeedback
          ? lastAnswerFeedback.correct
            ? '#22c55e'
            : '#ef4444'
          : null;

      const themeStyles = MAP_THEMES[theme] || MAP_THEMES.educational;

      let fillColor = macro ? macro.color : '#94a3b8';
      if (theme === 'blueprint') {
        fillColor = isSelected ? '#0284c7' : '#1e293b';
      } else if (theme === 'minimal') {
        fillColor = isSelected ? '#334155' : '#f8fafc';
      } else if (theme === 'textbook') {
        fillColor = macro ? macro.color : themeStyles.subdivisionDefaultFill;
      }

      if (feedbackColor) fillColor = feedbackColor;
      else if (isSelected || isMacroSelected) fillColor = '#0284c7';

      let fillOpacity = 0.32;
      if (theme === 'blueprint') fillOpacity = 0.55;
      else if (theme === 'minimal') fillOpacity = 0.22;
      else if (theme === 'textbook') fillOpacity = 0.38;

      if (effectiveLevel === 1) fillOpacity += 0.1;
      if (isSelected || isMacroSelected) fillOpacity = 0.65;
      if (feedbackColor) fillOpacity = 0.8;

      let strokeColor = themeStyles.subdivisionStroke;
      if (feedbackColor) strokeColor = feedbackColor;
      else if (isSelected) strokeColor = '#0284c7';
      else if (theme === 'blueprint') strokeColor = '#38bdf8';
      else if (theme === 'minimal') strokeColor = '#0f172a';
      else if (effectiveLevel === 1) strokeColor = '#64748b';

      const weight = isSelected ? 3.5 : effectiveLevel === 1 ? 1.2 : 1.8;

      return {
        fillColor,
        fillOpacity,
        color: strokeColor,
        weight,
        dashArray: effectiveLevel === 1 ? '3, 4' : undefined,
      };
    },
    [
      findSubDivisionForFeature,
      macroMap,
      selectedEntity,
      lastAnswerFeedback,
      theme,
      effectiveLevel,
    ]
  );

  // Render GeoJSON Layer with Real Natural Earth Polygons (re-created ONLY when GeoJSON data changes)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
      geoJsonLayerRef.current = null;
    }

    if (!geoJsonData) return;

    const layer = L.geoJSON(geoJsonData, {
      style: (feature) => getFeatureStyle(feature),
      onEachFeature: (feature, featureLayer) => {
        const sub = findSubDivisionForFeature(feature?.properties);
        if (!sub) return;

        // Tooltip text
        const macro = macroMap.get(sub.macroRegionId);
        const displayName = isBlindMode
          ? '••••••'
          : isBilingual
          ? `${sub.name} (${sub.nameEn})`
          : sub.name;

        featureLayer.bindTooltip(
          `<div>
            <div style="font-size:10px;color:#cbd5e1">${macro ? macro.name : '第1階層'}</div>
            <div style="font-weight:bold;font-size:13px;color:#fff">${displayName}</div>
            <div style="font-size:11px;color:#93c5fd">州都/県庁: ${sub.capitalCity}</div>
            ${
              sub.population
                ? `<div style="font-size:10px;color:#94a3b8">人口: ${sub.population.toLocaleString()}人</div>`
                : ''
            }
          </div>`,
          {
            className: 'edu-tooltip',
            sticky: true,
            direction: 'top',
            offset: [0, -10],
          }
        );

        // Hover & Click events
        featureLayer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({
              weight: 3.5,
              color: '#38bdf8',
              fillOpacity: 0.6,
            });
            l.bringToFront();
          },
          mouseout: (e) => {
            if (geoJsonLayerRef.current) {
              geoJsonLayerRef.current.resetStyle(e.target);
            }
          },
          click: (e) => {
            L.DomEvent.stopPropagation(e);
            if (mode === 'quiz' && quizTarget) {
              if (quizTarget.level === 1) {
                onQuizAnswer(sub.macroRegionId, 1);
              } else if (quizTarget.level === 2) {
                onQuizAnswer(sub.id, 2);
              }
              return;
            }

            onSelectEntity({
              type: 'subdivision',
              item: sub,
            });
          },
        });
      },
    }).addTo(map);

    geoJsonLayerRef.current = layer;
  }, [
    geoJsonData,
    country.id,
    country.defaultZoom,
    isBlindMode,
    isBilingual,
    mode,
    quizTarget,
    findSubDivisionForFeature,
    macroMap,
    onQuizAnswer,
    onSelectEntity,
  ]);

  // Update polygon style dynamically when effectiveLevel, theme, or selection changes WITHOUT resetting view
  useEffect(() => {
    if (!geoJsonLayerRef.current) return;
    geoJsonLayerRef.current.setStyle((feature) => getFeatureStyle(feature));
  }, [getFeatureStyle]);

  // Render Level 1 Macro Region Centroid Badges
  useEffect(() => {
    const layer = macroMarkersLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    // Show Macro Region labels prominently at Level 1, subtler at Level 2, hidden at Level 3
    if (effectiveLevel > 2) return;

    country.macroRegions.forEach((macro) => {
      const isDominant = effectiveLevel === 1;
      const labelText = isBlindMode
        ? '••••••'
        : isBilingual
        ? `${macro.name} (${macro.nameEn})`
        : macro.name;

      const html = `
        <div style="
          transform: translate(-50%, -50%);
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          padding: ${isDominant ? '4px 10px' : '2px 6px'};
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.92);
          border: 2px solid ${macro.color};
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15);
          font-weight: 700;
          font-size: ${isDominant ? '12px' : '10px'};
          color: #1e293b;
          white-space: nowrap;
          pointer-events: auto;
          cursor: pointer;
          transition: transform 0.15s ease;
        ">
          <span>${labelText}</span>
          ${isDominant ? `<span style="font-size:9px;color:#64748b;font-weight:500">第1階層 (${macro.subDivisionIds.length}区画)</span>` : ''}
        </div>
      `;

      const icon = L.divIcon({
        html,
        className: 'edu-macro-icon',
        iconSize: [0, 0],
      });

      const marker = L.marker([macro.centroid[1], macro.centroid[0]], {
        icon,
      });

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        if (mode === 'quiz' && quizTarget && quizTarget.level === 1) {
          onQuizAnswer(macro.id, 1);
          return;
        }
        onSelectEntity({
          type: 'macro',
          item: macro,
        });
      });

      layer.addLayer(marker);
    });
  }, [
    country,
    effectiveLevel,
    isBlindMode,
    isBilingual,
    mode,
    quizTarget,
    onQuizAnswer,
    onSelectEntity,
  ]);

  // Render Level 2 SubDivision Badges (州・県・省)
  useEffect(() => {
    const layer = subDivisionMarkersLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    // Show Level 2 subdivision markers prominently at Level 2, and cleanly at Level 3
    if (effectiveLevel < 2) return;

    country.subDivisions.forEach((sub) => {
      const isLevel2Dominant = effectiveLevel === 2;
      const isSelected =
        selectedEntity?.type === 'subdivision' &&
        selectedEntity.item.id === sub.id;

      const labelText = isBlindMode
        ? '••••••'
        : isBilingual
        ? `${sub.name} (${sub.nameEn})`
        : sub.name;

      const macro = macroMap.get(sub.macroRegionId);
      const strokeColor = macro ? macro.color : '#0284c7';

      const html = `
        <div style="
          transform: translate(-50%, -50%);
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          padding: ${isLevel2Dominant ? '3px 8px' : '2px 5px'};
          border-radius: 6px;
          background: ${isSelected ? '#0284c7' : 'rgba(255, 255, 255, 0.94)'};
          color: ${isSelected ? '#ffffff' : '#0f172a'};
          border: 1.5px solid ${isSelected ? '#0369a1' : strokeColor};
          box-shadow: 0 2px 5px rgba(0,0,0,0.18);
          font-weight: 700;
          font-size: ${isLevel2Dominant ? '11px' : '9px'};
          white-space: nowrap;
          pointer-events: auto;
          cursor: pointer;
          transition: all 0.15s ease;
        ">
          <span>${labelText}</span>
          ${
            isLevel2Dominant
              ? `<span style="font-size:8px;color:${isSelected ? '#e0f2fe' : '#64748b'};font-weight:500">${sub.capitalCity}</span>`
              : ''
          }
        </div>
      `;

      const icon = L.divIcon({
        html,
        className: 'edu-sub-icon',
        iconSize: [0, 0],
      });

      const marker = L.marker([sub.centroid[1], sub.centroid[0]], { icon });

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        if (mode === 'quiz' && quizTarget) {
          if (quizTarget.level === 1) {
            onQuizAnswer(sub.macroRegionId, 1);
          } else if (quizTarget.level === 2) {
            onQuizAnswer(sub.id, 2);
          }
          return;
        }
        onSelectEntity({
          type: 'subdivision',
          item: sub,
        });
      });

      layer.addLayer(marker);
    });
  }, [
    country,
    effectiveLevel,
    isBlindMode,
    isBilingual,
    mode,
    quizTarget,
    selectedEntity,
    macroMap,
    onQuizAnswer,
    onSelectEntity,
  ]);

  // Render Level 3 Municipalities & Major Cities
  useEffect(() => {
    const layer = cityMarkersLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    // Show city points when Level >= 2
    if (effectiveLevel < 2) return;

    country.subDivisions.forEach((sub) => {
      sub.municipalities.forEach((city) => {
        // At Level 2, only render national/prefectural capitals to keep view clean.
        if (effectiveLevel === 2 && !city.isCapital && !city.isPrefecturalCapital) {
          return;
        }

        const [lon, lat] = city.coordinates;
        const isSelected =
          selectedEntity?.type === 'municipality' &&
          selectedEntity.item.id === city.id;

        const isCapitalCity = city.isCapital || city.isPrefecturalCapital;
        const isShowPermanentBadge = isSelected || effectiveLevel === 3;

        const radius = city.isCapital ? 7 : city.isPrefecturalCapital ? 5.5 : 4.5;
        const color = city.isCapital ? '#e11d48' : city.isPrefecturalCapital ? '#0284c7' : '#10b981';

        const marker = L.circleMarker([lat, lon], {
          radius: isSelected ? radius * 1.5 : radius,
          fillColor: color,
          color: '#ffffff',
          weight: 2,
          fillOpacity: 0.9,
        });

        const labelText = isBlindMode
          ? '•••'
          : isBilingual
          ? `${city.name} (${city.nameEn})`
          : city.name;

        // Tooltip
        if (isShowPermanentBadge) {
          marker.bindTooltip(
            `<div class="flex items-center gap-1 font-bold">
              <span>${labelText}</span>
              ${city.isCapital ? '<span class="text-[9px] px-1 bg-rose-600 text-white rounded">首都</span>' : ''}
              ${city.population ? `<span class="text-[9px] font-normal text-slate-300">(${(city.population / 10000).toFixed(0)}万)</span>` : ''}
            </div>`,
            {
              permanent: true,
              direction: 'bottom',
              offset: [0, 8],
              className: 'edu-city-permanent-badge',
            }
          );
        } else {
          marker.bindTooltip(
            `<div>
              <div style="font-size:10px;color:#94a3b8">${sub.name} · ${city.designation || '都市'}</div>
              <div style="font-weight:bold;font-size:12px;color:#fff">${labelText}</div>
              ${
                city.population
                  ? `<div style="font-size:10px;color:#cbd5e1">人口: ${city.population.toLocaleString()}人</div>`
                  : ''
              }
            </div>`,
            {
              className: 'edu-tooltip',
              sticky: true,
              direction: 'top',
            }
          );
        }

        // Click event
        marker.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          if (mode === 'quiz' && quizTarget) {
            onQuizAnswer(city.id, 3);
            return;
          }
          onSelectEntity({
            type: 'municipality',
            item: city,
          });
        });

        layer.addLayer(marker);
      });
    });
  }, [
    country,
    effectiveLevel,
    isBlindMode,
    isBilingual,
    mode,
    quizTarget,
    selectedEntity,
    onQuizAnswer,
    onSelectEntity,
  ]);

  // Zoom handlers
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.invalidateSize();
    const targetZoom =
      displayMode !== 'auto'
        ? country.zoomLevels[`level${displayMode}`]
        : country.zoomLevels.level1;
    safeNavigateTo(country.center[1], country.center[0], targetZoom);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Real Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Loading GeoJSON Indicator */}
      {isLoadingGeoJson && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold shadow-md animate-pulse">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span>Natural Earth 地理境界データを読み込み中...</span>
        </div>
      )}

      {/* Floating Scale & Hierarchy Indicator Badge in Top Left */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-sm border border-stone-200/80 dark:border-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300">
          <Navigation className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>表示階層:</span>
          <span className="font-bold text-stone-900 dark:text-stone-100">
            {effectiveLevel === 1 && `第1階層: ${country.levelNames.level1.ja}`}
            {effectiveLevel === 2 && `第2階層: ${country.levelNames.level2.ja}`}
            {effectiveLevel === 3 && `第3階層: ${country.levelNames.level3.ja}`}
          </span>
          <span className="text-stone-400">·</span>
          <span className="text-stone-500 font-mono">
            Zoom {currentZoom.toFixed(1)}
          </span>
        </div>

        {displayMode === 'auto' && (
          <div className="text-[11px] text-stone-600 dark:text-stone-400 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-stone-200/60 shadow-xs w-fit">
            縮尺に応じて自動切り替え中
          </div>
        )}
      </div>

      {/* Bottom Left Dock: Zoom, Fit, and Real Basemap Switcher */}
      <div className="absolute bottom-6 left-4 z-10 flex items-center gap-1.5 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-md">
        <button
          onClick={handleZoomIn}
          title="拡大 (Zoom In)"
          className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="縮小 (Zoom Out)"
          className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-stone-200 dark:bg-stone-800" />
        <button
          onClick={handleResetView}
          title="全体表示に戻す"
          className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">全体</span>
        </button>

        <div className="w-px h-5 bg-stone-200 dark:bg-stone-800" />

        {/* Real Basemap Selector */}
        <div className="relative">
          <button
            onClick={() => setShowBasemapMenu(!showBasemapMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            title="背景のリアル地図を切り替え"
          >
            <MapIcon className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline">背景地図</span>
          </button>

          {showBasemapMenu && (
            <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-stone-900 rounded-xl shadow-xl border border-stone-200 dark:border-stone-800 p-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
              <div className="text-[10px] font-bold text-stone-400 px-2 py-1 uppercase tracking-wider">
                背景の地図レイヤー
              </div>
              {(Object.keys(BASEMAP_TILES) as BasemapKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveBasemap(key);
                    setShowBasemapMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    activeBasemap === key
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{BASEMAP_TILES[key].name}</span>
                  {activeBasemap === key && <span>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
