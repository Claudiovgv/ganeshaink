'use client';

import { useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/v1';
const CLIENT = 'ca-pub-9938976891580683';
const SCRIPT_ID = 'ganesha-adsense';

export default function AdSenseLoader() {
  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/adsense`)
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((data: { enabled?: boolean }) => {
        if (cancelled || !data?.enabled) return;
        if (document.getElementById(SCRIPT_ID)) return;
        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`;
        document.head.appendChild(script);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
