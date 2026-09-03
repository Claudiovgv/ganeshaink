'use client';
import { useState, useTransition } from 'react';
import type { LogLevel, SystemLogEntry } from '@/lib/types';
import { clearLogsAction, fetchLoginBlocksAction, fetchLogsAction, unlockLoginsAction } from '@/lib/actions';
import { formatLisbon } from '@/lib/timezone';
import Button from '@/components/Button';

const LEVEL_STYLE: Record<LogLevel, string> = {
  info: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  warning: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  error: 'bg-red-500/15 text-red-400 border-red-500/30',
  security: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
};

const LEVELS: (LogLevel | 'all')[] = ['all', 'security', 'error', 'warning', 'info'];

function formatDate(iso: string) {
  return formatLisbon(iso, 'dd/MM/yyyy HH:mm:ss');
}

function metaPath(meta: unknown): string | null {
  if (!meta || typeof meta !== 'object') return null;
  const path = (meta as { path?: unknown }).path;
  return typeof path === 'string' && path ? path : null;
}

export default function LogsClient({ initial }: { initial: { logs: SystemLogEntry[]; total: number; page: number; pageSize: number; blockedLogins?: number } }) {
  const [logs, setLogs] = useState(initial.logs);
  const [total, setTotal] = useState(initial.total);
  const [level, setLevel] = useState<LogLevel | 'all'>('all');
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [blocks, setBlocks] = useState(initial.blockedLogins ?? 0);
  const [confirmClear, setConfirmClear] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function load(nextLevel: LogLevel | 'all', nextPage: number) {
    startTransition(async () => {
      const data = await fetchLogsAction({ level: nextLevel === 'all' ? undefined : nextLevel, page: nextPage });
      setLogs(data.logs);
      setTotal(data.total);
      const lock = await fetchLoginBlocksAction().catch(() => ({ blocks: [] }));
      setBlocks(lock.blocks.length);
    });
  }

  function handleClear() {
    startTransition(async () => {
      await clearLogsAction();
      setConfirmClear(false);
      setNotice('Log limpo.');
      setPage(1);
      load(level, 1);
    });
  }

  function handleUnlock() {
    startTransition(async () => {
      await unlockLoginsAction();
      setNotice('Bloqueios de login limpos. Já se pode voltar a entrar.');
      const lock = await fetchLoginBlocksAction().catch(() => ({ blocks: [] }));
      setBlocks(lock.blocks.length);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => { setLevel(l); setPage(1); load(l, 1); }}
            className={`px-3 py-1.5 rounded text-xs border transition-colors ${
              level === l ? 'bg-gold text-bg-primary border-gold font-semibold' : 'border-gold-border text-text-secondary hover:border-gold hover:text-gold'
            }`}
          >
            {l === 'all' ? 'Todos' : l}
          </button>
        ))}
        <div className="ml-auto flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={handleUnlock} disabled={isPending}>
            Desbloquear logins{blocks > 0 ? ` (${blocks})` : ''}
          </Button>
          {confirmClear ? (
            <>
              <Button size="sm" variant="danger" onClick={handleClear} disabled={isPending} loading={isPending}>
                Confirmar limpar
              </Button>
              <Button size="sm" variant="outline" onClick={() => setConfirmClear(false)} disabled={isPending}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button size="sm" variant="danger" onClick={() => setConfirmClear(true)} disabled={isPending}>
              Limpar log
            </Button>
          )}
        </div>
      </div>

      {notice && <p className="text-emerald-400 text-sm">{notice}</p>}

      <div className="bg-bg-card border border-gold-border rounded-lg overflow-hidden">
        {logs.length === 0 ? (
          <p className="p-6 text-text-secondary text-sm text-center">Sem registos.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-gold-border/20 last:border-0">
                  <td className="px-4 py-3 whitespace-nowrap text-text-muted text-xs align-top">{formatDate(log.createdAt)}</td>
                  <td className="px-4 py-3 align-top">
                    <span className={`text-xs px-2 py-0.5 rounded border ${LEVEL_STYLE[log.level]}`}>{log.level}</span>
                  </td>
                  <td className="px-4 py-3 align-top text-text-muted text-xs whitespace-nowrap">{log.category}</td>
                  <td className="px-4 py-3 align-top text-text-primary">
                    {log.message}
                    {metaPath(log.meta) && (
                      <span className="block text-text-muted text-xs mt-0.5">{metaPath(log.meta)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-text-muted text-xs whitespace-nowrap">{log.ip ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>{total} registos</span>
        <div className="flex gap-2">
          <button
            disabled={page <= 1 || isPending}
            onClick={() => { const p = page - 1; setPage(p); load(level, p); }}
            className="px-3 py-1.5 border border-gold-border rounded disabled:opacity-40"
          >
            Anterior
          </button>
          <button
            disabled={page * 50 >= total || isPending}
            onClick={() => { const p = page + 1; setPage(p); load(level, p); }}
            className="px-3 py-1.5 border border-gold-border rounded disabled:opacity-40"
          >
            Seguinte
          </button>
        </div>
      </div>
    </div>
  );
}
