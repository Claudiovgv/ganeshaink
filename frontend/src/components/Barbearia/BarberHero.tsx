'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ClipperAssemble from './ClipperAssemble';

export default function BarberHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    if (media.matches) {
      setProgress(1);
      return;
    }

    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const total = track.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(1);
        return;
      }
      setProgress(Math.min(1, Math.max(0, -track.getBoundingClientRect().top / total)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const assemble = reduceMotion ? 1 : Math.min(1, progress / 0.72);
  const logoOpacity = reduceMotion ? 1 : Math.max(0, 1 - progress / 0.1);
  const hintOpacity = reduceMotion ? 0.7 : Math.max(0, 1 - progress * 1.6);

  return (
    <div ref={trackRef} className="relative h-[240vh]">
      <section className="sticky top-0 h-[100dvh] overflow-hidden bg-black">
        <h1 className="sr-only">Barbearia</h1>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] flex h-full justify-center"
          aria-hidden
        >
          <div className="h-full w-[min(78vw,22rem)] md:w-[min(52vw,18rem)]">
            <ClipperAssemble progress={assemble} />
          </div>
        </div>
        <div
          className="absolute left-1/2 top-1/2 z-10 w-[min(86vw,32rem)] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: logoOpacity, pointerEvents: logoOpacity < 0.05 ? 'none' : 'auto' }}
        >
          <Image
            src="/images/logo/ganesha-logo-gold-white.webp"
            alt="Ganesha Ink"
            width={720}
            height={360}
            priority
            className="h-auto w-full object-contain drop-shadow-[0_0_24px_rgba(201,168,76,0.24)]"
          />
        </div>
        <div
          className="pointer-events-none absolute bottom-[5.75rem] left-1/2 z-20 -translate-x-1/2 md:bottom-10"
          style={{ opacity: hintOpacity }}
          aria-hidden
        >
          <svg viewBox="0 0 48 72" className="h-14 w-10 text-gold md:h-16 md:w-11" fill="none">
            <path d="M24 6v44" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path
              d="M10 36 24 54 38 36"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
