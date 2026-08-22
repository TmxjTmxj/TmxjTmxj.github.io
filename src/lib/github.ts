/**
 * GitHub data - BUILD-TIME FIRST, live API only as last resort.
 * ---------------------------------------------------------------
 * scripts/fetch-github-stats.mjs bakes real stats into
 * public/github-stats.json during every build (authenticated in
 * GitHub Actions - refreshed on every deploy). The client ALWAYS reads
 * that file when present, so the homepage shows real stars/repos/
 * languages with ZERO runtime API calls - no rate limits, no console
 * errors, no flaky Lighthouse. The live API is only used when the
 * build-time file is missing entirely (e.g. local `npm run dev`
 * without running the fetch script first).
 */
import { useEffect, useState } from 'react';
import { asset } from './utils';

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

export interface RepoStats {
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
}

interface StaticStats {
  fetchedAt: string;
  user: GitHubUser;
  repos: GitHubRepo[];
  reposByName: Record<string, RepoStats>;
}

const TTL_MS = 10 * 60 * 1000;
const cache = new Map<string, { at: number; data: unknown }>();

let staticStats: StaticStats | null | 'loading' = 'loading';

async function cached<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data as T;
  const data = await fetchFn();
  cache.set(key, { at: Date.now(), data });
  return data;
}

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return (await res.json()) as T;
}

/** Loads the build-time stats file once (module-level cache). */
async function loadStaticStats(): Promise<StaticStats | null> {
  if (staticStats !== 'loading') return staticStats;
  try {
    const res = await fetch(asset('/github-stats.json'), { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`stats file HTTP ${res.status}`);
    staticStats = (await res.json()) as StaticStats;
    return staticStats;
  } catch {
    staticStats = null;
    return null;
  }
}

/** Profile + repos for the GitHub statistics section. */
export function useGitHubProfile(username: string) {
  const [state, setState] = useState<{
    user: GitHubUser | null;
    repos: GitHubRepo[];
    loading: boolean;
  }>({ user: null, repos: [], loading: Boolean(username) });

  useEffect(() => {
    if (!username) {
      setState({ user: null, repos: [], loading: false });
      return;
    }
    let cancelled = false;

    (async () => {
      // Build-time data first - always preferred, never rate-limited.
      const stats = await loadStaticStats();
      if (!cancelled && stats) {
        setState({ user: stats.user, repos: stats.repos, loading: false });
        return;
      }
      // Only when no build-time file exists at all -> live API.
      try {
        const [user, repos] = await Promise.all([
          getJSON<GitHubUser>(`https://api.github.com/users/${username}`),
          getJSON<GitHubRepo[]>(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
          ),
        ]);
        if (!cancelled) setState({ user, repos, loading: false });
      } catch {
        if (!cancelled) setState({ user: null, repos: [], loading: false });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}

/** Star/fork/language badges for a single project card. */
export function useRepoStats(fullName?: string) {
  const [stats, setStats] = useState<RepoStats | null>(null);

  useEffect(() => {
    if (!fullName) {
      setStats(null);
      return;
    }
    let cancelled = false;

    (async () => {
      // Build-time data first.
      const staticData = await loadStaticStats();
      const baked = staticData?.reposByName[fullName];
      if (!cancelled && baked) {
        setStats(baked);
        return;
      }
      // Live API only when the badge wasn't baked at build time.
      try {
        const repo = await cached(`repo:${fullName}`, () =>
          getJSON<{
            stargazers_count: number;
            forks_count: number;
            language: string | null;
            pushed_at: string;
          }>(`https://api.github.com/repos/${fullName}`),
        );
        if (!cancelled) {
          setStats({
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            pushedAt: repo.pushed_at,
          });
        }
      } catch {
        if (!cancelled && baked) setStats(baked);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fullName]);

  return stats;
}
