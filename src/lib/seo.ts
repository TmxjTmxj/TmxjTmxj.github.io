/**
 * Per-page SEO. Static defaults live in index.html; this hook overrides
 * title / description / canonical / OG / Twitter tags on route change.
 */
import { useEffect } from 'react';
import { siteConfig } from '../data/site';

export interface PageMeta {
  title: string;
  description: string;
  /** Route path WITHOUT base prefix, e.g. "/projects/slug". */
  path: string;
  image?: string;
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
}

function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

export function usePageMeta({ title, description, path, image }: PageMeta) {
  useEffect(() => {
    const url = absoluteUrl(path);

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', url);

    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);

    if (image) {
      const imageUrl = absoluteUrl(image);
      setMeta('meta[property="og:image"]', 'content', imageUrl);
      setMeta('meta[name="twitter:image"]', 'content', imageUrl);
    }
  }, [title, description, path, image]);
}
