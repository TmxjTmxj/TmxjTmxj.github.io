import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

/** Small mono chip used for tags, tech stack and meta info. */
export function Badge({
  children,
  className,
  tone = 'default',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'accent' | 'warn';
}) {
  const tones = {
    default: '',
    accent: 'border-accent/40 text-accent',
    warn: 'border-amber/40 text-amber',
  };
  return <span className={cn('chip', tones[tone], className)}>{children}</span>;
}
