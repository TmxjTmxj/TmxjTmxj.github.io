/**
 * AgentNet - a subtle canvas "agent connection network" for the hero.
 * ---------------------------------------------------------------
 * Decorative only (aria-hidden, pointer-events-none). Lightweight:
 * ~26 nodes, low-opacity lines, pauses when offscreen or the tab is
 * hidden, honors prefers-reduced-motion (renders a single static frame).
 */
import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function readVar(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '').slice(0, 6);
  if (h.length !== 6) return [96, 120, 220];
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const LINK_DIST = 150;
const NODE_COUNT = 26;

export function AgentNet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;
    const motion = !prefersReducedMotion();
    let [ar, ag, ab] = hexToRgb(readVar('--color-accent', '#0a5fc0'));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      const rng = (n: number) => (Math.sin(n * 7.31) + 1) / 2;
      nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
        const a = rng(i) * Math.PI * 2;
        const speed = 0.12 + rng(i + 1) * 0.18;
        return {
          x: rng(i + 2) * width,
          y: rng(i + 3) * height,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          r: 1.4 + rng(i + 4) * 1.6,
        };
      });
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.16;
            ctx.strokeStyle = `rgba(${ar},${ag},${ab},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = `rgba(${ar},${ag},${ab},0.5)`;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;
      }
      drawFrame();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(step);
    };

    resize();
    seed();
    if (motion) {
      running = true;
      start();
    } else {
      drawFrame();
    }

    // Pause when the hero scrolls out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && motion) {
          if (!running) {
            running = true;
            start();
          }
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    // Pause when the tab is hidden.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (motion && !running) {
        running = true;
        start();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Keep accent colors in sync with the theme.
    const ro = new MutationObserver(() => {
      [ar, ag, ab] = hexToRgb(readVar('--color-accent', '#0a5fc0'));
    });
    ro.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const onResize = () => {
      resize();
      seed();
      if (motion && running) start();
      else drawFrame();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  );
}
