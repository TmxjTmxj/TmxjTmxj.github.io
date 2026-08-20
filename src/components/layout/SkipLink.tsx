import { copy } from '../../data/site';

/** Visually hidden until focused - first tab stop on the page. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
    >
      {copy.skipLink}
    </a>
  );
}
