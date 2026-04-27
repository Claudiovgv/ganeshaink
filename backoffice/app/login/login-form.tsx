'use client';
import { useActionState } from 'react';
import { loginAction } from '@/lib/actions';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="text-red-400 text-sm text-center">{state.error}</p>
      )}
      <div>
        <label className="block text-sm text-text-secondary mb-1.5" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full bg-bg-card border border-gold-border rounded px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
          placeholder="email@ganeshaink.pt"
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

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-gold text-bg-primary font-semibold py-3 rounded hover:bg-gold-light transition-colors disabled:opacity-60"
      >
        {pending ? 'A entrar…' : 'Entrar'}
      </button>
    </form>
  );
}
