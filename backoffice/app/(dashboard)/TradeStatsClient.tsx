'use client';
import { useState, useTransition } from 'react';
import type { StatsPeriod, BarbershopStatsResponse } from '@/lib/types';
import { fetchTradeStatsAction } from '@/lib/actions';
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

export default function TradeStatsClient({
  slug,
  personLabel,
  initial,
}: {
  slug: string;
  personLabel: string;
  initial: BarbershopStatsResponse;
}) {
  const [data, setData] = useState(initial);
  const [period, setPeriod] = useState<StatsPeriod>(initial.period);
  const [offset, setOffset] = useState(initial.offset);
  const [tab, setTab] = useState<Tab>('material');
  const [isPending, startTransition] = useTransition();
  const people = data.people || data.barbers || [];

  function load(nextPeriod: StatsPeriod, nextOffset: number) {
    startTransition(async () => {
      const result = await fetchTradeStatsAction(slug, nextPeriod, nextOffset);
      setData(result);
      setPeriod(nextPeriod);
      setOffset(nextOffset);
    });
  }

  const missingConfig = people.filter((b) => !b.hasConfig);

  return (
    <div className="space-y-6">
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

      {missingConfig.length > 0 && (
        <p className="text-amber-400 text-sm">
          Falta configurar material/% de estúdio para: {missingConfig.map((b) => b.name).join(', ')}.
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setTab('material')}
          className={`px-3 py-1.5 rounded text-sm ${tab === 'material' ? 'bg-gold text-bg-primary' : 'text-text-secondary border border-gold-border'}`}
        >
          Material
        </button>
        <button
          onClick={() => setTab('payout')}
          className={`px-3 py-1.5 rounded text-sm ${tab === 'payout' ? 'bg-gold text-bg-primary' : 'text-text-secondary border border-gold-border'}`}
        >
          {personLabel}
        </button>
      </div>

      <div className="overflow-x-auto border border-gold-border rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold-border bg-bg-card text-text-secondary">
              <th className="text-left p-3 font-medium">Nome</th>
              <th className="text-right p-3 font-medium">Marcações</th>
              <th className="text-right p-3 font-medium">Receita</th>
              {tab === 'material' ? (
                <>
                  <th className="text-right p-3 font-medium">Material</th>
                  <th className="text-right p-3 font-medium">Líquido</th>
                </>
              ) : (
                <>
                  <th className="text-right p-3 font-medium">Estúdio</th>
                  <th className="text-right p-3 font-medium">{personLabel}</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {people.map((row) => (
              <tr key={row.employeeId} className="border-b border-gold-border last:border-0">
                <td className="p-3 text-text-primary">{row.name}</td>
                <td className="p-3 text-right text-text-secondary">{row.count}</td>
                <td className="p-3 text-right text-text-primary">{money(row.revenue)}</td>
                {tab === 'material' ? (
                  <>
                    <td className="p-3 text-right text-text-secondary">{money(row.materialCost)}</td>
                    <td className="p-3 text-right text-text-primary">{money(row.netRevenue)}</td>
                  </>
                ) : (
                  <>
                    <td className="p-3 text-right text-text-secondary">{money(row.studioAmount)}</td>
                    <td className="p-3 text-right text-text-primary">{money(row.barberAmount)}</td>
                  </>
                )}
              </tr>
            ))}
            {people.length === 0 && (
              <tr>
                <td className="p-4 text-text-muted" colSpan={5}>Ainda não há marcações neste período.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
