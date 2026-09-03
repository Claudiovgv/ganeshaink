'use client';
import { useState, useTransition } from 'react';
import Button from '@/components/Button';
import type { NotificationMatrix, SmtpSettings } from '@/lib/types';
import {
  updateSmtpSettingsAction,
  testSmtpSettingsAction,
  updateNotificationPreferencesAction,
  testSmtpTemplateAction,
} from '@/lib/actions';

type Tab = 'server' | 'recipients' | 'tests';

const ROLE_LABELS: Record<string, string> = {
  superadmin: 'Superadmin',
  admin: 'Gestão',
  employee: 'Profissional',
};

export default function SmtpClient({
  initial,
  initialMatrix,
  userEmail,
}: {
  initial: SmtpSettings;
  initialMatrix: NotificationMatrix;
  userEmail: string;
}) {
  const [tab, setTab] = useState<Tab>('server');

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {([
          ['server', 'Servidor'],
          ['recipients', 'Quem recebe'],
          ['tests', 'Testes'],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              tab === id ? 'bg-gold text-bg-primary' : 'border border-gold-border text-text-secondary hover:border-gold hover:text-gold'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'server' && <ServerTab initial={initial} />}
      {tab === 'recipients' && <RecipientsTab initialMatrix={initialMatrix} />}
      {tab === 'tests' && <TestsTab initial={initial} initialMatrix={initialMatrix} userEmail={userEmail} />}
    </div>
  );
}

function ServerTab({ initial }: { initial: SmtpSettings }) {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const res = await updateSmtpSettingsAction(form);
      if (res.ok) setMessage('Definições de SMTP guardadas.');
      else setError(res.error);
    });
  }

  return (
    <div className="space-y-4 max-w-md">
      <p className="text-text-secondary text-sm">
        Conta do servidor de correio — não é o login do backoffice.
        {initial.source === 'env' && ' Atualmente a usar os valores do ficheiro .env do servidor. Preenche e guarda para passar a usar estes campos.'}
      </p>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {message && <p className="text-green-400 text-sm">{message}</p>}

      {([
        ['smtpHost', 'Servidor (host)', 'mail.ganeshaink.pt'],
        ['smtpPort', 'Porta', '465'],
        ['smtpUser', 'Utilizador SMTP', 'noreply@ganeshaink.pt'],
        ['smtpPass', 'Password SMTP', '••••••••'],
        ['smtpFrom', 'Remetente (from)', 'Ganesha Ink <noreply@ganeshaink.pt>'],
      ] as const).map(([key, label, placeholder]) => (
        <div key={key}>
          <label className="block text-sm text-text-secondary mb-1.5">{label}</label>
          <input
            type={key === 'smtpPass' ? 'password' : 'text'}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full bg-bg-card border border-gold-border rounded px-4 py-2.5 text-text-primary focus:outline-none focus:border-gold"
            placeholder={placeholder}
          />
        </div>
      ))}

      <Button onClick={handleSave} disabled={isPending}>Guardar</Button>
    </div>
  );
}

function RecipientsTab({ initialMatrix }: { initialMatrix: NotificationMatrix }) {
  const [matrix, setMatrix] = useState(initialMatrix);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function toggle(userId: number, eventType: string) {
    setMatrix((prev) => ({
      ...prev,
      users: prev.users.map((u) =>
        u.id === userId
          ? { ...u, preferences: { ...u.preferences, [eventType]: !u.preferences[eventType as keyof typeof u.preferences] } }
          : u
      ),
    }));
    setMessage(null);
  }

  function setMailbox(userId: number, notificationEmail: string) {
    setMatrix((prev) => ({
      ...prev,
      users: prev.users.map((u) => (u.id === userId ? { ...u, notificationEmail } : u)),
    }));
    setMessage(null);
  }

  function handleSave() {
    setError(null);
    setMessage(null);
    const preferences = matrix.users.flatMap((u) =>
      matrix.events.map((e) => ({ userId: u.id, eventType: e.id, enabled: Boolean(u.preferences[e.id]) }))
    );
    const mailboxes = matrix.users.map((u) => ({ userId: u.id, notificationEmail: u.notificationEmail || '' }));
    startTransition(async () => {
      const res = await updateNotificationPreferencesAction(preferences, mailboxes);
      if (res.ok) {
        setMatrix(res.matrix);
        setMessage('Quem recebe foi guardado.');
      } else setError(res.error);
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-text-secondary text-sm">
        O cliente recebe sempre. Aqui defines o email de cada pessoa da equipa e que tipos de aviso recebe.
        Um profissional só recebe as marcações dele; gestão (admin/superadmin) recebe todas.
      </p>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {message && <p className="text-green-400 text-sm">{message}</p>}

      <div className="overflow-x-auto border border-gold-border rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold-border bg-bg-card">
              <th className="text-left p-3 text-text-secondary font-medium sticky left-0 bg-bg-card min-w-[14rem]">Utilizador</th>
              {matrix.events.map((e) => (
                <th key={e.id} className="p-3 text-text-secondary font-medium text-center min-w-[7rem]">{e.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.users.map((u) => (
              <tr key={u.id} className="border-b border-gold-border last:border-0">
                <td className="p-3 sticky left-0 bg-bg-primary align-top">
                  <p className="text-text-primary font-medium">{u.name}</p>
                  <p className="text-text-secondary text-xs mb-2">login: {u.email} · {ROLE_LABELS[u.role] || u.role}</p>
                  <input
                    type="email"
                    value={u.notificationEmail}
                    onChange={(e) => setMailbox(u.id, e.target.value)}
                    placeholder="email para notificações"
                    className="w-full bg-bg-section border border-gold-border rounded px-2 py-1.5 text-xs text-text-primary focus:outline-none focus:border-gold"
                  />
                  {!u.mailbox && !u.notificationEmail && (
                    <p className="text-amber-400 text-[11px] mt-1">Sem email real — os avisos não chegam.</p>
                  )}
                </td>
                {matrix.events.map((e) => (
                  <td key={e.id} className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={Boolean(u.preferences[e.id])}
                      onChange={() => toggle(u.id, e.id)}
                      className="w-4 h-4 accent-gold cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button onClick={handleSave} disabled={isPending}>{isPending ? 'A guardar...' : 'Guardar'}</Button>
    </div>
  );
}

function TestsTab({
  initial,
  initialMatrix,
  userEmail,
}: {
  initial: SmtpSettings;
  initialMatrix: NotificationMatrix;
  userEmail: string;
}) {
  const [testEmail, setTestEmail] = useState(userEmail);
  const [eventType, setEventType] = useState(initialMatrix.events[0]?.id ?? 'new_appointment');
  const [audience, setAudience] = useState<'client' | 'staff'>('client');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [genericMessage, setGenericMessage] = useState<string | null>(null);
  const [genericError, setGenericError] = useState<string | null>(null);
  const [isGeneric, startGeneric] = useTransition();

  function handleTemplate() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const res = await testSmtpTemplateAction({ eventType, testEmail, audience });
      if (res.ok) setMessage(res.message);
      else setError(res.error);
    });
  }

  function handleGeneric() {
    setGenericError(null);
    setGenericMessage(null);
    startGeneric(async () => {
      const res = await testSmtpSettingsAction({ ...initial, testEmail });
      if (res.ok) setGenericMessage(res.message);
      else setGenericError(res.error);
    });
  }

  return (
    <div className="space-y-8 max-w-lg">
      <div className="space-y-4">
        <p className="text-text-secondary text-sm">
          Envia o template real de cada notificação (com dados de exemplo) para confirmares o texto e o SMTP.
        </p>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {message && <p className="text-green-400 text-sm">{message}</p>}

        <div>
          <label className="block text-sm text-text-secondary mb-1.5">Email de destino</label>
          <input
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="w-full bg-bg-card border border-gold-border rounded px-4 py-2.5 text-text-primary focus:outline-none focus:border-gold"
            placeholder="o-teu-email@exemplo.com"
          />
        </div>
        <div>
          <label className="block text-sm text-text-secondary mb-1.5">Tipo de email</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value as typeof eventType)}
            className="w-full bg-bg-card border border-gold-border rounded px-4 py-2.5 text-text-primary focus:outline-none focus:border-gold"
          >
            {initialMatrix.events.map((e) => (
              <option key={e.id} value={e.id}>{e.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-text-secondary mb-1.5">Versão</label>
          <div className="flex gap-2">
            {(['client', 'staff'] as const).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setAudience(id)}
                className={`px-4 py-2 rounded text-sm ${
                  audience === id ? 'bg-gold text-bg-primary' : 'border border-gold-border text-text-secondary'
                }`}
              >
                {id === 'client' ? 'Cliente' : 'Staff'}
              </button>
            ))}
          </div>
        </div>
        <Button onClick={handleTemplate} disabled={isPending || !testEmail}>
          {isPending ? 'A enviar...' : 'Enviar este template'}
        </Button>
      </div>

      <div className="border-t border-gold-border pt-6 space-y-3">
        <p className="text-text-secondary text-sm">Teste genérico de ligação SMTP (sem template de marcação).</p>
        {genericError && <p className="text-red-400 text-sm">{genericError}</p>}
        {genericMessage && <p className="text-green-400 text-sm">{genericMessage}</p>}
        <Button variant="outline" onClick={handleGeneric} disabled={isGeneric || !testEmail}>
          {isGeneric ? 'A enviar...' : 'Enviar teste de ligação'}
        </Button>
      </div>
    </div>
  );
}
