/** Resume page - prominent View/Download CTAs for public/resume/resume.pdf. */
import { Download, Eye, Info } from 'lucide-react';
import { copy, siteConfig } from '../data/site';
import { profile } from '../data/profile';
import { asset } from '../lib/utils';
import { usePageMeta } from '../lib/seo';
import { Reveal } from '../components/ui/Reveal';

export function ResumePage() {
  usePageMeta({
    title: `Resume · ${siteConfig.author}`,
    description: `Resume of ${profile.name} - ${profile.title}.`,
    path: '/resume',
    image: siteConfig.ogImage,
  });

  return (
    <div className="container-page pb-20 pt-28 sm:pt-32">
      <Reveal>
        <div className="card overflow-hidden">
          <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="section-label mb-2">resume</p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.resume.title}</h1>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
                {copy.resume.subtitle}
              </p>
              <p className="mt-5 font-mono text-sm text-ink-soft">
                {copy.resume.updated} <span className="text-accent">{profile.resumeUpdated}</span>
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={asset(profile.resumeUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
                >
                  <Eye className="h-4 w-4" aria-hidden="true" /> {copy.resume.view}
                </a>
                <a
                  href={asset(profile.resumeUrl)}
                  download
                  className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-line-strong hover:bg-elevated"
                >
                  <Download className="h-4 w-4" aria-hidden="true" /> {copy.resume.download}
                </a>
              </div>
            </div>

            {/* File card */}
            <div className="flex flex-col items-center gap-3 rounded-lg border border-line bg-surface p-8 shadow-card" aria-hidden="true">
              <div className="rounded-lg border-2 border-accent px-6 py-8 text-center">
                <span className="block text-2xl font-bold text-accent">PDF</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  resume.pdf
                </span>
              </div>
              <p className="font-mono text-xs text-ink-muted">{profile.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-t border-line bg-surface px-8 py-5 sm:px-12">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-semibold">{copy.resume.tipTitle}</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{copy.resume.tip}</p>
              <code className="mt-2 inline-block rounded-md bg-elevated px-2.5 py-1 font-mono text-xs text-ink-soft">
                public/resume/resume.pdf
              </code>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
