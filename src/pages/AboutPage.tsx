/** About - recruiter-friendly: no long biography, scannable sections. */
import { Compass, FileText, Target } from 'lucide-react';
import { siteConfig } from '../data/site';
import { useI18n } from '../i18n/context';
import { useProfile } from '../i18n/use-content';
import { usePageMeta } from '../lib/seo';
import { asset } from '../lib/utils';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';

export function AboutPage() {
  const { t } = useI18n();
  const profile = useProfile();

  usePageMeta({
    title: t.seo.aboutTitle(profile.name),
    description: profile.description,
    path: '/about',
    image: siteConfig.ogImage,
    author: profile.name,
  });

  return (
    <div className="container-page pb-20 pt-28 sm:pt-32">
      <header className="grid items-center gap-10 lg:grid-cols-[0.3fr_1fr]">
        <Reveal>
          <img
            src={asset(profile.avatar)}
            alt={t.about.avatarAlt(profile.name)}
            loading="lazy"
            width={320}
            height={320}
            className="mx-auto w-40 rounded-full border border-line shadow-card sm:w-52"
          />
        </Reveal>
        <Reveal delayMs={80}>
          <p className="section-label mb-2">{t.section.about}</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.about.title}</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{t.about.intro}</p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{profile.description}</p>
        </Reveal>
      </header>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <Reveal>
          <div className="card card-hover h-full p-6">
            <span className="rounded-md bg-accent-soft p-2.5 text-accent">
              <Compass className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-bold tracking-tight">{t.about.interestsTitle}</h2>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {profile.interests.map((interest) => (
                <li key={interest}>
                  <Badge tone="accent">{interest}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="card card-hover h-full p-6">
            <span className="rounded-md bg-accent-soft p-2.5 text-accent">
              <Target className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-bold tracking-tight">{t.about.workingTitle}</h2>
            <ul className="mt-4 space-y-2.5">
              {profile.workingOn.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delayMs={160}>
          <div className="card card-hover h-full p-6">
            <span className="rounded-md bg-accent-soft p-2.5 text-accent">
              <FileText className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-bold tracking-tight">{t.about.lookingTitle}</h2>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {profile.lookingFor.map((role) => (
                <li key={role}>
                  <Badge>{role}</Badge>
                </li>
              ))}
            </ul>
            <Button to="/resume" variant="secondary" size="sm" className="mt-5">
              {t.about.resumeCta}
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
