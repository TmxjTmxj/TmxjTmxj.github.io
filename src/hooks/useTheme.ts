/**
 * Theme management: light | dark | system, persisted in localStorage.
 * The pre-paint script in index.html applies the saved theme before React
 * mounts, so this hook only needs to keep state in sync with the DOM.
 */
import { useCallback, useEffect, useState } from 'react';

export type ThemePref = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';
const MEDIA = '(prefers-color-scheme: dark)';

function readStored(): ThemePref {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'light' || v === 'dark' || v === 'system') return v;
  } catch {
    /* ignore */
  }
  return 'system';
}

function resolve(pref: ThemePref): 'light' | 'dark' {
  if (pref === 'system') {
    return window.matchMedia(MEDIA).matches ? 'dark' : 'light';
  }
  return pref;
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemePref>(() => {
    // Mirror what the pre-paint script already applied.
    return (document.documentElement.dataset.theme as ThemePref) || readStored();
  });
  const [resolved, setResolved] = useState<'light' | 'dark'>(() => resolve(theme));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    document.documentElement.dataset.theme = theme;
  }, [theme, resolved]);

  // Keep `system` mode in sync with OS changes.
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia(MEDIA);
    const onChange = () => setResolved(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [theme]);

  const setTheme = useCallback((next: ThemePref) => {
    setThemeState(next);
    setResolved(resolve(next));
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  /** light -> dark -> system -> light … */
  const cycleTheme = useCallback(() => {
    const order: ThemePref[] = ['light', 'dark', 'system'];
    setTheme(order[(order.indexOf(theme) + 1) % order.length]);
  }, [theme, setTheme]);

  return { theme, resolved, setTheme, cycleTheme };
}
