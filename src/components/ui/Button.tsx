/**
 * Polymorphic button: renders <Link> for `to`, <a> for `href`
 * (external links get target=_blank + rel), otherwise <button>.
 */
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  to?: string;
  href?: string;
  download?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  ariaLabel?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-ink hover:bg-accent-hover font-medium shadow-sm',
  secondary:
    'border border-line bg-surface text-ink hover:border-line-strong hover:bg-elevated',
  ghost: 'text-ink-soft hover:text-ink hover:bg-elevated',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-[15px] gap-2',
};

const base =
  'inline-flex items-center justify-center rounded-[var(--radius-btn)] font-medium transition-colors duration-150 select-none whitespace-nowrap';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  download,
  onClick,
  type = 'button',
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(download ? { download: true } : {})}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
