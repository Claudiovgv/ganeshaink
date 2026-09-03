'use client';

import { useEffect } from 'react';
import { reportClientError } from '@/lib/reportError';

export default function ClientErrorReporter() {
  useEffect(() => {
    function onError(event: ErrorEvent) {
      reportClientError({
        message: event.message || 'Erro no site',
        path: window.location.pathname,
        detail: [event.filename, event.lineno, event.colno].filter(Boolean).join(':'),
      });
    }
    function onRejection(event: PromiseRejectionEvent) {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason || 'Promise rejeitada');
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
