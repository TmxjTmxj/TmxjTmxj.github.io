/** Home About preview - short pitch + interests + looking-for keywords. */
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { useProfile } from '../../i18n/use-content';
import { asset } from '../../lib/utils';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Badge } from '../ui/Badge';

export function AboutPreview() {
  const { t } = useI18n();
  const profile = useProfile();

  return (
    <section className="container-page py-16 sm:py-20" aria-labelledby="about-preview-title">
      <div className="grid items-center gap-10 lg:grid-cols-[0.35fr_1fr]">
        <Reveal>
          <img
            src={asset(profile.avatar)}
            alt={t.about.avatarAlt(profile.name)}
            loading="lazy"
            width={320}
            height={320}
            className="mx-auto w-44 rounded-full border border-line shadow-card sm:w-56 lg:w-64"
          />
        </Reveal>
        <Reveal delayMs={80}>
          <SectionHeading id="about-preview-title" index="05" label={t.home.aboutLabel} title={t.home.aboutTitle} />
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            {profile.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {profile.interests.map((interest) => (
              <Badge key={interest} tone="accent">
                {interest}
              </Badge>
            ))}
          </div>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {t.home.viewAll} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
