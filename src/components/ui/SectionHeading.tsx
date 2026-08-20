/**
 * Section heading with a mono engineering overline:
 *   // featured-projects
 *   Selected work
 *   subtitle…
 */
import { cn } from '../../lib/utils';

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  id,
}: {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  id?: string;
}) {
  return (
    <div className={cn('mb-10 max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <p className="section-label mb-2">{label}</p>
      <h2
        id={id}
        className="text-2xl font-bold tracking-tight sm:text-3xl"
      >
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{subtitle}</p>}
    </div>
  );
}
