'use client';

type Part = {
  id: string;
  x: number;
  y: number;
  rot: number;
};

const PARTS: Part[] = [
  { id: 'teeth', x: -34, y: -310, rot: -18 },
  { id: 'blade', x: 48, y: -292, rot: 14 },
  { id: 'head', x: -56, y: -268, rot: -12 },
  { id: 'lever', x: 70, y: -248, rot: 36 },
  { id: 'body', x: 10, y: -300, rot: 8 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

export default function ClipperAssemble({ progress }: { progress: number }) {
  const t = easeOut(Math.min(1, Math.max(0, progress)));

  return (
    <svg
      viewBox="0 0 200 520"
      className="h-full w-full"
      fill="none"
      stroke="#C9A84C"
      strokeWidth="1.35"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      {PARTS.map((part) => {
        const x = lerp(part.x, 0, t);
        const y = lerp(part.y, 0, t);
        const rot = lerp(part.rot, 0, t);
        return (
          <g key={part.id} transform={`translate(${x} ${y}) rotate(${rot} 100 300)`}>
            {part.id === 'teeth' && (
              <g>
                {Array.from({ length: 13 }).map((_, i) => (
                  <line key={i} x1={67 + i * 5.5} y1="196" x2={67 + i * 5.5} y2="182" />
                ))}
                <path d="M64 196h72" />
              </g>
            )}
            {part.id === 'blade' && <rect x="66" y="196" width="68" height="18" rx="2" />}
            {part.id === 'head' && (
              <path d="M70 214h60c6 0 10 5 10 11v18H60v-18c0-6 4-11 10-11z" />
            )}
            {part.id === 'lever' && (
              <g>
                <rect x="138" y="262" width="8" height="40" rx="2.5" />
                <circle cx="142" cy="262" r="3.2" />
              </g>
            )}
            {part.id === 'body' && (
              <g>
                <path d="M72 242h56c9 0 16 8 16 18v86c0 14-10 24-24 24H80c-14 0-24-10-24-24V260c0-10 7-18 16-18z" />
                <rect x="88" y="278" width="24" height="48" rx="6" opacity="0.85" />
                <circle cx="100" cy="264" r="4" />
                <path d="M100 370v36" opacity={t} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
