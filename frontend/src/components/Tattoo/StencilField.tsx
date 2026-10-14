'use client';

import Image from 'next/image';
import { useEffect, useState, type CSSProperties } from 'react';

const PIECES = [
  { id: 0, src: '/images/stencils/stencil-skull.webp', tone: 'dark', width: 30, left: -5, top: 3, rotate: -11 },
  { id: 1, src: '/images/stencils/stencil-birds.webp', tone: 'light', width: 24, left: 72, top: 4, rotate: 10 },
  { id: 2, src: '/images/stencils/stencil-constellation.webp', tone: 'dark', width: 26, left: 16, top: 8, rotate: -4 },
  { id: 3, src: '/images/stencils/stencil-roses.webp', tone: 'light', width: 22, left: 58, top: 10, rotate: 8 },
  { id: 4, src: '/images/stencils/stencil-greek-column.webp', tone: 'dark', width: 16, left: 5, top: 24, rotate: -6 },
  { id: 5, src: '/images/stencils/stencil-cat.webp', tone: 'light', width: 20, left: 76, top: 22, rotate: 7 },
  { id: 6, src: '/images/stencils/stencil-snake-lotus.webp', tone: 'dark', width: 26, left: 18, top: 38, rotate: 9 },
  { id: 7, src: '/images/stencils/stencil-greek-bust.webp', tone: 'light', width: 18, left: 78, top: 40, rotate: -5 },
  { id: 8, src: '/images/stencils/stencil-rose-dagger.webp', tone: 'dark', width: 24, left: -2, top: 52, rotate: 12 },
  { id: 9, src: '/images/stencils/stencil-swallow-moth.webp', tone: 'light', width: 22, left: 62, top: 54, rotate: -9 },
  { id: 10, src: '/images/stencils/stencil-greek-statue.webp', tone: 'dark', width: 22, left: 8, top: 68, rotate: -7 },
  { id: 11, src: '/images/stencils/stencil-viking-ship.webp', tone: 'dark', width: 32, left: -4, top: 78, rotate: -6 },
  { id: 13, src: '/images/stencils/stencil-viking.webp', tone: 'dark', width: 18, left: 80, top: 66, rotate: 6 },
  { id: 14, src: '/images/stencils/stencil-viking-ship-2.webp', tone: 'light', width: 30, left: 12, top: 58, rotate: 7 },
  { id: 15, src: '/images/stencils/stencil-skull.webp', tone: 'light', width: 22, left: 70, top: 72, rotate: 9 },
  { id: 16, src: '/images/stencils/stencil-roses.webp', tone: 'dark', width: 20, left: 30, top: 62, rotate: 10 },
  { id: 17, src: '/images/stencils/stencil-birds.webp', tone: 'dark', width: 22, left: 74, top: 82, rotate: -6 },
  { id: 18, src: '/images/stencils/stencil-constellation.webp', tone: 'light', width: 24, left: 40, top: 74, rotate: 3 },
  { id: 19, src: '/images/stencils/stencil-cat.webp', tone: 'dark', width: 18, left: 22, top: 80, rotate: 8 },
] as const;

export default function StencilField() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const apply = () => setActive(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-visible" aria-hidden>
      {PIECES.map((piece) => (
        <div
          key={piece.id}
          className="stencil-floater"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            width: `${piece.width}vw`,
            maxWidth: '300px',
            '--rot': `${piece.rotate}deg`,
            '--drift': `${14 + (piece.id % 5) * 1.8}s`,
            animationDelay: `${piece.id * -1.8}s`,
          } as CSSProperties}
        >
          <div className={`stencil-piece stencil-piece-${piece.tone}`}>
            <Image
              src={piece.src}
              alt=""
              width={420}
              height={420}
              unoptimized
              className="h-auto w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
