/** Hero terminal - typed `$ command` lines, READY status, blinking cursor. */
import { useTypewriter } from '../../hooks/useTypewriter';
import { useI18n } from '../../i18n/context';
import { useProfile } from '../../i18n/use-content';

export function Terminal() {
  const { t } = useI18n();
  const profile = useProfile();
  const lines: string[] = [...t.terminal.lines];
  const typed = useTypewriter(lines);

  return (
    <div className="terminal-shell" aria-label="Interactive terminal" role="region">
      {/* Title bar */}
      <div className="terminal-bar">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f85149]/90" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d29922]/90" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3fb950]/90" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-code-ink/80">
          {profile.handle}@portfolio: ~/intelligent-systems
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-code-ink/60">
          <span className="ready-dot inline-block h-1.5 w-1.5 rounded-full bg-[#3fb950]" aria-hidden="true" />
          READY
        </span>
      </div>

      {/* Body */}
      <div className="terminal-body">
        <p aria-hidden="true" className="text-code-ink/80">
          # {profile.availability}
        </p>
        {typed.map((line, i) => {
          const isCommand = i % 2 === 0;
          return (
            <p key={i} className={isCommand ? 'mt-3' : ''}>
              {isCommand && <span className="text-green">$ </span>}
              <span className={isCommand ? 'text-code-ink' : 'text-code-ink/80'}>{line}</span>
            </p>
          );
        })}
        <p className="cursor-blink mt-3" aria-hidden="true" />
      </div>
    </div>
  );
}
