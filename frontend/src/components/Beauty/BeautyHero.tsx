'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const FRAME_COUNT = 22;
const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/videos/beauty-vera/f${String(i + 1).padStart(2, '0')}.webp`,
);

export default function BeautyHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    FRAMES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    if (media.matches) return;

    let raf = 0;
    let shown = 0;
    let lastIndex = 0;

    const applyChrome = (progress: number) => {
      const logoOpacity = Math.max(0, 1 - progress / 0.1);
      const hintOpacity = Math.max(0, 1 - progress * 1.6);
      const veil = 0.28 + logoOpacity * 0.42;
      if (logoRef.current) {
        logoRef.current.style.opacity = String(logoOpacity);
        logoRef.current.style.pointerEvents = logoOpacity < 0.05 ? 'none' : 'auto';
      }
      if (hintRef.current) hintRef.current.style.opacity = String(hintOpacity);
      if (veilRef.current) veilRef.current.style.opacity = String(veil);
    };

    const tick = () => {
      const track = trackRef.current;
      if (track) {
        const total = track.offsetHeight - window.innerHeight;
        const raw = total <= 0 ? 1 : Math.min(1, Math.max(0, -track.getBoundingClientRect().top / total));
        shown += (raw - shown) * 0.18;
        if (Math.abs(raw - shown) < 0.0008) shown = raw;
        applyChrome(shown);

        const index = Math.min(FRAME_COUNT - 1, Math.round(shown * (FRAME_COUNT - 1)));
        if (frameRef.current && index !== lastIndex) {
          lastIndex = index;
          frameRef.current.src = FRAMES[index];
        }
      }
      raf = requestAnimationFrame(tick);
    };

    applyChrome(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const logoOpacity = 1;
  const hintOpacity = reduceMotion ? 0.7 : 1;
  const veil = reduceMotion ? 0.28 : 0.7;

  return (
    <div ref={trackRef} className="relative h-[320vh]">
      <section className="sticky top-0 h-[100dvh] overflow-hidden bg-black">
        <h1 className="sr-only">Beauty</h1>
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={frameRef}
            src={FRAMES[0]}
            alt=""
            width={540}
            height={960}
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div ref={veilRef} className="absolute inset-0 bg-black" style={{ opacity: veil }} />
        </div>
        <div
          ref={logoRef}
          className="absolute left-1/2 top-1/2 z-10 w-[min(86vw,32rem)] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: logoOpacity }}
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
          ref={hintRef}
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
