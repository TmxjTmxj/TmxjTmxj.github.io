/** Home contact CTA - one strong ask, mailto primary, socials secondary. */
import { Github, Linkedin, Mail } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { useProfile } from '../../i18n/use-content';
import { Reveal } from '../ui/Reveal';

export function ContactSection() {
  const { t } = useI18n();
  const profile = useProfile();

  return (
    <section className="border-t border-line bg-surface" aria-labelledby="contact-cta-title">
      <div className="container-page py-16 text-center sm:py-20">
        <Reveal>
          <p className="section-label mb-2 justify-center">{t.home.contactLabel}</p>          <h2 id="contact-cta-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t.contact.subtitle}
          </h2>
          <p className="mt-3 text-lg font-medium text-accent">{t.contact.cta}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-line-strong hover:bg-elevated"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-line-strong hover:bg-elevated"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
            )}
          </div>
          <p className="mt-6 font-mono text-xs text-ink-muted">{t.contact.responseNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
