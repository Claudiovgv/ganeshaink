import type { CSSProperties, ReactNode } from 'react';

type SvgProps = { className?: string; delay?: number; drawn?: boolean };

function Flash({
  className,
  delay = 0,
  drawn = false,
  viewBox = '0 0 120 120',
  children,
}: SvgProps & { viewBox?: string; children: ReactNode }) {
  return (
    <svg viewBox={viewBox} fill="none" className={className} aria-hidden>
      <g
        className={drawn ? 'flash-stroke-static' : 'flash-stroke'}
        style={{ '--draw-delay': `${delay}ms` } as CSSProperties}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </svg>
  );
}

export function PumpkinFlash({ className, delay, drawn }: SvgProps) {
  return (
    <Flash className={className} delay={delay} drawn={drawn}>
      <path pathLength="1" d="M60 22c2-8 8-14 14-16-2 8-6 14-12 18" />
      <path pathLength="1" d="M28 62c0-16 8-28 18-32 8-4 14-2 14-2s6-2 14 2c10 4 18 16 18 32 0 22-12 36-32 36s-32-14-32-36z" />
      <path pathLength="1" d="M44 36c-6 12-8 28-4 44M60 32c0 16 0 36 0 52M76 36c6 12 8 28 4 44" />
      <path pathLength="1" d="M48 70l6 5 6-8 6 8 6-5" />
    </Flash>
  );
}

export function SkullFlash({ className, delay, drawn }: SvgProps) {
  return (
    <Flash className={className} delay={delay} drawn={drawn}>
      <path pathLength="1" d="M60 18c-24 0-40 18-40 40 0 12 4 22 10 30v10c0 6 4 10 8 12l6 12h32l6-12c4-2 8-6 8-12v-10c6-8 10-18 10-30 0-22-16-40-40-40z" />
      <path pathLength="1" d="M38 56c0-8 6-14 12-14s12 6 12 14-6 12-12 12-12-4-12-12z" />
      <path pathLength="1" d="M58 56c0-8 6-14 12-14s12 6 12 14-6 12-12 12-12-4-12-12z" />
      <path pathLength="1" d="M56 74l4 10 4-10" />
      <path pathLength="1" d="M44 98v10M52 98v12M60 98v12M68 98v12M76 98v10" />
    </Flash>
  );
}

export function BatFlash({ className, delay, drawn }: SvgProps) {
  return (
    <Flash className={className} delay={delay} drawn={drawn}>
      <path pathLength="1" d="M60 58c-4-6-8-16-6-24 6 4 8 12 8 18 0-6 2-14 8-18 2 8-2 18-6 24" />
      <path pathLength="1" d="M54 58c-18-2-34-16-40-8 10 2 16 12 22 16-8 2-18 0-24 8 12 0 22-2 30 4" />
      <path pathLength="1" d="M66 58c18-2 34-16 40-8-10 2-16 12-22 16 8 2 18 0 24 8-12 0-22-2-30 4" />
      <path pathLength="1" d="M56 70c0 8 2 14 4 18M64 70c0 8-2 14-4 18" />
    </Flash>
  );
}

export function CatFlash({ className, delay, drawn }: SvgProps) {
  return (
    <Flash className={className} delay={delay} drawn={drawn}>
      <path pathLength="1" d="M40 78c0-22 10-38 20-38s20 16 20 38c0 14-8 24-20 24s-20-10-20-24z" />
      <path pathLength="1" d="M42 48l-8-22 18 12M78 48l8-22-18 12" />
      <path pathLength="1" d="M50 74c2-4 6-6 10-6s8 2 10 6" />
      <path pathLength="1" d="M52 68h.5M68 68h.5" />
      <path pathLength="1" d="M80 86c10 8 16 4 22-6" />
    </Flash>
  );
}

export function GhostFlash({ className, delay, drawn }: SvgProps) {
  return (
    <Flash className={className} delay={delay} drawn={drawn}>
      <path pathLength="1" d="M38 86c0-28 10-52 22-52s22 24 22 52c0 8-4 6-8 2s-6 8-10 2-6-6-10 2-8 6-8-2-4 4-8-6z" />
      <path pathLength="1" d="M50 62c0-3 2-5 4-5s4 2 4 5-2 4-4 4-4-1-4-4z" />
      <path pathLength="1" d="M64 62c0-3 2-5 4-5s4 2 4 5-2 4-4 4-4-1-4-4z" />
      <path pathLength="1" d="M56 74c2 4 6 4 8 0" />
    </Flash>
  );
}

export function SpiderFlash({ className, delay, drawn }: SvgProps) {
  return (
    <Flash className={className} delay={delay} drawn={drawn}>
      <path pathLength="1" d="M60 18v28" />
      <path pathLength="1" d="M60 52c-8 0-14 6-14 12s6 14 14 16 14-8 14-16-6-12-14-12z" />
      <path pathLength="1" d="M48 56c-16-10-26-8-30-2M48 64c-18-2-28 6-30 14M50 74c-14 8-22 18-18 24M72 56c16-10 26-8 30-2M72 64c18-2 28 6 30 14M70 74c14 8 22 18 18 24" />
    </Flash>
  );
}

export function MoonFlash({ className, delay, drawn }: SvgProps) {
  return (
    <Flash className={className} delay={delay} drawn={drawn}>
      <path pathLength="1" d="M72 22c-22 6-38 28-38 52 0 28 22 48 50 48 8 0 16-2 22-6-12 8-28 8-40 0-18-12-24-36-14-54 8-16 24-26 20-40z" />
      <path pathLength="1" d="M78 36l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
    </Flash>
  );
}

export function DaggerFlash({ className, delay, drawn }: SvgProps) {
  return (
    <Flash className={className} delay={delay} drawn={drawn}>
      <path pathLength="1" d="M60 18v62" />
      <path pathLength="1" d="M60 18l8 22-8 6-8-6z" />
      <path pathLength="1" d="M46 80h28" />
      <path pathLength="1" d="M52 80c-4 8-4 16 0 22M68 80c4 8 4 16 0 22" />
      <path pathLength="1" d="M60 80v22" />
      <path pathLength="1" d="M54 104h12" />
    </Flash>
  );
}

export function RoseFlash({ className, delay, drawn }: SvgProps) {
  return (
    <Flash className={className} delay={delay} drawn={drawn}>
      <path pathLength="1" d="M60 50c8 0 14-6 14-14s-6-14-14-8c-8-6-14 0-14 8s6 14 14 14z" />
      <path pathLength="1" d="M52 40c2-8 8-12 14-10" />
      <path pathLength="1" d="M60 50v32" />
      <path pathLength="1" d="M60 70c-14-2-20 10-16 20" />
      <path pathLength="1" d="M60 76c12 2 16 12 12 20" />
    </Flash>
  );
}

export const FLASH_DESIGNS = [
  { id: 'pumpkin', label: 'Abóbora', Drawing: PumpkinFlash },
  { id: 'skull', label: 'Caveira', Drawing: SkullFlash },
  { id: 'bat', label: 'Morcego', Drawing: BatFlash },
  { id: 'cat', label: 'Gato', Drawing: CatFlash },
  { id: 'ghost', label: 'Fantasma', Drawing: GhostFlash },
  { id: 'spider', label: 'Aranha', Drawing: SpiderFlash },
  { id: 'moon', label: 'Lua', Drawing: MoonFlash },
  { id: 'dagger', label: 'Adaga', Drawing: DaggerFlash },
  { id: 'rose', label: 'Rosa', Drawing: RoseFlash },
] as const;

export type FlashDesignId = (typeof FLASH_DESIGNS)[number]['id'];
