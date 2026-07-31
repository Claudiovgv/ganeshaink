'use client';
import { useState, useTransition } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import { setup2FAAction, enable2FAAction, disable2FAAction } from '@/lib/actions';

export default function SegurancaClient({ twoFactorEnabled }: { twoFactorEnabled: boolean }) {
  const [enabled, setEnabled] = useState(twoFactorEnabled);
  const [setupData, setSetupData] = useState<{ secret: string; qrCodeDataUrl: string } | null>(null);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleStartSetup() {
    setError(null);
    startTransition(async () => {
      try {
        const data = await setup2FAAction();
        setSetupData(data);
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function handleConfirm() {
    setError(null);
    startTransition(async () => {
      try {
        await enable2FAAction(code);
        setEnabled(true);
        setSetupData(null);
        setCode('');
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function handleDisable() {
    setError(null);
    startTransition(async () => {
      try {
        await disable2FAAction(password);
        setEnabled(false);
        setPassword('');
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="bg-bg-card border border-gold-border rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-text-primary">Autenticação em dois fatores</h3>
            <p className="text-text-secondary text-sm mt-1">
              {enabled
                ? 'Ativada — precisas de um código da app de autenticação para entrar.'
                : 'Desativada — protege a tua conta pedindo um código extra ao entrar.'}
            </p>
          </div>
          <span className={`text-xs px-2 py-1 rounded ${enabled ? 'bg-green-500/20 text-green-400' : 'bg-gold-border text-text-muted'}`}>
            {enabled ? 'Ativo' : 'Inativo'}
          </span>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!enabled && !setupData && (
        <Button onClick={handleStartSetup} disabled={isPending}>
          Ativar 2FA
        </Button>
      )}

      {!enabled && setupData && (
        <div className="bg-bg-card border border-gold-border rounded-lg p-5 space-y-4">
          <p className="text-text-secondary text-sm">
            1. Digitaliza este código com o Google Authenticator (ou outra app de autenticação).
          </p>
          <div className="bg-white p-3 rounded w-fit mx-auto">
            <Image src={setupData.qrCodeDataUrl} alt="QR Code 2FA" width={180} height={180} unoptimized />
          </div>
          <p className="text-text-muted text-xs text-center break-all">
            Ou introduz manualmente: <span className="text-gold">{setupData.secret}</span>
          </p>
          <p className="text-text-secondary text-sm">2. Introduz o código de 6 dígitos gerado pela app.</p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-bg-section border border-gold-border rounded px-4 py-3 text-text-primary text-center tracking-[0.3em] text-lg focus:outline-none focus:border-gold"
            placeholder="000000"
          />
          <Button onClick={handleConfirm} disabled={isPending || code.length !== 6}>
            Confirmar e ativar
          </Button>
        </div>
      )}

      {enabled && (
        <div className="bg-bg-card border border-gold-border rounded-lg p-5 space-y-4">
          <p className="text-text-secondary text-sm">Para desativar, confirma a tua password.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-bg-section border border-gold-border rounded px-4 py-3 text-text-primary focus:outline-none focus:border-gold"
            placeholder="Password"
          />
          <Button onClick={handleDisable} disabled={isPending || !password} variant="danger">
            Desativar 2FA
          </Button>
        </div>
      )}
    </div>
  );
}
