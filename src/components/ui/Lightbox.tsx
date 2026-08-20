/**
 * Accessible image lightbox: Esc to close, ←/→ to navigate,
 * click on backdrop to close, focus returns to the trigger.
 */
import { useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { asset } from '../../lib/utils';
import { useI18n } from '../../i18n/context';
import type { GalleryImage } from '../../types';

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = images[index];
  const { t } = useI18n();

  const prev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate],
  );
  const next = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute right-4 top-4 rounded-md bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label={t.lightbox.close}
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-md bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-6"
            aria-label={t.lightbox.prev}
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-6"
            aria-label={t.lightbox.next}
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </>
      )}

      <figure
        className="flex max-h-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={asset(image.src)}
          alt={image.alt}
          className="max-h-[78vh] max-w-full rounded-lg object-contain"
        />
        <figcaption className="mt-4 flex items-center gap-3 text-sm text-white/90">
          {image.caption && <span>{image.caption}</span>}
          {images.length > 1 && (
            <span className="font-mono text-white/60">
              {index + 1} / {images.length}
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
