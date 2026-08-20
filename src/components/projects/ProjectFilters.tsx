/** Category filter chips: All + every category present in the data. */
import { cn } from '../../lib/utils';
import { useI18n } from '../../i18n/context';
import { useAllCategories } from '../../i18n/use-content';
import type { Category } from '../../types';

export type CategoryFilterValue = 'all' | Category;

export function ProjectFilters({
  value,
  onChange,
  counts,
}: {
  value: CategoryFilterValue;
  onChange: (v: CategoryFilterValue) => void;
  counts: Record<string, number>;
}) {
  const { t } = useI18n();
  const options: CategoryFilterValue[] = ['all', ...useAllCategories()];

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label={t.projects.filterLabel}
    >
      {options.map((option) => {
        const active = value === option;
        const label = option === 'all' ? t.projects.all : t.categories[option];
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors',
              active
                ? 'border-accent bg-accent-soft font-medium text-accent'
                : 'border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink',
            )}
          >
            {label}
            <span className={cn('font-mono text-xs', active ? 'text-accent/70' : 'text-ink-muted')}>
              {counts[option] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
