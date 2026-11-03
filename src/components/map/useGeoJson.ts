import { useEffect, useState } from 'react';
import type { FeatureCollection } from 'geojson';

const cache = new Map<string, FeatureCollection>();

function resolveUrl(raw: string): string {
  if (raw.startsWith('http')) return raw;
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${raw.startsWith('/') ? raw.slice(1) : raw}`;
}

/** 国別の GeoJSON を取得する（GitHub Pages のサブパス配信に対応。取得済みは再利用する） */
export function useGeoJson(url: string | undefined) {
  const [state, setState] = useState<{ url: string; data: FeatureCollection } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) {
      setState(null);
      setLoading(false);
      return;
    }
    const cached = cache.get(url);
    if (cached) {
      setState({ url, data: cached });
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    fetch(resolveUrl(url), { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load GeoJSON: ${res.status}`);
        return res.json() as Promise<FeatureCollection>;
      })
      .then((data) => {
        cache.set(url, data);
        setState({ url, data });
        setLoading(false);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error('GeoJSON fetch error:', err);
        setState(null);
        setLoading(false);
      });
    return () => controller.abort();
  }, [url]);

  // 別の国の読み込み中に、前の国のデータを返さない
  return { data: state && state.url === url ? state.data : null, loading };
}
