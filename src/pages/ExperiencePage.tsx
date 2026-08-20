/** Experience timeline - clean vertical line, typed badges, result bullets. */
import { Link } from 'react-router-dom';
import { Briefcase, ExternalLink, FlaskConical, Rocket, Trophy, Users } from 'lucide-react';
import type { ComponentType } from 'react';
import { copy, siteConfig } from '../data/site';
import { experiences } from '../data/experience';
import type { ExperienceType } from '../types';
import { usePageMeta } from '../lib/seo';
import { Badge } from '../components/ui/Badge';
import { Reveal } from '../components/ui/Reveal';

const typeIcons: Record<ExperienceType, ComponentType<{ className?: string }>> = {
  Internship: Briefcase,
  Research: FlaskConical,
  Project: Rocket,
  Organization: Users,
  Competition: Trophy,
};

export function ExperiencePage() {
  usePageMeta({
    title: `Experience · ${siteConfig.author}`,
    description: 'Internships, research, competitions and organizations with concrete responsibilities and results.',
    path: '/experience',
    image: siteConfig.ogImage,
  });

  return (
    <div className="container-page pb-20 pt-28 sm:pt-32">
      <header className="max-w-2xl">
        <p className="section-label mb-2">experience</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.experience.title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{copy.experience.subtitle}</p>
      </header>

      <ol className="relative mt-12 space-y-10 border-l border-line pl-8 sm:pl-10">
        {experiences.map((item, i) => {
          const Icon = typeIcons[item.type];
          return (
            <Reveal key={`${item.org}-${item.role}`} delayMs={i * 60}>
              <li className="relative">
                {/* Timeline dot */}
                <span
                  className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-surface text-accent sm:-left-[49px]"
                  aria-hidden="true"
                >
                  <Icon className="h-3 w-3" />
                </span>

                <article className="card card-hover p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-bold tracking-tight sm:text-xl">{item.org}</h2>
                        {item.isPlaceholder && <Badge tone="warn">{copy.projects.placeholderBadge}</Badge>}
                      </div>
                      <p className="mt-1 text-[15px] text-ink-soft">{item.role}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge tone="accent">{item.type}</Badge>
                      <span className="font-mono text-xs text-ink-muted">{item.period}</span>
                      {item.location && (
                        <span className="font-mono text-xs text-ink-muted">{item.location}</span>
                      )}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{item.summary}</p>

                  <ul className="mt-4 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {item.tech && item.tech.length > 0 && (
                    <div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-line pt-4">
                      <span className="mr-1 font-mono text-xs text-ink-muted">{copy.experience.techLabel}:</span>
                      {item.tech.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  )}

                  {item.link && (
                    <Link
                      to={item.link}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      More details <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </article>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
