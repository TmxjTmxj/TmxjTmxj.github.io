/** Contact - direct mailto CTA + professional contact cards. No backend form. */
import { FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { copy, siteConfig } from '../data/site';
import { profile } from '../data/profile';
import { asset } from '../lib/utils';
import { usePageMeta } from '../lib/seo';
import { Reveal } from '../components/ui/Reveal';

export function ContactPage() {
  usePageMeta({
    title: `Contact · ${siteConfig.author}`,
    description: `Contact ${profile.name}: email, GitHub, LinkedIn and location.`,
    path: '/contact',
    image: siteConfig.ogImage,
  });

  const cards = [
    {
      icon: Mail,
      label: copy.contact.email,
      value: profile.email,
      href: `mailto:${profile.email}`,
      aria: copy.contact.openEmail,
    },
    {
      icon: Github,
      label: copy.contact.github,
      value: profile.github.replace(/^https?:\/\//, ''),
      href: profile.github,
      aria: copy.contact.openGithub,
    },
    {
      icon: Linkedin,
      label: copy.contact.linkedin,
      value: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: profile.linkedin,
      aria: copy.contact.openLinkedin,
    },
    {
      icon: MapPin,
      label: copy.contact.location,
      value: profile.location,
      href: undefined,
      aria: undefined,
    },
    {
      icon: FileText,
      label: copy.contact.resume,
      value: 'resume.pdf',
      href: asset(profile.resumeUrl),
      aria: 'Open resume PDF',
    },
  ];

  return (
    <div className="container-page pb-20 pt-28 sm:pt-32">
      <Reveal>
        <header className="mx-auto max-w-2xl text-center">
          <p className="section-label mb-2 justify-center">contact</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.contact.subtitle}</h1>
          <p className="mt-3 text-lg font-medium text-accent">{copy.contact.cta}</p>
        </header>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
        {cards.map((card, i) => {
          const Icon = card.icon;
          const inner = (
            <>
              <span className="rounded-md bg-accent-soft p-2.5 text-accent">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-wide text-ink-muted">{card.label}</p>
                <p className="mt-1 truncate text-[15px] font-medium text-ink">{card.value}</p>
              </div>
            </>
          );
          const classes =
            'card card-hover flex items-center gap-4 p-5 text-left w-full';
          return (
            <Reveal key={card.label} delayMs={i * 60}>
              {card.href ? (
                <a
                  href={card.href}
                  className={classes}
                  aria-label={card.aria}
                  {...(card.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : card.href.endsWith('.pdf')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                >
                  {inner}
                </a>
              ) : (
                <div className={classes}>{inner}</div>
              )}
            </Reveal>
          );
        })}
      </div>

      <Reveal delayMs={200}>
        <p className="mt-10 text-center font-mono text-xs text-ink-muted">
          {copy.contact.responseNote}
        </p>
      </Reveal>
    </div>
  );
}
