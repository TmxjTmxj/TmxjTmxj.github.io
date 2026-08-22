/**
 * Typewriter effect for the hero terminal.
 * ---------------------------------------------------------------
 * - Respects prefers-reduced-motion (all lines render instantly).
 * - Restarts the sequence ONLY when the lines CONTENT changes
 *   (language switch). The reset is driven by a stable content key
 *   (`lines.join(...)`) instead of the array reference, so passing a
 *   fresh array every render can NEVER cause a reset -> render loop
 *   (that was the source of a main-thread freeze).
 */
import { useEffect, useState } from 'react';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useTypewriter(lines: string[], speed = 28): string[] {
  const [typed, setTyped] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Stable identity of the lines content - unchanged across renders when
  // the copy is the same, so this effect runs once per content change.
  const linesKey = lines.join('\u0000');

  // Restart typing on content change (language switch) only.
  useEffect(() => {
    setTyped([]);
    setLineIndex(0);
    setCharIndex(0);
  }, [linesKey]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTyped(lines);
      return;
    }
    if (lineIndex >= lines.length) return;

    // `lines` is read from this render's closure; the effect re-runs exactly
    // when `linesKey` (content) changes, so the captured lines match.
    const line = lines[lineIndex];
    const timer = window.setTimeout(
      () => {
        if (charIndex < line.length) {
          setCharIndex(charIndex + 1);
        } else {
          setTyped((prev) => [...prev, line.slice(0, charIndex)]);
          setLineIndex(lineIndex + 1);
          setCharIndex(0);
        }
      },
      charIndex === 0 ? speed * 6 : speed,
    );
    return () => window.clearTimeout(timer);
  }, [linesKey, lineIndex, charIndex, speed]);

  const current = lineIndex < lines.length ? lines[lineIndex].slice(0, charIndex) : null;
  return current === null ? typed : [...typed, current];
}
