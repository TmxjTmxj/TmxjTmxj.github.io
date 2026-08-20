/**
 * Standard project card for the Projects grid: cover, meta, description,
 * tech chips and links. Whole card lifts on hover.
 */
import { Link } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import type { Project } from '../../types';
import { copy, categoryLabels } from '../../data/site';
import { asset } from '../../lib/utils';
import { Badge } from '../ui/Badge';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link
        to={`/projects/${project.slug}`}
        className="block overflow-hidden border-b border-line"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={asset(project.image)}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          width={800}
          height={533}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-48"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{categoryLabels[project.categories[0]]}</Badge>
          <span className="font-mono text-xs text-ink-muted">{project.year}</span>
          {project.isPlaceholder && <Badge tone="warn">{copy.projects.placeholderBadge}</Badge>}
        </div>

        <h3 className="mt-3 text-lg font-bold tracking-tight">
          <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="clamp-3 mt-2 text-sm leading-relaxed text-ink-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge className="text-ink-muted">+{project.technologies.length - 4}</Badge>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 mt-5">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {copy.projects.viewProject} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-elevated hover:text-ink"
              aria-label={`${project.title} on GitHub`}
            >
              <Github className="h-4.5 w-4.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
