'use client';

import { useState, useTransition } from 'react';
import Button from '@/components/Button';
import type { AdsenseSettings } from '@/lib/types';
import { updateAdsenseSettingsAction } from '@/lib/actions';

export default function AnunciosClient({ initial }: { initial: AdsenseSettings }) {
  const [enabled, setEnabled] = useState(initial.enabled);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const res = await updateAdsenseSettingsAction(enabled);
      if (res.ok) {
        setEnabled(res.settings.enabled);
        setMessage(res.settings.enabled
          ? 'Anúncios ligados. A publicidade no site público passa a carregar depois de recarregares as páginas.'
          : 'Anúncios desligados. A meta e o ads.txt ficam no ar para o Google continuar a validar o site.');
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <div className="space-y-5">
      <p className="text-text-secondary text-sm">
        Liga ou desliga os anúncios visíveis no site. A meta do AdSense e o ficheiro ads.txt
        ficam sempre publicados, para o Google poder confirmar o domínio mesmo com os anúncios desligados.
      </p>

      <label className="flex items-center gap-3 cursor-pointer select-none">
        <span className="relative inline-flex h-6 w-11 shrink-0">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <span className="absolute inset-0 rounded-full bg-bg-card border border-gold-border peer-checked:bg-gold peer-checked:border-gold transition-colors" />
          <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-text-primary peer-checked:translate-x-5 transition-transform" />
        </span>
        <span className="text-text-primary text-sm font-medium">
          {enabled ? 'Anúncios ligados' : 'Anúncios desligados'}
        </span>
      </label>

      <p className="text-text-muted text-xs leading-relaxed">
        Com o interruptor desligado, o site não carrega o script do Google. Depois da conta AdSense
        aprovada, liga aqui para a publicidade automática começar a aparecer.
      </p>

      {message && <p className="text-sm text-gold">{message}</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button onClick={handleSave} loading={isPending}>Guardar</Button>
    </div>
  );
}
