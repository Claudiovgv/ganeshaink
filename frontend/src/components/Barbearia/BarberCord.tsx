'use client';

import { useEffect, useState } from 'react';

export default function BarberCord() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setProgress(1);
      return;
    }

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) {
        setProgress(1);
        return;
      }
      const start = window.innerHeight * 0.28;
      setProgress(Math.min(1, Math.max(0, (window.scrollY - start) / (max - start))));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[6] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M50 41 C49.2 48 50.8 53 50 58 C50 63 22 67 20 73 C22 78 50 80 50 85 C50 90 50 95 50 99"
        fill="none"
        stroke="#C9A84C"
        strokeWidth="0.22"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - progress}
        opacity="0.85"
      />
      <path
        d="M50 58 C62 64 78 66 80 73"
        fill="none"
        stroke="#C9A84C"
        strokeWidth="0.18"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - Math.max(0, (progress - 0.28) / 0.72)}
        opacity="0.7"
      />
    </svg>
  );
}
