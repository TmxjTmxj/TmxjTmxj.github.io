/**
 * I18n context - language state lives in exactly one place.
 * ---------------------------------------------------------------
 * - `lang`: 'en' | 'zh' (default: saved pref → browser zh → en)
 * - persisted to localStorage('lang')
 * - `t`: the active UI copy object (type-safe, complete in both languages)
 * - keeps <html lang> in sync for accessibility & SEO
 *
 * eslint-disable react-refresh/only-export-components: provider + hook
 * intentionally co-located (single i18n module); full refresh on change
 * is acceptable for this non-visual leaf module.
 */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { en } from './en';
import { zh } from './zh';
import type { Copy, Lang } from './types';

const STORAGE_KEY = 'lang';

function detectDefault(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'zh') return saved;
  } catch {
    /* ignore */
  }
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('zh')) {
    return 'zh';
  }
  return 'en';
}

const copyByLang: Record<Lang, Copy> = { en, zh };

interface I18nValue {
  lang: Lang;
  /** Active UI copy. */
  t: Copy;
  setLang: (lang: Lang) => void;
  /** en <-> zh one-click toggle for the navbar. */
  toggleLang: () => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectDefault);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(
    () => setLangState((prev) => (prev === 'en' ? 'zh' : 'en')),
    [],
  );

  const value = useMemo<I18nValue>(
    () => ({ lang, t: copyByLang[lang], setLang, toggleLang }),
    [lang, setLang, toggleLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
