'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const VIDEO_SRC = '/videos/beauty-vera.mp4?v=2';

export default function BeautyHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    if (media.matches) return;

    const video = videoRef.current;
    let raf = 0;
    let shown = 0;
    let seeking = false;

    const onSeeked = () => {
      seeking = false;
    };
    video?.addEventListener('seeked', onSeeked);

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
        shown += (raw - shown) * 0.16;
        if (Math.abs(raw - shown) < 0.0008) shown = raw;
        applyChrome(shown);

        if (video && Number.isFinite(video.duration) && video.duration > 0 && !seeking) {
          const target = shown * video.duration * 0.985;
          if (Math.abs(video.currentTime - target) > 1 / 45) {
            seeking = true;
            video.currentTime = target;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    applyChrome(0);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      video?.removeEventListener('seeked', onSeeked);
    };
  }, [reduceMotion]);

  const logoOpacity = reduceMotion ? 1 : 1;
  const hintOpacity = reduceMotion ? 0.7 : 1;
  const veil = reduceMotion ? 0.28 : 0.7;

  return (
    <div ref={trackRef} className="relative h-[320vh]">
      <section className="sticky top-0 h-[100dvh] overflow-hidden bg-black">
        <h1 className="sr-only">Beauty</h1>
        <div className="absolute inset-0">
          {hasVideo && (
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              poster="/videos/beauty-vera-poster.jpg"
              muted
              playsInline
              preload="auto"
              onError={() => setHasVideo(false)}
              className="h-full w-full object-cover"
            />
          )}
          {!hasVideo && (
            <Image
              src="/images/employees/vera-ferreira.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
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
