/**
 * Analytics loader - fully inert by default.
 * Only when siteConfig.analytics.enabled is true does it inject the
 * configured provider's script (GA4 / Umami / Plausible).
 */
import { useEffect } from 'react';
import { siteConfig } from '../../data/site';

export function Analytics() {
  const { enabled, provider, googleId, umamiSrc, umamiId, plausibleDomain } =
    siteConfig.analytics;

  useEffect(() => {
    if (!enabled) return;

    if (provider === 'google' && googleId) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleId}`;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: unknown[]) => {
        window.dataLayer!.push(args);
      };
      gtag('js', new Date());
      gtag('config', googleId);
    }

    if (provider === 'umami' && umamiSrc && umamiId) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = umamiSrc;
      script.dataset.websiteId = umamiId;
      document.head.appendChild(script);
    }

    if (provider === 'plausible' && plausibleDomain) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://plausible.io/js/script.js';
      script.dataset.domain = plausibleDomain;
      document.head.appendChild(script);
    }
  }, [enabled, provider, googleId, umamiSrc, umamiId, plausibleDomain]);

  return null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
