/** Hero terminal - typed `$ command` lines with a blinking cursor. */
import { useTypewriter } from '../../hooks/useTypewriter';
import { copy } from '../../data/site';
import { profile } from '../../data/profile';

export function Terminal() {
  const lines: string[] = [...copy.terminal.lines];
  const typed = useTypewriter(lines);

  return (
    <div
      className="card overflow-hidden rounded-lg border-line bg-code text-code-ink"
      aria-label="Interactive terminal"
      role="region"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-line/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f85149]/90" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d29922]/90" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3fb950]/90" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-code-ink/80">
          {profile.name.toLowerCase().replace(/\s+/g, '-')}@portfolio: ~
        </span>
      </div>

      {/* Body */}
      <div className="min-h-[210px] p-4 font-mono text-[13px] leading-relaxed sm:p-5">
        <p aria-hidden="true" className="text-code-ink/80">
          # {copy.hero.availability}
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
