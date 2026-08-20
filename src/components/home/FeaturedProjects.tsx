/**
 * Home "Featured Projects" section: the top featured project as a large
 * card, the rest in a 2-column grid, plus a "view all" link.
 */
import { ArrowRight } from 'lucide-react';
import { copy } from '../../data/site';
import { featuredProjects } from '../../data/projects';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { FeaturedProjectCard } from '../projects/FeaturedProjectCard';
import { ProjectCard } from '../projects/ProjectCard';
import { Link } from 'react-router-dom';

export function FeaturedProjects() {
  const [first, ...rest] = featuredProjects;

  return (
    <section className="container-page py-16 sm:py-20" aria-labelledby="featured-title">
      <Reveal>
        <SectionHeading
          id="featured-title"
          label="featured-projects"
          title={copy.home.featuredTitle}
          subtitle={copy.home.featuredSubtitle}
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
          {copy.home.viewAll} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>
    </section>
  );
}
