/**
 * GitHub Public API client - ENHANCEMENT ONLY.
 *
 * The portfolio must render perfectly without GitHub. Every function here
 * fails soft (returns null / empty) and caches aggressively so a rate-limit
 * or outage never affects the page. Local data in src/data/ is the source
 * of truth; this layer only decorates it with live stars / forks / language.
 */
import { useEffect, useState } from 'react';

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
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics: string[];
}

export interface RepoStats {
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
}

const TTL_MS = 10 * 60 * 1000; // 10 minutes
const cache = new Map<string, { at: number; data: unknown }>();

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

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  if (!username) return null;
  try {
    return await cached(`user:${username}`, () =>
      getJSON<GitHubUser>(`https://api.github.com/users/${username}`),
    );
  } catch {
    return null;
  }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  if (!username) return [];
  try {
    return await cached(`repos:${username}`, () =>
      getJSON<GitHubRepo[]>(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
      ),
    );
  } catch {
    return [];
  }
}

export async function fetchRepoStats(fullName: string): Promise<RepoStats | null> {
  if (!fullName) return null;
  try {
    return await cached(`repo:${fullName}`, async () => {
      const repo = await getJSON<GitHubRepo>(`https://api.github.com/repos/${fullName}`);
      return {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        pushedAt: repo.pushed_at,
      };
    });
  } catch {
    return null;
  }
}

/** Live profile + repos for the GitHub statistics section. */
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
    setState({ user: null, repos: [], loading: true });
    Promise.all([fetchGitHubUser(username), fetchGitHubRepos(username)]).then(
      ([user, repos]) => {
        if (!cancelled) setState({ user, repos, loading: false });
      },
    );
    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}

/** Live repo stats for a single project card. */
export function useRepoStats(fullName?: string) {
  const [stats, setStats] = useState<RepoStats | null>(null);

  useEffect(() => {
    if (!fullName) {
      setStats(null);
      return;
    }
    let cancelled = false;
    fetchRepoStats(fullName).then((s) => {
      if (!cancelled && s) setStats(s);
    });
    return () => {
      cancelled = true;
    };
  }, [fullName]);

  return stats;
}
