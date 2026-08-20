/**
 * Project Detail / Case Study.
 * Structure mirrors the recruiter's question flow:
 * Overview → Background → Problem → Solution → Architecture → My Role →
 * Key Features → Engineering Challenges → Results → Gallery → Repository.
 * Fully localized: data comes from useProject(), copy from useI18n().
 */
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Github,
  MonitorPlay,
} from 'lucide-react';
import { siteConfig } from '../data/site';
import { useI18n } from '../i18n/context';
import { useProject, useProfile, useProjects } from '../i18n/use-content';
import { usePageMeta } from '../lib/seo';
import { asset } from '../lib/utils';
import { useRepoStats } from '../lib/github';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Lightbox } from '../components/ui/Lightbox';
import { MermaidDiagram } from '../components/ui/MermaidDiagram';
import { NotFoundPage } from './NotFoundPage';
import type { GalleryImage } from '../types';

/** Reusable titled section wrapper. */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="border-b border-line pb-2 text-xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useI18n();
  const profile = useProfile();
  const project = useProject(slug);
  const projects = useProjects(); // localized order for prev/next navigation
  const stats = useRepoStats(project?.githubRepo);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const gallery = useMemo<GalleryImage[]>(() => {
    if (!project) return [];
    const images: GalleryImage[] = [
      { src: project.image, alt: project.imageAlt, caption: t.detail.coverCaption },
    ];
    if (project.architecture?.type === 'image' && project.architecture.src) {
      images.push({
        src: project.architecture.src,
        alt: project.architecture.alt ?? 'Architecture diagram',
        caption: project.architecture.caption ?? t.detail.architecture,
      });
    }
    if (project.gallery) images.push(...project.gallery);
    return images;
  }, [project, t]);

  usePageMeta({
    title: project ? `${project.title} · ${profile.name}` : t.seo.notFoundTitle(profile.name),
    description: project?.description ?? 'Project not found',
    path: `/projects/${slug ?? ''}`,
    image: project ? project.image : siteConfig.ogImage,
    author: profile.name,
  });

  if (!project) return <NotFoundPage />;

  // Prev / next navigation follows the localized list order.
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = index > 0 ? projects[index - 1] : undefined;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : undefined;

  return (
    <div className="container-page pb-20 pt-24 sm:pt-28">
      {/* Back */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t.detail.back}
      </Link>

      {/* Header band */}
      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          {project.categories.map((c) => (
            <Badge key={c} tone="accent">
              {t.categories[c]}
            </Badge>
          ))}
          <span className="font-mono text-sm text-ink-muted">{project.year}</span>
          {project.isPlaceholder && <Badge tone="warn">{t.projects.placeholderBadge}</Badge>}
          {stats && (
            <span className="font-mono text-xs text-ink-muted">
              ★ {stats.stars} · ⑂ {stats.forks}
              {stats.language ? ` · ${stats.language}` : ''}
            </span>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.github && (
            <Button href={project.github} size="md">
              <Github className="h-4 w-4" aria-hidden="true" /> {t.projects.github}
            </Button>
          )}
          {project.demo && (
            <Button href={project.demo} variant="secondary">
              <MonitorPlay className="h-4 w-4" aria-hidden="true" /> {t.projects.demo}
            </Button>
          )}
          {project.docs && (
            <Button href={project.docs} variant="secondary">
              <BookOpen className="h-4 w-4" aria-hidden="true" /> {t.projects.docs}
            </Button>
          )}
        </div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_300px]">
        {/* ============ Main column ============ */}
        <div className="min-w-0 space-y-12">
          <Section id="overview" title={t.detail.overview}>
            <p className="text-[15px] leading-relaxed text-ink-soft">{project.longDescription}</p>
          </Section>

          <Section id="background" title={t.detail.background}>
            <p className="text-[15px] leading-relaxed text-ink-soft">{project.background}</p>
          </Section>

          <div className="grid gap-8 md:grid-cols-2">
            <Section id="problem" title={t.detail.problem}>
              <p className="rounded-lg border-l-2 border-amber bg-amber-soft/60 p-4 text-[15px] leading-relaxed text-ink-soft">
                {project.problem}
              </p>
            </Section>
            <Section id="solution" title={t.detail.solution}>
              <p className="rounded-lg border-l-2 border-green bg-green-soft/60 p-4 text-[15px] leading-relaxed text-ink-soft">
                {project.solution}
              </p>
            </Section>
          </div>

          {project.architecture && (
            <Section id="architecture" title={t.detail.architecture}>
              {project.architecture.type === 'image' && project.architecture.src ? (
                <figure className="card overflow-hidden">
                  <img
                    src={asset(project.architecture.src)}
                    alt={project.architecture.alt ?? t.detail.architecture}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-contain"
                  />
                  {project.architecture.caption && (
                    <figcaption className="border-t border-line px-4 py-2 text-center font-mono text-xs text-ink-muted">
                      {project.architecture.caption}
                    </figcaption>
                  )}
                </figure>
              ) : project.architecture.code ? (
                <MermaidDiagram
                  code={project.architecture.code}
                  caption={project.architecture.caption}
                />
              ) : null}
            </Section>
          )}

          <Section id="role" title={t.detail.role}>
            <p className="text-[15px] leading-relaxed text-ink-soft">{project.role}</p>
          </Section>

          <Section id="tech-stack" title={t.detail.techStack}>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </Section>

          <Section id="features" title={t.detail.keyFeatures}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 rounded-lg border border-line bg-surface p-3.5 text-sm text-ink-soft">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </Section>

          {project.challenges && project.challenges.length > 0 && (
            <Section id="challenges" title={t.detail.challenges}>
              <div className="space-y-6">
                {project.challenges.map((c, i) => (
                  <article key={i} className="card p-6">
                    <div className="flex flex-wrap items-center gap-2 border-b border-line pb-3">
                      <span className="font-mono text-sm font-semibold text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-[15px] font-semibold">{c.challenge}</h3>
                    </div>
                    <dl className="mt-4 grid gap-4 md:grid-cols-3">
                      {(
                        [
                          [t.detail.challengeSteps[1], c.analysis, 'text-ink-soft'],
                          [t.detail.challengeSteps[2], c.solution, 'text-ink-soft'],
                          [t.detail.challengeSteps[3], c.result, 'text-green'],
                        ] as const
                      ).map(([step, text, color]) => (
                        <div key={step}>
                          <dt className="font-mono text-xs uppercase tracking-wide text-ink-muted">
                            {step} ↓
                          </dt>
                          <dd className={`mt-1.5 text-sm leading-relaxed ${color}`}>{text}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                ))}
              </div>
            </Section>
          )}

          {project.results && project.results.length > 0 && (
            <Section id="results" title={t.detail.results}>
              <ul className="space-y-2.5">
                {project.results.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {gallery.length > 0 && (
            <Section id="gallery" title={t.detail.screenshots}>
              <div className="grid gap-4 sm:grid-cols-2">
                {gallery.map((image, i) => (
                  <button
                    key={`${image.src}-${i}`}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="group relative overflow-hidden rounded-lg border border-line bg-surface"
                    aria-label={`${t.detail.openGallery}: ${image.alt}`}
                  >
                    <img
                      src={asset(image.src)}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={533}
                      className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-52"
                    />
                    <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <span className="font-mono text-xs text-white">{image.caption ?? image.alt}</span>
                    </span>
                  </button>
                ))}
              </div>
            </Section>
          )}

          {project.github && (
            <section id="repository" aria-labelledby="repository-title">
              <div className="card flex flex-col items-start gap-4 bg-code p-6 text-code-ink sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <h2 id="repository-title" className="flex items-center gap-2 text-lg font-semibold">
                    <Github className="h-5 w-5" aria-hidden="true" />
                    {t.detail.repository}
                  </h2>
                  <p className="mt-1.5 font-mono text-sm text-code-ink/70">{project.github}</p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
                >
                  {t.detail.repositoryCta} <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </section>
          )}

          {/* Prev / next navigation */}
          <nav className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between" aria-label="Project navigation">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                <span>
                  <span className="block font-mono text-xs">{t.detail.prevProject}</span>
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {nextProject && (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group inline-flex items-center gap-2 text-right text-sm text-ink-muted transition-colors hover:text-ink sm:ml-auto"
              >
                <span>
                  <span className="block font-mono text-xs">{t.detail.nextProject}</span>
                  {nextProject.title}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            )}
          </nav>
        </div>

        {/* ============ Sidebar: quick facts ============ */}
        <aside className="hidden lg:block" aria-label={t.detail.quickFacts}>
          <div className="sticky top-24 space-y-6">
            <div className="card p-5">
              <h2 className="border-b border-line pb-3 font-mono text-sm font-medium">
                {t.detail.quickFacts}
              </h2>
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="font-mono text-xs text-ink-muted">{t.detail.roleFact}</dt>
                  <dd className="mt-0.5 text-ink-soft">{project.role}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink-muted">{t.detail.yearFact}</dt>
                  <dd className="mt-0.5">{project.year}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink-muted">{t.detail.categoryFact}</dt>
                  <dd className="mt-0.5 flex flex-wrap gap-1.5">
                    {project.categories.map((c) => (
                      <Badge key={c} tone="accent">
                        {t.categories[c]}
                      </Badge>
                    ))}
                  </dd>
                </div>
                {project.status && (
                  <div>
                    <dt className="font-mono text-xs text-ink-muted">{t.detail.statusFact}</dt>
                    <dd className="mt-0.5 text-ink-soft">{t.projects[project.status]}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-mono text-xs text-ink-muted">{t.detail.stackFact}</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card p-5">
              <h2 className="font-mono text-sm font-medium">{t.detail.repository}</h2>
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  <Github className="h-4 w-4" aria-hidden="true" /> {t.projects.github} ↗
                </a>
              ) : (
                <p className="mt-3 text-sm text-ink-muted">{t.detail.repoComingSoon}</p>
              )}
            </div>
          </div>
        </aside>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
