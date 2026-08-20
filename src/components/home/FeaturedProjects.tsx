/**
 * Home "Featured Projects" section: the top featured project as a large
 * card, the rest in a 2-column grid, plus a "view all" link.
 */
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/context';
import { useFeaturedProjects } from '../../i18n/use-content';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { FeaturedProjectCard } from '../projects/FeaturedProjectCard';
import { ProjectCard } from '../projects/ProjectCard';

export function FeaturedProjects() {
  const { t } = useI18n();
  const featured = useFeaturedProjects();
  const [first, ...rest] = featured;

  return (
    <section className="container-page py-16 sm:py-20" aria-labelledby="featured-title">
      <Reveal>
        <SectionHeading
          id="featured-title"
          label={t.home.featuredLabel}
          title={t.home.featuredTitle}
          subtitle={t.home.featuredSubtitle}
        />
      </Reveal>

      {first && (
        <Reveal>
          <FeaturedProjectCard project={first} />
        </Reveal>
      )}

      {rest.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delayMs={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="mt-10 text-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-line-strong hover:bg-elevated"
        >
          {t.home.viewAll} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>
    </section>
  );
}
