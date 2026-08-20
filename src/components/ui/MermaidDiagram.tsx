/**
 * Mermaid diagrams, lazy-loaded: the ~1MB library is split into its own
 * chunk and only fetched on project detail pages that need it. On failure
 * the source falls back to a readable <pre> block.
 */
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../i18n/context';

export function MermaidDiagram({ code, caption }: { code: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [svg, setSvg] = useState('');
  const { t } = useI18n();

  useEffect(() => {
    let cancelled = false;
    const dark = document.documentElement.classList.contains('dark');

    (async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: dark ? 'dark' : 'neutral',
          themeVariables: dark
            ? { background: '#161b22', primaryColor: '#1c2128', primaryTextColor: '#e6edf3', lineColor: '#4493f8' }
            : { background: '#ffffff', primaryColor: '#f6f8fa', primaryTextColor: '#1f2328', lineColor: '#0969da' },
          securityLevel: 'strict',
          fontFamily: 'JetBrains Mono, monospace',
        });
        const { svg: rendered } = await mermaid.render('mermaid-diagram', code);
        if (!cancelled) {
          setSvg(rendered);
          setState('ready');
        }
      } catch {
        if (!cancelled) setState('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code]);

  return (
    <figure className="card overflow-hidden">
      <div className="flex min-h-[240px] items-center justify-center p-4">
        {state === 'loading' && (
          <p className="font-mono text-sm text-ink-muted" role="status">
            Loading diagram…
          </p>
        )}
        {state === 'error' && (
          <pre className="max-w-full overflow-x-auto p-4 text-xs text-ink-muted">
            <code>{code}</code>
          </pre>
        )}
        {state === 'ready' && (
          <div ref={ref} dangerouslySetInnerHTML={{ __html: svg }} className="max-w-full overflow-x-auto" />
        )}
      </div>
      {state === 'ready' && (
        <figcaption className="border-t border-line px-4 py-2 text-center font-mono text-xs text-ink-muted">
          {caption ?? t.detail.architectureCaption}
        </figcaption>
      )}
    </figure>
  );
}
