/**
 * Hero - the 20-second pitch, blueprint aesthetic + live AgentNet.
 * Animated connection network, gradient role line, spec chips, terminal.
 */
import { ArrowRight, Github, MapPin } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { useProfile } from '../../i18n/use-content';
import { Button } from '../ui/Button';
import { Terminal } from './Terminal';
import { AgentNet } from './AgentNet';

export function Hero() {
  const { t } = useI18n();
  const profile = useProfile();

  return (
    <section className="relative overflow-hidden border-b border-line" aria-labelledby="hero-title">
      {/* Layered backdrop: blueprint grid + animated connection network */}
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-72 bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <AgentNet />

      {/* corner register marks */}
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <span className="absolute left-5 top-20 h-4 w-4 border-l border-t border-line-strong" />
        <span className="absolute right-5 top-20 h-4 w-4 border-r border-t border-line-strong" />
        <span className="absolute bottom-5 left-5 h-4 w-4 border-b border-l border-line-strong" />
        <span className="absolute bottom-5 right-5 h-4 w-4 border-b border-r border-line-strong" />
      </div>

      <div className="container-page relative grid items-center gap-12 pb-16 pt-28 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="spec-index">01</span>
            <p className="section-label">{t.hero.greeting}</p>
          </div>

          <h1
            id="hero-title"
            className="heading-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </h1>

          <p className="text-gradient mt-5 font-mono text-base font-semibold sm:text-xl">
            {profile.title}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button to="/projects" size="lg">
              {t.hero.ctaProjects} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href={profile.resumeUrl} variant="secondary" size="lg">
              {t.hero.ctaResume}
            </Button>
            <Button href={profile.github} variant="ghost" size="lg" ariaLabel={t.hero.ctaGithub}>
              <Github className="h-4.5 w-4.5" aria-hidden="true" />
              {t.hero.ctaGithub}
            </Button>
          </div>

          {/* Spec row: availability + location */}
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
              </span>
              {profile.availability}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.location}
            </span>
          </div>

          {/* mono annotation */}
          <p className="mt-10 hidden font-mono text-[11px] tracking-wide text-ink-muted lg:block">
            {profile.handle}@portfolio · rev.2026
            <span className="ml-2 text-ink-muted/70">spec ./intelligent-systems</span>
          </p>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
