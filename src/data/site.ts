/**
 * Site-wide configuration.
 * ---------------------------------------------------------------
 * All UI copy now lives in src/i18n/{en,zh}.ts and content in
 * src/data/*.ts (with zh overrides in src/i18n/zh-content.ts).
 * This file only holds language-neutral site config.
 */

export const siteConfig = {
  /** Final site URL (GitHub Pages user site). */
  url: 'https://tmxjtmxj.github.io',
  title: '天漠雪佳 · AI Agent Engineer',
  description:
    'Portfolio of 天漠雪佳 (TmxjTmxj) — AI Agent Engineer building multi-agent systems, ROS2 + MCP robot control and AI for intelligent manufacturing.',
  keywords: [
    'AI Agent Engineer',
    'AI Agent',
    'ROS2',
    'MCP',
    'Intelligent Manufacturing',
    'Rust',
    'Python',
    'Portfolio',
  ],
  author: '天漠雪佳',
  language: 'en',
  ogImage: '/og/og-image.png',

  /**
   * Analytics - OFF by default. Nothing is loaded until you flip
   * `enabled: true` and configure a provider.
   *  - google:  Google Analytics 4 measurement id (G-XXXXXXX)
   *  - umami:   umamiSrc (script url) + umamiId (website id)
   *  - plausible: plausibleDomain + src (defaults to plausible.io script)
   */
  analytics: {
    enabled: false,
    provider: 'none' as 'none' | 'google' | 'umami' | 'plausible',
    googleId: '',
    umamiSrc: '',
    umamiId: '',
    plausibleDomain: '',
  },
};

/** Navigation destinations (labels resolve per-language via i18n copy). */
export const navLinks = [
  { to: '/', key: 'home' },
  { to: '/projects', key: 'projects' },
  { to: '/experience', key: 'experience' },
  { to: '/skills', key: 'skills' },
  { to: '/about', key: 'about' },
  { to: '/resume', key: 'resume' },
  { to: '/contact', key: 'contact' },
] as const;

export type NavKey = (typeof navLinks)[number]['key'];
