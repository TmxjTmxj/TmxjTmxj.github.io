/**
 * Projects page: search + category filter over the full project set.
 * Category state is synced to the URL (?category=robotics) so filtered
 * views are shareable and back/forward works.
 */
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { copy, siteConfig, categoryLabels } from '../data/site';
import { projects } from '../data/projects';
import { usePageMeta } from '../lib/seo';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectSearch } from '../components/projects/ProjectSearch';
import { ProjectFilters, type CategoryFilterValue } from '../components/projects/ProjectFilters';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { FolderOpen } from 'lucide-react';

export function ProjectsPage() {
  usePageMeta({
    title: `Projects · ${siteConfig.author}`,
    description: 'Selected engineering projects: AI agents, robotics, engineering software and intelligent systems.',
    path: '/projects',
    image: siteConfig.ogImage,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const category = useMemo(() => {
    const raw = searchParams.get('category');
    return raw && raw !== 'all' ? (raw as CategoryFilterValue) : 'all';
  }, [searchParams]);

  const setCategory = (next: CategoryFilterValue) => {
    if (next === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', next);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory =
        category === 'all' || p.categories.includes(category as never);
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [
        p.title,
        p.description,
        p.tags.join(' '),
        p.technologies.join(' '),
        p.categories.map((c) => categoryLabels[c]).join(' '),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, category]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: projects.length };
    for (const c of Object.keys(categoryLabels)) {
      result[c] = projects.filter((p) => p.categories.includes(c as never)).length;
    }
    return result;
  }, []);

  return (
    <div className="container-page pb-20 pt-28 sm:pt-32">
      <header className="max-w-2xl">
        <p className="section-label mb-2">projects</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.projects.title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{copy.projects.subtitle}</p>
      </header>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ProjectSearch value={query} onChange={setQuery} />
        <p className="font-mono text-sm text-ink-muted" role="status" aria-live="polite">
          {filtered.length} {copy.projects.results}
        </p>
      </div>

      <div className="mt-4">
        <ProjectFilters value={category} onChange={setCategory} counts={counts} />
      </div>

      {filtered.length > 0 ? (
        <div key={`${category}-${query}`} className="filter-enter mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <div className="card mt-10 p-12 text-center">
          <FolderOpen className="mx-auto h-10 w-10 text-ink-muted" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">{copy.projects.emptyTitle}</h2>
          <p className="mt-1 text-sm text-ink-muted">{copy.projects.emptyText}</p>
          <Button
            className="mt-6"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
          >
            {copy.projects.reset}
          </Button>
        </div>
      )}

      <Reveal className="mt-16">
        <p className="text-center font-mono text-xs text-ink-muted">
          // More on GitHub: {siteConfig.url}
        </p>
      </Reveal>
    </div>
  );
}
