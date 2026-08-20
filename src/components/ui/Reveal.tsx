/**
 * Scroll-reveal wrapper. Adds `.revealed` when the element enters the
 * viewport; CSS in theme.css animates opacity/translate and fully disables
 * the effect under prefers-reduced-motion.
 */
import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export function Reveal({
  children,
  delayMs = 0,
  className,
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browsers) -> show immediately.
    if (!('IntersectionObserver' in window)) {
      el.classList.add('revealed');
      return;
    }

    // Safety net: content must never stay hidden, even if the observer
    // never fires (capture tools, odd scroll restores, iframe edge cases).
    const fallback = window.setTimeout(() => el.classList.add('revealed'), 2500);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('revealed');
            io.disconnect();
            window.clearTimeout(fallback);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn('reveal', className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
