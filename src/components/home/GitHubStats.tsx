/**
 * GitHub statistics section. Live data only - if the profile has no
 * githubUsername yet, a setup hint is shown instead of fake numbers.
 * On API failure the section hides itself (never blocks the page).
 */
import { Link } from 'react-router-dom';
import { ExternalLink, Github, GitFork, Star, Users } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { useProfile } from '../../i18n/use-content';
import { useGitHubProfile } from '../../lib/github';
import { formatCount } from '../../lib/utils';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

export function GitHubStats() {
  const { t } = useI18n();
  const profile = useProfile();
  const { user, repos, loading } = useGitHubProfile(profile.githubUsername);

  // Nothing configured yet -> honest setup hint.
  if (!profile.githubUsername) {
    return (
      <section className="border-t border-line bg-surface" aria-labelledby="github-title">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <SectionHeading id="github-title" index="04" label={t.home.githubLabel} title={t.home.githubTitle} />
            <div className="card p-8 text-center">
              <Github className="mx-auto h-8 w-8 text-ink-muted" aria-hidden="true" />
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
                {t.githubSection.unconfigured}
              </p>
              <code className="mt-4 inline-block rounded-md bg-elevated px-3 py-1.5 font-mono text-xs text-ink-soft">
                src/data/profile.ts → githubUsername
              </code>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  // Loading or failed -> render nothing (no fake data, no broken layout).
  if (loading || !user) return null;

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const languageCounts = new Map<string, number>();
  for (const repo of repos) {
    if (repo.language) languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
  }
  const topLanguages = [...languageCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const maxLang = topLanguages[0]?.[1] ?? 1;

  return (
    <section className="border-t border-line bg-surface" aria-labelledby="github-title">
      <div className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading id="github-title" index="04" label={t.home.githubLabel} title={t.home.githubTitle} />
        </Reveal>
        <Reveal>
          <div className="card grid gap-0 lg:grid-cols-[1.1fr_1fr]">
            {/* Profile */}
            <div className="flex flex-col items-start gap-4 p-6 sm:p-8 lg:border-r lg:border-line">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                  loading="lazy"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full border border-line"
                />
                <div>
                  <p className="text-lg font-semibold">{user.name ?? user.login}</p>
                  <p className="font-mono text-sm text-accent">@{user.login}</p>
                </div>
              </div>
              <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p className="font-mono text-xl font-semibold">{user.public_repos}</p>
                  <p className="text-xs text-ink-muted">{t.githubSection.repos}</p>
                </div>
                <div>
                  <p className="font-mono text-xl font-semibold">{formatCount(totalStars)}</p>
                  <p className="text-xs text-ink-muted">{t.githubSection.stars}</p>
                </div>
                <div>
                  <p className="font-mono text-xl font-semibold">{user.followers}</p>
                  <p className="text-xs text-ink-muted">{t.githubSection.followers}</p>
                </div>
                <div>
                  <p className="font-mono text-xl font-semibold">{user.following}</p>
                  <p className="text-xs text-ink-muted">{t.githubSection.following}</p>
                </div>
              </div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                {t.githubSection.visitProfile} <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            {/* Top languages */}
            <div className="border-t border-line p-6 sm:p-8 lg:border-l-0 lg:border-t-0">
              <h3 className="font-mono text-sm font-medium">{t.githubSection.topLanguages}</h3>
              {topLanguages.length === 0 ? (
                <p className="mt-4 text-sm text-ink-muted">{t.githubSection.unavailable}</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {topLanguages.map(([lang, count]) => (
                    <li key={lang}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="inline-flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                          {lang}
                        </span>
                        <span className="font-mono text-xs text-ink-muted">{count} repos</span>
                      </div>
                      <div
                        className="mt-1.5 h-1.5 rounded-full bg-elevated"
                        role="presentation"
                      >
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${(count / maxLang) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                  {formatCount(totalStars)} {t.githubSection.starsWord}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatCount(repos.reduce((s, r) => s + r.forks_count, 0))} {t.githubSection.forksWord}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  {repos.length} {t.githubSection.reposListed}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center">
            <Link
              to="/projects"
              className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {t.githubSection.browseProjects}
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
