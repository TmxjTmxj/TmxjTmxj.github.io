/**
 * Section heading in the "specification block" style:
 *   [01]  // featured-projects     <- mono index chip + overline
 *   Selected work                  <- title (balanced)
 *   subtitle…
 *   ───────────────────────────    <- gradient rule
 */
import { cn } from '../../lib/utils';

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  id,
  index,
}: {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  id?: string;
  /** Optional mono index chip, e.g. "01". */
  index?: string;
}) {
  return (
    <div className={cn('mb-10 max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <div className={cn('mb-2 flex items-center gap-2', align === 'center' && 'justify-center')}>
        {index && <span className="spec-index">{index}</span>}
        <p className="section-label">{label}</p>
      </div>
      <h2 id={id} className="heading-balance text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{subtitle}</p>
      )}
      <div className={cn('spec-rule mt-6', align === 'center' && 'mx-auto w-40')} />
    </div>
  );
}
