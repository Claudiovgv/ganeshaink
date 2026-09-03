'use client';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import type { StatsPeriod, BarbershopStatsResponse } from '@/lib/types';
import { fetchBarbershopStatsAction } from '@/lib/actions';
import { toLisbon, formatLisbon } from '@/lib/timezone';

const PERIOD_LABELS: Record<StatsPeriod, string> = { week: 'Semana', month: 'Mês', year: 'Ano' };

function money(n: number) {
  return `${n.toFixed(2)} €`;
}

function formatRange(period: StatsPeriod, range: { start: string; end: string }) {
  if (period === 'year') return toLisbon(range.start).getFullYear().toString();
  if (period === 'month') {
    const label = formatLisbon(range.start, 'MMMM yyyy');
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
  return `${formatLisbon(range.start, 'dd/MM')} — ${formatLisbon(range.end, 'dd/MM')}`;
}

type Tab = 'material' | 'payout';

export default function BarbeariaClient({ initial }: { initial: BarbershopStatsResponse }) {
  const [data, setData] = useState(initial);
  const [period, setPeriod] = useState<StatsPeriod>(initial.period);
  const [offset, setOffset] = useState(initial.offset);
  const [tab, setTab] = useState<Tab>('material');
  const [isPending, startTransition] = useTransition();

  function load(nextPeriod: StatsPeriod, nextOffset: number) {
    startTransition(async () => {
      const result = await fetchBarbershopStatsAction(nextPeriod, nextOffset);
      setData(result);
      setPeriod(nextPeriod);
      setOffset(nextOffset);
    });
  }

  const missingConfig = data.barbers.filter((b) => !b.hasConfig);

  return (
    <div className="space-y-6">
      {/* Período */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as StatsPeriod[]).map((p) => (
            <button
              key={p}
              onClick={() => load(p, 0)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                period === p ? 'bg-gold text-bg-primary' : 'border border-gold-border text-text-secondary hover:border-gold hover:text-gold'
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => load(period, offset - 1)}
            disabled={isPending}
            className="w-9 h-9 flex items-center justify-center border border-gold-border rounded text-text-secondary hover:border-gold hover:text-gold disabled:opacity-40"
          >
            ‹
          </button>
          <span className="text-sm text-text-primary font-medium min-w-[10rem] text-center">
            {formatRange(period, data.range)}
          </span>
          <button
            onClick={() => load(period, offset + 1)}
            disabled={isPending || offset >= 0}
            className="w-9 h-9 flex items-center justify-center border border-gold-border rounded text-text-secondary hover:border-gold hover:text-gold disabled:opacity-40"
          >
            ›
          </button>
          {offset !== 0 && (
            <button onClick={() => load(period, 0)} className="text-xs text-gold hover:underline">Hoje</button>
          )}
        </div>
      </div>

      <p className="text-text-muted text-xs -mt-2">Baseado em marcações concluídas (ou confirmadas já passadas) da Barbearia.</p>

      {/* Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Receita</p>
          <p className="text-2xl font-display font-bold text-gold">{money(data.totals.revenue)}</p>
        </div>
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Marcações</p>
          <p className="text-2xl font-display font-bold text-text-primary">{data.totals.count}</p>
        </div>
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Material</p>
          <p className="text-2xl font-display font-bold text-text-primary">{money(data.totals.materialCost)}</p>
        </div>
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Total barbeiros</p>
          <p className="text-2xl font-display font-bold text-text-primary">{money(data.totals.barberAmount)}</p>
        </div>
      </div>

      {missingConfig.length > 0 && (
        <p className="text-amber-400 text-sm bg-amber-500/10 border border-amber-500/30 rounded px-3 py-2">
          {missingConfig.map((b) => b.name).join(', ')} sem valor de material/% configurado —{' '}
          <Link href="/definicoes/contas-barbearia" className="underline">definir agora</Link>.
        </p>
      )}

      {/* Abas Material / % Barbeiro */}
      <div className="bg-bg-card border border-gold-border rounded-lg overflow-hidden">
        <div className="flex border-b border-gold-border/30">
          <button
            onClick={() => setTab('material')}
            className={`px-5 py-3 text-sm font-medium transition-colors ${
              tab === 'material' ? 'text-gold border-b-2 border-gold' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Material
          </button>
          <button
            onClick={() => setTab('payout')}
            className={`px-5 py-3 text-sm font-medium transition-colors ${
              tab === 'payout' ? 'text-gold border-b-2 border-gold' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Estúdio &amp; Barbeiro
          </button>
        </div>

        {data.barbers.length === 0 ? (
          <p className="text-text-secondary text-sm p-5">Sem marcações da Barbearia neste período.</p>
        ) : tab === 'material' ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-border/30 bg-bg-section">
                <th className="text-left px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Barbeiro</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Marcações</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Valor/marcação</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Total material</th>
              </tr>
            </thead>
            <tbody>
              {data.barbers.map((b) => (
                <tr key={b.employeeId} className="border-b border-gold-border/10 last:border-0">
                  <td className="px-5 py-2.5 text-text-primary">{b.name}</td>
                  <td className="px-5 py-2.5 text-text-secondary text-right">{b.count}</td>
                  <td className="px-5 py-2.5 text-text-secondary text-right">
                    {b.hasConfig ? money(b.materialCost / b.count) : '—'}
                  </td>
                  <td className="px-5 py-2.5 text-gold text-right font-medium">
                    {b.hasConfig ? money(b.materialCost) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-border/30 bg-bg-section">
                <th className="text-left px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Barbeiro</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Receita líquida</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">% Estúdio</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Estúdio</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Barbeiro</th>
              </tr>
            </thead>
            <tbody>
              {data.barbers.map((b) => (
                <tr key={b.employeeId} className="border-b border-gold-border/10 last:border-0">
                  <td className="px-5 py-2.5 text-text-primary">{b.name}</td>
                  <td className="px-5 py-2.5 text-text-secondary text-right">{money(b.netRevenue)}</td>
                  <td className="px-5 py-2.5 text-text-secondary text-right">
                    {b.hasConfig ? `${b.studioPercent}%` : '—'}
                  </td>
                  <td className="px-5 py-2.5 text-text-secondary text-right">
                    {b.hasConfig ? money(b.studioAmount) : '—'}
                  </td>
                  <td className="px-5 py-2.5 text-gold text-right font-medium">
                    {b.hasConfig ? money(b.barberAmount) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
