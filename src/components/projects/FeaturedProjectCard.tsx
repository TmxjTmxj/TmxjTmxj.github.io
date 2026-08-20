/**
 * Large featured project card: cover + Problem/Solution highlights +
 * tech stack + links. GitHub stars/forks/language are layered on when
 * githubRepo is configured and the API is reachable - never required.
 */
import { Link } from 'react-router-dom';
import { ArrowRight, CircleDot, GitFork, Github, Star } from 'lucide-react';
import type { Project } from '../../types';
import { copy, categoryLabels } from '../../data/site';
import { asset, cn, formatCount } from '../../lib/utils';
import { useRepoStats } from '../../lib/github';
import { Badge } from '../ui/Badge';

export function FeaturedProjectCard({ project }: { project: Project }) {
  const stats = useRepoStats(project.githubRepo);

  return (
    <article className="card card-hover grid overflow-hidden lg:grid-cols-[1.05fr_1fr]">
      {/* Cover */}
      <Link
        to={`/projects/${project.slug}`}
        className="group relative block overflow-hidden border-b border-line bg-surface lg:border-b-0 lg:border-r"
        aria-label={`${project.title} - open case study`}
        tabIndex={-1}
      >
        <img
          src={asset(project.image)}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          width={1200}
          height={800}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-72 lg:h-full lg:min-h-[340px]"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          {project.categories.map((c) => (
            <Badge key={c} tone="accent">
              {categoryLabels[c]}
            </Badge>
          ))}
          <span className="font-mono text-xs text-ink-muted">{project.year}</span>
          {project.isPlaceholder && <Badge tone="warn">{copy.projects.placeholderBadge}</Badge>}
          {stats && (
            <span className="ml-auto flex items-center gap-3 font-mono text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                {formatCount(stats.stars)}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
                {formatCount(stats.forks)}
              </span>
              {stats.language && <span>{stats.language}</span>}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">
          <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{project.description}</p>

        {/* Problem -> Solution, compact */}
        <dl className="mt-4 space-y-2 border-l-2 border-line pl-4 text-sm">
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-amber">{copy.detail.problem}</dt>
            <dd className="clamp-2 mt-0.5 text-ink-muted">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-green">{copy.detail.solution}</dt>
            <dd className="clamp-2 mt-0.5 text-ink-muted">{project.solution}</dd>
          </div>
        </dl>

        {/* Highlights */}
        <ul className="mt-4 space-y-1.5">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-ink-soft">
              <CircleDot className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          {project.technologies.length > 5 && (
            <Badge className="text-ink-muted">+{project.technologies.length - 5}</Badge>
          )}
        </div>

        {/* Links */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          <Link
            to={`/projects/${project.slug}`}
            className={cn(
              'inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover',
            )}
          >
            {copy.projects.viewCaseStudy} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-line-strong hover:bg-elevated"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              {copy.projects.github}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent transition-colors hover:text-accent-hover hover:underline"
            >
              {copy.projects.demo} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
