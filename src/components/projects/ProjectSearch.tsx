/** Project search input - with clear button. */
import { Search, X } from 'lucide-react';
import { useI18n } from '../../i18n/context';

export function ProjectSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { t } = useI18n();
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.projects.searchPlaceholder}
        aria-label={t.projects.searchLabel}
        className="w-full rounded-[var(--radius-btn)] border border-line bg-surface py-2 pl-9 pr-9 text-sm text-ink placeholder:text-ink-muted focus:border-accent"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-ink-muted hover:text-ink"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
