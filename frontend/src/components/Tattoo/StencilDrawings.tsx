import type { ReactNode } from 'react';

const STROKE = '#8a74b8';

type SvgProps = {
  className?: string;
};

function Stroke({ children }: { children: ReactNode }) {
  return (
    <g
      className="stencil-stroke"
      stroke={STROKE}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {children}
    </g>
  );
}

export function SkullDrawing({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 200 240" fill="none" className={className} aria-hidden>
      <Stroke>
        <path pathLength="1" d="M100 18c-38 0-68 28-68 66 0 18 6 34 14 46v18c0 8 4 14 10 18l8 22h72l8-22c6-4 10-10 10-18v-18c8-12 14-28 14-46 0-38-30-66-68-66z" />
        <path pathLength="1" d="M62 92c0-14 10-24 22-24s22 10 22 24-10 20-22 20-22-8-22-20z" />
        <path pathLength="1" d="M116 92c0-14 10-24 22-24s22 10 22 24-10 20-22 20-22-8-22-20z" />
        <path pathLength="1" d="M92 118l8 22 8-22" />
        <path pathLength="1" d="M78 168h44" />
        <path pathLength="1" d="M70 178v18M82 178v20M94 178v22M106 178v22M118 178v20M130 178v18" />
        <path pathLength="1" d="M58 196c8 18 24 28 42 28s34-10 42-28" />
      </Stroke>
    </svg>
  );
}

export function ShipDrawing({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 280 170" fill="none" className={className} aria-hidden>
      <Stroke>
        <path pathLength="1" d="M24 118c18-8 36-22 42-48 4-16 8-38 8-38l18 14c8-10 22-16 22-16s6 20 4 36c20 6 48 8 78 6 22-2 40-8 54-16l6 18c-12 10-32 20-58 26H86c-18 0-38-4-62-10z" />
        <path pathLength="1" d="M38 122c22 18 58 28 102 28s80-10 102-28" />
        <path pathLength="1" d="M140 18v92" />
        <path pathLength="1" d="M140 28c28 8 48 28 52 56H140" />
        <path pathLength="1" d="M86 108v14M110 108v14M164 108v14M188 108v14" />
        <path pathLength="1" d="M20 128c24 6 70 12 120 12s96-6 120-12" />
      </Stroke>
    </svg>
  );
}

export function SwallowDrawing({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 180 140" fill="none" className={className} aria-hidden>
      <Stroke>
        <path pathLength="1" d="M20 78c36-8 58-28 70-58 4 22 10 40 28 54 24 18 48 20 62 16-18 8-40 6-58-2-8 16-10 32-6 48-14-12-22-28-24-46-18 10-40 14-72-12z" />
        <path pathLength="1" d="M90 74l-8 22 16-8 12 18" />
        <path pathLength="1" d="M118 52c8-6 18-8 26-6" />
      </Stroke>
    </svg>
  );
}

export function RoseDrawing({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 140 190" fill="none" className={className} aria-hidden>
      <Stroke>
        <path pathLength="1" d="M70 22c-10 8-16 20-12 32 8-6 18-8 28-4-2-12-6-22-16-28z" />
        <path pathLength="1" d="M46 48c-8 10-8 24 2 34 10-8 24-10 36-4-4-16-16-28-38-30z" />
        <path pathLength="1" d="M96 46c12 8 16 22 10 36-12-6-26-4-36 6 8-16 16-30 26-42z" />
        <path pathLength="1" d="M70 58c-14 8-18 24-8 38 8-4 18-4 26 2 6-14 2-28-18-40z" />
        <path pathLength="1" d="M70 96v62" />
        <path pathLength="1" d="M70 118c-22 4-32 20-28 34" />
        <path pathLength="1" d="M70 130c20 6 30 18 26 32" />
        <path pathLength="1" d="M28 86l22 8M112 90l-20 8" />
      </Stroke>
    </svg>
  );
}

export function ConstellationDrawing({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden>
      <Stroke>
        <path pathLength="1" d="M28 40l44 18 36-28 40 22 28-8" />
        <path pathLength="1" d="M72 58l12 46 38-16" />
        <path pathLength="1" d="M148 52l-8 42 32 18" />
        <path pathLength="1" d="M24 38l4-4 4 4-4 4zM70 56l4-4 4 4-4 4zM108 28l4-4 4 4-4 4zM148 50l4-4 4 4-4 4zM176 42l3-3 3 3-3 3zM84 104l3-3 3 3-3 3zM122 88l3-3 3 3-3 3zM140 94l3-3 3 3-3 3zM172 112l3-3 3 3-3 3z" />
      </Stroke>
    </svg>
  );
}

export function ColumnDrawing({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 120 220" fill="none" className={className} aria-hidden>
      <Stroke>
        <path pathLength="1" d="M18 28h84" />
        <path pathLength="1" d="M26 28v14h68V28" />
        <path pathLength="1" d="M32 42v132M44 42v132M60 42v132M76 42v132M88 42v132" />
        <path pathLength="1" d="M26 174h68" />
        <path pathLength="1" d="M14 186h92M20 198h80M28 210h64" />
        <path pathLength="1" d="M22 18c10 8 28 10 38 10s28-2 38-10" />
      </Stroke>
    </svg>
  );
}

export function BustDrawing({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 140 190" fill="none" className={className} aria-hidden>
      <Stroke>
        <path pathLength="1" d="M70 16c-22 0-38 18-38 42 0 16 8 28 18 34v10c-22 10-36 28-40 52h120c-4-24-18-42-40-52v-10c10-6 18-18 18-34 0-24-16-42-38-42z" />
        <path pathLength="1" d="M48 28c8 10 14 12 22 12s14-2 22-12" />
        <path pathLength="1" d="M56 52c0 4 2 8 6 8M78 52c0 4 2 8 6 8" />
        <path pathLength="1" d="M66 68c4 6 8 6 12 0" />
      </Stroke>
    </svg>
  );
}

export function FlowerDrawing({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className={className} aria-hidden>
      <Stroke>
        <path pathLength="1" d="M70 70c-6-22 4-38 18-42 2 16-4 30-18 42z" />
        <path pathLength="1" d="M70 70c16-16 34-14 42-2-14 8-28 8-42 2z" />
        <path pathLength="1" d="M70 70c22 6 28 24 18 38-14-8-22-22-18-38z" />
        <path pathLength="1" d="M70 70c-16 16-34 12-40-2 14-6 28-6 40 2z" />
        <path pathLength="1" d="M70 70c-22 4-34-12-28-28 12 6 22 16 28 28z" />
        <path pathLength="1" d="M70 70c4 22-10 36-26 36 2-16 12-28 26-36z" />
        <path pathLength="1" d="M64 70a6 6 0 1012 0 6 6 0 10-12 0z" />
      </Stroke>
    </svg>
  );
}

export function CatDrawing({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 160 180" fill="none" className={className} aria-hidden>
      <Stroke>
        <path pathLength="1" d="M48 38l-16-22 4 28M112 38l16-22-4 28" />
        <path pathLength="1" d="M42 48c0-18 12-30 38-30s38 12 38 30c8 12 12 28 12 44 0 36-18 58-50 58s-50-22-50-58c0-16 4-32 12-44z" />
        <path pathLength="1" d="M62 58c0 6 4 10 8 10M90 58c0 6 4 10 8 10" />
        <path pathLength="1" d="M76 78c4 6 8 6 12 0" />
        <path pathLength="1" d="M118 110c22 8 30 28 22 48" />
        <path pathLength="1" d="M58 150c-4 10 2 18 14 18h16" />
      </Stroke>
    </svg>
  );
}

export function VikingManDrawing({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 160 210" fill="none" className={className} aria-hidden>
      <Stroke>
        <path pathLength="1" d="M36 58c0-28 18-46 44-46s44 18 44 46" />
        <path pathLength="1" d="M28 62h104" />
        <path pathLength="1" d="M22 40l18 22M138 40l-18 22" />
        <path pathLength="1" d="M52 70c0 8 4 14 10 14M98 70c0 8 4 14 10 14" />
        <path pathLength="1" d="M70 92c8 8 16 8 24 0" />
        <path pathLength="1" d="M48 108c8 22 18 34 32 38 14-4 24-16 32-38" />
        <path pathLength="1" d="M40 128c-8 18-8 36 6 48h68c14-12 14-30 6-48" />
        <path pathLength="1" d="M18 150l28-8 6 36-34-8z" />
      </Stroke>
    </svg>
  );
}

export function VikingWomanDrawing({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 160 220" fill="none" className={className} aria-hidden>
      <Stroke>
        <path pathLength="1" d="M80 16c-20 0-34 16-36 36 10 4 22 6 36 6s26-2 36-6c-2-20-16-36-36-36z" />
        <path pathLength="1" d="M44 56c-8 24-6 48 8 58M116 56c8 24 6 48-8 58" />
        <path pathLength="1" d="M58 68c0 6 4 10 8 10M94 68c0 6 4 10 8 10" />
        <path pathLength="1" d="M72 88c6 6 12 6 18 0" />
        <path pathLength="1" d="M52 118c-16 16-20 40-8 62h72c12-22 8-46-8-62" />
        <path pathLength="1" d="M62 148h36M56 168h48" />
        <path pathLength="1" d="M40 52c8 2 14 2 18-4M120 52c-8 2-14 2-18-4" />
      </Stroke>
    </svg>
  );
}
