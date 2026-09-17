'use client';

import { useEffect } from 'react';
import { reportClientError } from '@/lib/reportError';

function isStaleChunkError(message: string) {
  return /ChunkLoadError|Loading chunk [\d]+ failed|Failed to fetch dynamically imported module/i.test(message);
}

export default function ClientErrorReporter() {
  useEffect(() => {
    function reloadIfStale(message: string) {
      if (!isStaleChunkError(message)) return false;
      const key = 'ganesha-chunk-reload';
      const last = Number(sessionStorage.getItem(key) || '0');
      if (Date.now() - last < 15000) return false;
      sessionStorage.setItem(key, String(Date.now()));
      window.location.reload();
      return true;
    }
    function onError(event: ErrorEvent) {
      const message = event.message || 'Erro no site';
      if (reloadIfStale(message)) return;
      reportClientError({
        message,
        path: window.location.pathname,
        detail: [event.filename, event.lineno, event.colno].filter(Boolean).join(':'),
      });
    }
    function onRejection(event: PromiseRejectionEvent) {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason || 'Promise rejeitada');
      if (reloadIfStale(message)) return;
      reportClientError({
        message,
        path: window.location.pathname,
      });
    }
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  return null;
}
