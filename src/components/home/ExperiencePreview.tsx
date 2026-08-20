/** Home preview of the experience timeline - latest two entries + link. */
import { Link } from 'react-router-dom';
import { ArrowRight, Building2 } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { useExperiences } from '../../i18n/use-content';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Badge } from '../ui/Badge';

export function ExperiencePreview() {
  const { t } = useI18n();
  const latest = useExperiences().slice(0, 2);

  return (
    <section className="border-t border-line bg-surface" aria-labelledby="exp-preview-title">
      <div className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            id="exp-preview-title"
            label={t.home.experienceLabel}
            title={t.home.experienceTitle}
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {latest.map((item, i) => (
            <Reveal key={`${item.org}-${item.role}`} delayMs={i * 80}>
              <article className="card card-hover h-full p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-md bg-accent-soft p-2 text-accent">
                      <Building2 className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{item.org}</h3>
                      <p className="text-sm text-ink-soft">{item.role}</p>
                    </div>
                  </div>
                  <Badge>{item.type}</Badge>
                </div>
                <p className="mt-3 font-mono text-xs text-ink-muted">{item.period}</p>
                <p className="clamp-3 mt-3 text-sm leading-relaxed text-ink-muted">
                  {item.summary}
                </p>
                <Link
                  to="/experience"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  {t.home.viewAll} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
