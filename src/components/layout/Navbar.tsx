/**
 * Sticky navbar: route-aware active states, GitHub / Email quick links,
 * 3-state theme toggle (light/dark/system) and a mobile hamburger menu.
 */
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Github, Mail, Menu, Monitor, Moon, Sun, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { navLinks, copy } from '../../data/site';
import { profile } from '../../data/profile';
import { useTheme } from '../../hooks/useTheme';

function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();
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
      aria-label={`${copy.nav.themeLabel} (current: ${theme})`}
      title={`Theme: ${theme} — click to switch`}
    >
      {icon}
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
          <span>{profile.name.toLowerCase().replace(/\s+/g, '-')}</span>
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
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right side: GitHub / Email / theme / hamburger */}
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
          <ThemeToggle />
          <button
            type="button"
            className="rounded-md p-2 text-ink-muted transition-colors hover:bg-elevated hover:text-ink lg:hidden"
            aria-label={open ? copy.nav.closeLabel : copy.nav.menuLabel}
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
              {link.label}
            </NavLink>
          ))}
          <div className="mt-2 flex gap-2 border-t border-line pt-3">
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
          </div>
        </div>
      </div>
    </header>
  );
}
