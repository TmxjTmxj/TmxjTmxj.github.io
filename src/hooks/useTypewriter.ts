/**
 * Typewriter effect for the hero terminal.
 * Respects prefers-reduced-motion: all lines render instantly.
 */
import { useEffect, useState } from 'react';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useTypewriter(lines: string[], speed = 28): string[] {
  const [typed, setTyped] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTyped(lines);
      return;
    }
    if (lineIndex >= lines.length) return;

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
  }, [lines, lineIndex, charIndex, speed]);

  const current = lineIndex < lines.length ? lines[lineIndex].slice(0, charIndex) : null;
  return current === null ? typed : [...typed, current];
}
