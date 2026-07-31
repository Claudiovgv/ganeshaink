'use client';
import { useState, useTransition } from 'react';
import type { ServiceCategory, StatsPeriod, StatsResponse } from '@/lib/types';
import { fetchStatsAction } from '@/lib/actions';
import { toLisbon, formatLisbon } from '@/lib/timezone';

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  barbershop: 'Barbearia', tattoo: 'Tatuagem', piercing: 'Piercing', nails: 'Unhas',
};
const CATEGORY_COLORS: Record<ServiceCategory, string> = {
  barbershop: 'bg-blue-500', tattoo: 'bg-purple-500', piercing: 'bg-emerald-500', nails: 'bg-pink-500',
};

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

export default function EstatisticasClient({ initial }: { initial: StatsResponse }) {
  const [data, setData] = useState(initial);
  const [period, setPeriod] = useState<StatsPeriod>(initial.period);
  const [offset, setOffset] = useState(initial.offset);
  const [isPending, startTransition] = useTransition();

  function load(nextPeriod: StatsPeriod, nextOffset: number) {
    startTransition(async () => {
      const result = await fetchStatsAction(nextPeriod, nextOffset);
      setData(result);
      setPeriod(nextPeriod);
      setOffset(nextOffset);
    });
  }

  const maxCategoryRevenue = Math.max(1, ...data.byCategory.map((c) => c.revenue));

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

      <p className="text-text-muted text-xs -mt-2">Baseado em marcações com estado &quot;concluída&quot;.</p>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Receita</p>
          <p className="text-2xl font-display font-bold text-gold">{money(data.totalRevenue)}</p>
        </div>
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Marcações</p>
          <p className="text-2xl font-display font-bold text-text-primary">{data.totalAppointments}</p>
        </div>
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Ticket médio</p>
          <p className="text-2xl font-display font-bold text-text-primary">{money(data.averageTicket)}</p>
        </div>
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Mais pedido</p>
          <p className="text-base font-semibold text-text-primary truncate" title={data.mostRequested?.name}>
            {data.mostRequested ? data.mostRequested.name : '—'}
          </p>
          {data.mostRequested && <p className="text-text-secondary text-xs">{data.mostRequested.count}x</p>}
        </div>
      </div>

      {/* Por categoria */}
      <div className="bg-bg-card border border-gold-border rounded-lg p-5">
        <h3 className="font-semibold text-text-primary mb-4">Por área de serviço</h3>
        {data.byCategory.length === 0 ? (
          <p className="text-text-secondary text-sm">Sem marcações concluídas neste período.</p>
        ) : (
          <div className="space-y-3">
            {data.byCategory.map((c) => (
              <div key={c.category}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-primary">{CATEGORY_LABELS[c.category]}</span>
                  <span className="text-text-secondary">{money(c.revenue)} · {c.count}x</span>
                </div>
                <div className="h-2 bg-bg-section rounded-full overflow-hidden">
                  <div
                    className={`h-full ${CATEGORY_COLORS[c.category]}`}
                    style={{ width: `${(c.revenue / maxCategoryRevenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Por serviço */}
      <div className="bg-bg-card border border-gold-border rounded-lg overflow-hidden">
        <h3 className="font-semibold text-text-primary px-5 pt-5 mb-3">Por serviço</h3>
        {data.byService.length === 0 ? (
          <p className="text-text-secondary text-sm px-5 pb-5">Sem marcações concluídas neste período.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-border/30 bg-bg-section">
                <th className="text-left px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Serviço</th>
                <th className="text-left px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Categoria</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Marcações</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Receita</th>
              </tr>
            </thead>
            <tbody>
              {data.byService.map((s) => (
                <tr key={s.serviceId} className="border-b border-gold-border/10 last:border-0">
                  <td className="px-5 py-2.5 text-text-primary">{s.name}</td>
                  <td className="px-5 py-2.5 text-text-secondary text-xs">{CATEGORY_LABELS[s.category]}</td>
                  <td className="px-5 py-2.5 text-text-secondary text-right">{s.count}</td>
                  <td className="px-5 py-2.5 text-gold text-right font-medium">{money(s.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
