'use client';
import { useState, useTransition } from 'react';
import Button from '@/components/Button';
import type { SmtpSettings } from '@/lib/types';
import { updateSmtpSettingsAction, testSmtpSettingsAction } from '@/lib/actions';

export default function SmtpClient({ initial, userEmail }: { initial: SmtpSettings; userEmail: string }) {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [testEmail, setTestEmail] = useState(userEmail);
  const [testMessage, setTestMessage] = useState<string | null>(null);
  const [testError, setTestError] = useState<string | null>(null);
  const [isTesting, startTestTransition] = useTransition();

  function handleSave() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        await updateSmtpSettingsAction(form);
        setMessage('Definições de SMTP guardadas.');
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function handleTest() {
    setTestError(null);
    setTestMessage(null);
    startTestTransition(async () => {
      try {
        const res = await testSmtpSettingsAction({ ...form, testEmail });
        setTestMessage(res.message);
      } catch (err) {
        setTestError((err as Error).message);
      }
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-text-secondary text-sm">
        Configuração do servidor de envio de emails (notificações de marcações, etc.).
        {initial.source === 'env' && ' Atualmente a usar os valores do ficheiro .env do servidor.'}
      </p>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {message && <p className="text-green-400 text-sm">{message}</p>}

      <div>
        <label className="block text-sm text-text-secondary mb-1.5">Servidor (host)</label>
        <input
          value={form.smtpHost}
          onChange={(e) => setForm({ ...form, smtpHost: e.target.value })}
          className="w-full bg-bg-card border border-gold-border rounded px-4 py-2.5 text-text-primary focus:outline-none focus:border-gold"
          placeholder="mail.ganeshaink.pt"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1.5">Porta</label>
        <input
          value={form.smtpPort}
          onChange={(e) => setForm({ ...form, smtpPort: e.target.value })}
          className="w-full bg-bg-card border border-gold-border rounded px-4 py-2.5 text-text-primary focus:outline-none focus:border-gold"
          placeholder="587"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1.5">Utilizador</label>
        <input
          value={form.smtpUser}
          onChange={(e) => setForm({ ...form, smtpUser: e.target.value })}
          className="w-full bg-bg-card border border-gold-border rounded px-4 py-2.5 text-text-primary focus:outline-none focus:border-gold"
          placeholder="noreply@ganeshaink.pt"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1.5">Password</label>
        <input
          type="password"
          value={form.smtpPass}
          onChange={(e) => setForm({ ...form, smtpPass: e.target.value })}
          className="w-full bg-bg-card border border-gold-border rounded px-4 py-2.5 text-text-primary focus:outline-none focus:border-gold"
          placeholder="••••••••"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1.5">Remetente (from)</label>
        <input
          value={form.smtpFrom}
          onChange={(e) => setForm({ ...form, smtpFrom: e.target.value })}
          className="w-full bg-bg-card border border-gold-border rounded px-4 py-2.5 text-text-primary focus:outline-none focus:border-gold"
          placeholder="Ganesha Ink <noreply@ganeshaink.pt>"
        />
      </div>

      <Button onClick={handleSave} disabled={isPending}>Guardar</Button>

      <div className="border-t border-gold-border pt-4 mt-2">
        <label className="block text-sm text-text-secondary mb-1.5">Testar envio</label>
        <p className="text-text-secondary text-xs mb-2">
          Envia um email de teste usando os valores acima (mesmo que ainda não tenhas guardado). Se a password estiver por preencher, usa a que já está guardada.
        </p>
        {testError && <p className="text-red-400 text-sm mb-2">{testError}</p>}
        {testMessage && <p className="text-green-400 text-sm mb-2">{testMessage}</p>}
        <div className="flex gap-2">
          <input
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="flex-1 bg-bg-card border border-gold-border rounded px-4 py-2.5 text-text-primary focus:outline-none focus:border-gold"
            placeholder="o-teu-email@exemplo.com"
          />
          <Button onClick={handleTest} disabled={isTesting || !testEmail}>
            {isTesting ? 'A enviar...' : 'Enviar teste'}
          </Button>
        </div>
      </div>
    </div>
  );
}
