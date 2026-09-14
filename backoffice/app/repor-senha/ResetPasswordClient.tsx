'use client';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { forgotPasswordAction, resetPasswordAction } from '@/lib/actions';

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gold text-bg-primary font-semibold py-3 rounded hover:bg-gold-light transition-colors disabled:opacity-60"
    >
      {pending ? 'A enviar…' : label}
    </button>
  );
}

export default function ResetPasswordClient({ token }: { token: string }) {
  const [forgotState, forgotAction] = useFormState(forgotPasswordAction, null);
  const [resetState, resetAction] = useFormState(resetPasswordAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
            <Image
              src="/images/logo/ganesha-icon.webp"
              alt="Ganesha Ink"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h1 className="font-display text-3xl font-bold text-text-primary">Ganesha Ink</h1>
          <p className="text-text-secondary text-sm mt-1">
            {token ? 'Definir senha nova' : 'Recuperar senha'}
          </p>
        </div>

        {token ? (
          resetState && 'message' in resetState ? (
            <div className="space-y-4 text-center">
              <p className="text-text-secondary text-sm">{resetState.message}</p>
              <Link href="/login" className="text-gold text-sm hover:text-gold-light">Ir para o login</Link>
            </div>
          ) : (
            <form action={resetAction} className="space-y-4">
              {resetState && 'error' in resetState && resetState.error && (
                <p className="text-red-400 text-sm text-center">{resetState.error}</p>
              )}
              <input type="hidden" name="token" value={token} />
              <div>
                <label className="block text-sm text-text-secondary mb-1.5" htmlFor="password">Senha nova</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full bg-bg-card border border-gold-border rounded px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5" htmlFor="confirm">Repetir senha</label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full bg-bg-card border border-gold-border rounded px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <Submit label="Guardar senha" />
            </form>
          )
        ) : forgotState && 'message' in forgotState ? (
          <p className="text-text-secondary text-sm text-center">{forgotState.message}</p>
        ) : (
          <form action={forgotAction} className="space-y-4">
            {forgotState && 'error' in forgotState && forgotState.error && (
              <p className="text-red-400 text-sm text-center">{forgotState.error}</p>
            )}
            <p className="text-text-secondary text-sm text-center">
              Indica o utilizador (ex.: vera), o email ou o nome. Se a conta existir, enviamos um link.
            </p>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5" htmlFor="email">Utilizador ou email</label>
              <input
                id="email"
                name="email"
                type="text"
                required
                autoComplete="username"
                className="w-full bg-bg-card border border-gold-border rounded px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <Submit label="Enviar link" />
          </form>
        )}

        <p className="text-center mt-6">
          <Link href="/login" className="text-text-muted text-xs hover:text-text-secondary">Voltar ao login</Link>
        </p>
      </div>
    </div>
  );
}
