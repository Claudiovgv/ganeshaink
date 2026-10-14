'use client';

import { useEffect, useState, type ReactNode } from 'react';

export default function DesktopOnly({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const apply = () => setActive(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  if (!active) return null;
  return <>{children}</>;
}
