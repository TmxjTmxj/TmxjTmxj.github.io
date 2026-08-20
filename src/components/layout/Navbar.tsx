/**
 * Sticky navbar: route-aware active states, GitHub / Email quick links,
 * language toggle (EN / 中文), 3-state theme toggle and a mobile menu.
 */
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Github, Languages, Mail, Menu, Monitor, Moon, Sun, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { navLinks } from '../../data/site';
import { useI18n } from '../../i18n/context';
import { useProfile } from '../../i18n/use-content';
import { useTheme } from '../../hooks/useTheme';

function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();
  const { t } = useI18n();
  const icon =
    theme === 'light' ? (
      <Sun className="h-4.5 w-4.5" aria-hidden="true" />
    ) : theme === 'dark' ? (
      <Moon className="h-4.5 w-4.5" aria-hidden="true" />
    ) : (
      <Monitor className="h-4.5 w-4.5" aria-hidden="true" />
    );
  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="rounded-md p-2 text-ink-muted transition-colors hover:bg-elevated hover:text-ink"
      aria-label={`${t.nav.themeLabel} (current: ${theme})`}
      title={`Theme: ${theme}`}
    >
      {icon}
    </button>
  );
}

function LanguageToggle() {
  const { lang, toggleLang, t } = useI18n();
  return (
    <button
      type="button"
      onClick={toggleLang}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 font-mono text-xs font-medium text-ink-muted transition-colors hover:bg-elevated hover:text-ink"
      aria-label={t.lang.toggleLabel}
      title={t.lang.toggleLabel}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      {lang === 'en' ? '中文' : 'EN'}
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t, lang, toggleLang } = useI18n();
  const profile = useProfile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const linkLabel = (key: (typeof navLinks)[number]['key']) => t.nav[key];

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-200',
        scrolled || open
          ? 'border-b border-line bg-canvas/90 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="container-page flex h-14 items-center justify-between" aria-label="Main">
        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-2 font-mono text-[15px] font-medium text-ink"
          onClick={() => setOpen(false)}
        >
          <span className="text-accent">~/</span>
          <span>{profile.handle}</span>
          <span className="cursor-blink text-green" aria-hidden="true" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'bg-elevated font-medium text-ink'
                    : 'text-ink-muted hover:bg-elevated hover:text-ink',
                )
              }
            >
              {linkLabel(link.key)}
            </NavLink>
          ))}
        </div>

        {/* Right side: GitHub / Email / language / theme / hamburger */}
        <div className="flex items-center gap-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md p-2 text-ink-muted transition-colors hover:bg-elevated hover:text-ink sm:block"
            aria-label="GitHub"
            title="GitHub"
          >
            <Github className="h-4.5 w-4.5" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hidden rounded-md p-2 text-ink-muted transition-colors hover:bg-elevated hover:text-ink sm:block"
            aria-label="Email"
            title="Email"
          >
            <Mail className="h-4.5 w-4.5" aria-hidden="true" />
          </a>
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="rounded-md p-2 text-ink-muted transition-colors hover:bg-elevated hover:text-ink lg:hidden"
            aria-label={open ? t.nav.closeLabel : t.nav.menuLabel}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={cn(
          'overflow-hidden border-line transition-[max-height,opacity] duration-200 lg:hidden',
          open ? 'max-h-96 border-b bg-canvas opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="container-page flex flex-col gap-1 py-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-[15px]',
                  isActive ? 'bg-elevated font-medium text-accent' : 'text-ink-soft hover:bg-elevated',
                )
              }
            >
              {linkLabel(link.key)}
            </NavLink>
          ))}
          <div className="mt-2 flex items-center gap-2 border-t border-line pt-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-elevated"
            >
              <Github className="h-4 w-4" aria-hidden="true" /> GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-elevated"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> Email
            </a>
            <button
              type="button"
              onClick={() => {
                toggleLang();
                setOpen(false);
              }}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-elevated"
            >
              <Languages className="h-4 w-4" aria-hidden="true" />
              {lang === 'en' ? '中文' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
