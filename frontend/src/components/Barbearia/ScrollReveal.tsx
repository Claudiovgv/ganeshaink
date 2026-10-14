'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function ScrollReveal({
  children,
  className = '',
  shift = 36,
}: {
  children: ReactNode;
  className?: string;
  shift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setT(1);
      return;
    }

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.38;
      setT(Math.min(1, Math.max(0, (start - rect.top) / (start - end))));
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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: t,
        transform: `translate3d(0, ${(1 - t) * shift}px, 0)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
