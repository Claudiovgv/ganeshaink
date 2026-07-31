'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import { loginAction, verify2FAAction, setupPendingLogin2FAAction } from '@/lib/actions';

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gold text-bg-primary font-semibold py-3 rounded hover:bg-gold-light transition-colors disabled:opacity-60"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

function TwoFactorForm({ pendingToken, needsSetup, onBack }: { pendingToken: string; needsSetup: boolean; onBack: () => void }) {
  const [state, formAction] = useFormState(verify2FAAction, null);
  const [setupData, setSetupData] = useState<{ secret: string; qrCodeDataUrl: string } | null>(null);
  const [setupError, setSetupError] = useState<string | null>(null);

  useEffect(() => {
    if (!needsSetup) return;
    setupPendingLogin2FAAction(pendingToken)
      .then(setSetupData)
      .catch((err) => setSetupError((err as Error).message));
  }, [needsSetup, pendingToken]);

  if (needsSetup && !setupData) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-text-secondary text-sm">
          {setupError ? setupError : 'A preparar a configuração do 2FA…'}
        </p>
        {setupError && (
          <button type="button" onClick={onBack} className="text-text-muted text-xs hover:text-text-secondary transition-colors">
            Voltar
          </button>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {needsSetup && setupData ? (
        <>
          <p className="text-text-secondary text-sm text-center">
            1. Digitaliza este código com o Google Authenticator (ou outra app de autenticação).
          </p>
          <div className="bg-white p-3 rounded w-fit mx-auto">
            <Image src={setupData.qrCodeDataUrl} alt="QR Code 2FA" width={180} height={180} unoptimized />
          </div>
          <p className="text-text-muted text-xs text-center break-all">
            Ou introduz manualmente: <span className="text-gold">{setupData.secret}</span>
          </p>
          <p className="text-text-secondary text-sm text-center">2. Introduz o código de 6 dígitos gerado pela app.</p>
        </>
      ) : (
        <p className="text-text-secondary text-sm text-center">
          Introduz o código de 6 dígitos da app de autenticação (Google Authenticator).
        </p>
      )}
      {state && 'error' in state && (
        <p className="text-red-400 text-sm text-center">{state.error}</p>
      )}
      <input type="hidden" name="pendingToken" value={pendingToken} />
      <div>
        <label className="block text-sm text-text-secondary mb-1.5" htmlFor="code">
          Código de autenticação
        </label>
        <input
          id="code"
          name="code"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          required
          autoFocus
          autoComplete="one-time-code"
          className="w-full bg-bg-card border border-gold-border rounded px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors tracking-[0.3em] text-center text-lg"
          placeholder="000000"
        />
      </div>
      <SubmitButton label={needsSetup ? 'Confirmar e ativar' : 'Confirmar'} pendingLabel="A verificar…" />
      <button
        type="button"
        onClick={onBack}
        className="w-full text-text-muted text-xs hover:text-text-secondary transition-colors"
      >
        Voltar
      </button>
    </form>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, null);

  if (state && 'requires2FA' in state) {
    return (
      <TwoFactorForm
        pendingToken={state.pendingToken}
        needsSetup={state.needsSetup}
        onBack={() => window.location.reload()}
      />
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state && 'error' in state && (
        <p className="text-red-400 text-sm text-center">{state.error}</p>
      )}
      <div>
        <label className="block text-sm text-text-secondary mb-1.5" htmlFor="email">
          Utilizador
        </label>
        <input
          id="email"
          name="email"
          type="text"
          required
          autoComplete="username"
          className="w-full bg-bg-card border border-gold-border rounded px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
          placeholder="utilizador ou email"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1.5" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full bg-bg-card border border-gold-border rounded px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
          placeholder="••••••••"
        />
      </div>

      <SubmitButton label="Entrar" pendingLabel="A entrar…" />
    </form>
  );
}
