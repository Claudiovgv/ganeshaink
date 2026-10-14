import Image from 'next/image';
import type { CSSProperties } from 'react';

const HERO = [
  { src: '/images/stencils/stencil-skull.png', tone: 'light', w: 36, left: -10, top: 2, rot: -14 },
  { src: '/images/stencils/stencil-roses.png', tone: 'dark', w: 28, left: 72, top: 11, rot: 16 },
  { src: '/images/stencils/stencil-birds.png', tone: 'light', w: 30, left: 58, top: 0, rot: 8 },
  { src: '/images/stencils/stencil-cat.png', tone: 'dark', w: 26, left: -4, top: 22, rot: -9 },
  { src: '/images/stencils/stencil-greek-column.png', tone: 'light', w: 16, left: 82, top: 32, rot: 4 },
  { src: '/images/stencils/stencil-constellation.png', tone: 'dark', w: 32, left: -8, top: 48, rot: 11 },
  { src: '/images/stencils/stencil-snake-lotus.png', tone: 'light', w: 28, left: 70, top: 58, rot: -6 },
  { src: '/images/stencils/stencil-rose-dagger.png', tone: 'dark', w: 24, left: 8, top: 70, rot: 13 },
  { src: '/images/stencils/stencil-greek-bust.png', tone: 'light', w: 22, left: 78, top: 74, rot: -11 },
  { src: '/images/stencils/stencil-swallow-moth.png', tone: 'dark', w: 26, left: 40, top: 78, rot: 5 },
] as const;

export default function MobileHeroStencils() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden md:hidden" aria-hidden>
      {HERO.map((piece, id) => (
        <div
          key={id}
          className="stencil-floater"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            width: `${piece.w}vw`,
            maxWidth: '9.5rem',
            '--rot': `${piece.rot}deg`,
            '--drift': `${12 + (id % 4) * 1.5}s`,
            animationDelay: `${id * -1.2}s`,
          } as CSSProperties}
        >
          <div className={`stencil-piece stencil-piece-${piece.tone}`}>
            <Image
              src={piece.src}
              alt=""
              width={360}
              height={360}
              unoptimized
              className="h-auto w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
