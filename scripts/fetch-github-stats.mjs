/**
 * Build-time GitHub stats fetcher.
 * ---------------------------------------------------------------
 * Bakes real GitHub data into public/github-stats.json so the site
 * shows fresh statistics WITHOUT runtime API calls (no rate limits,
 * no console errors, no flaky Lighthouse scores). The client falls
 * back to the live API only when this file is missing or stale.
 *
 * Uses GITHUB_TOKEN when available (GitHub Actions), otherwise
 * unauthenticated. NEVER fails the build: on any error the previous
 * file (if any) is kept.
 *
 * Run:  npm run github:stats   (also part of `npm run build`)
 */
import fs from 'node:fs';
import path from 'node:path';

const outFile = path.resolve('public/github-stats.json');
const username = 'TmxjTmxj';

/** Projects that show live star/fork/language badges on their cards. */
const trackedRepos = [
  'TmxjTmxj/ros2-agent-workflow',
  'TmxjTmxj/agent-orchestrator',
  'TmxjTmxj/beifeng-wind-agent',
  'TmxjTmxj/hermes-core',
  'TmxjTmxj/lobster-core',
  'TmxjTmxj/software-dev-team-skill',
  'TmxjTmxj/tmxj-agent',
  'TmxjTmxj/cnc-cam-gcode-simulator',
  'TmxjTmxj/shrapnel-force-predictor',
  'TmxjTmxj/ansys-mech-sim-cases',
];

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const headers = {
  'User-Agent': 'portfolio-build',
  Accept: 'application/vnd.github+json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function getJSON(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

try {
  const user = await getJSON(`https://api.github.com/users/${username}`);
  const repos = await getJSON(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
  );

  const reposByName = {};
  for (const full of trackedRepos) {
    const repo = repos.find((r) => r.full_name === full);
    if (repo) {
      reposByName[full] = {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        pushedAt: repo.pushed_at,
      };
    }
  }

  const payload = {
    fetchedAt: new Date().toISOString(),
    user: {
      login: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      html_url: user.html_url,
    },
    repos: repos.map((r) => ({
      name: r.name,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
    })),
    reposByName,
  };

  fs.writeFileSync(outFile, JSON.stringify(payload, null, 2), 'utf8');
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  console.log(
    `✓ github-stats.json: ${user.public_repos} repos · ${totalStars} stars · ${Object.keys(reposByName).length} project badges`,
  );
} catch (e) {
  if (fs.existsSync(outFile)) {
    console.log(`⚠ github stats fetch failed (${e.message}) - keeping previous github-stats.json`);
  } else {
    console.log(`⚠ github stats fetch failed (${e.message}) - site will fall back to live API`);
  }
}
