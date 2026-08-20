/** Join class names, dropping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Resolve an absolute-in-project asset path (e.g. "/projects/x/cover.svg")
 * against the Vite base path, so assets work both on username.github.io (/)
 * and on project pages (username.github.io/repo/).
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

/** 1234 -> "1.2k" */
export function formatCount(n: number): string {
  if (n >= 1000) {
    const v = n / 1000;
    return `${v >= 10 ? Math.round(v) : v.toFixed(1)}k`;
  }
  return String(n);
}

/** Truncate long strings with an ellipsis. */
export function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
