import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import { canSeeTradeStats, StatsForbidden } from '../statsAccess';

export const metadata = { title: 'Flash Party' };

function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function flashIdsOf(rsvp: { flashId: string; flashIds?: string[] }) {
  if (rsvp.flashIds?.length) return rsvp.flashIds;
  return String(rsvp.flashId || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
}

function FlashPicks({ rsvp }: { rsvp: { flashId: string; flashIds?: string[]; flashLabel: string } }) {
  const ids = flashIdsOf(rsvp);
  if (ids.includes('own')) {
    return <span className="text-text-secondary">{rsvp.flashLabel || 'Levo a minha'}</span>;
  }
  if (!ids.length) {
    return <span className="text-text-secondary">{rsvp.flashLabel || '—'}</span>;
  }
  return (
    <div className="flex flex-wrap items-center gap-2">
      {ids.map((id) => (
        <figure key={id} className="flex flex-col items-center gap-1">
          <img
            src={`/images/halloween-flashes/${id}.webp`}
            alt={id.replace('flash-', 'Flash ')}
            className="h-14 w-14 object-contain bg-black p-1 border border-gold-border"
          />
          <figcaption className="text-[10px] uppercase tracking-wider text-text-muted">
            {id.replace('flash-', 'Flash ')}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default async function FlashPartyPage() {
  const user = await api.auth.me().catch(() => null);
  if (!canSeeTradeStats(user, 'tattoo')) {
    return <StatsForbidden title="Flash Party" />;
  }

  const data = await api.campaigns.halloweenFlash().catch(() => ({
    clicks: 0,
    total: 0,
    byFlash: [],
    rsvps: [],
  }));

  const rsvps = data.rsvps.slice().reverse();
  const totalValue = data.rsvps.reduce((sum, rsvp) => sum + (rsvp.price ?? 0), 0);
  const demand = new Map<string, number>();
  for (const rsvp of data.rsvps) {
    for (const id of flashIdsOf(rsvp)) {
      demand.set(id, (demand.get(id) || 0) + 1);
    }
  }
  const popular = Array.from(demand.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  return (
    <div>
      <TopBar title="Flash Party" />
      <div className="p-6 space-y-6">
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-3xl font-semibold text-text-primary">{data.total}</p>
            <p className="mt-1 text-sm text-text-secondary">reservas «Vou»</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-text-primary">{data.clicks}</p>
            <p className="mt-1 text-sm text-text-secondary">abriram «Conta comigo»</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-text-primary">{totalValue} €</p>
            <p className="mt-1 text-sm text-text-secondary">valor das flashes</p>
          </div>
        </div>

        {popular.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">Flashes mais pedidas</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {popular.map(([id, count]) => (
                <div key={id} className="flex items-center gap-2 border border-gold-border rounded px-2 py-1.5">
                  {id === 'own' ? (
                    <span className="text-sm text-text-primary">Levo a minha</span>
                  ) : (
                    <>
                      <img
                        src={`/images/halloween-flashes/${id}.webp`}
                        alt=""
                        className="h-8 w-8 object-contain bg-black"
                      />
                      <span className="text-sm text-text-primary">{id.replace('flash-', 'Flash ')}</span>
                    </>
                  )}
                  <span className="text-sm font-semibold text-text-primary">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="overflow-x-auto border border-gold-border rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-border bg-bg-card text-text-secondary">
                <th className="text-left p-3 font-medium">Primeiro nome</th>
                <th className="text-left p-3 font-medium">Último nome</th>
                <th className="text-left p-3 font-medium">Flashes</th>
                <th className="text-right p-3 font-medium">Quantidade</th>
                <th className="text-right p-3 font-medium">Valor</th>
                <th className="text-right p-3 font-medium">Quando</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp) => (
                <tr key={rsvp.id} className="border-b border-gold-border last:border-0 align-top">
                  <td className="p-3 text-text-primary">{rsvp.firstName}</td>
                  <td className="p-3 text-text-primary">{rsvp.lastName}</td>
                  <td className="p-3">
                    <FlashPicks rsvp={rsvp} />
                  </td>
                  <td className="p-3 text-right text-text-secondary">{rsvp.quantity ?? 1}</td>
                  <td className="p-3 text-right text-text-primary">{rsvp.price ? `${rsvp.price} €` : '—'}</td>
                  <td className="p-3 text-right text-text-secondary">{formatWhen(rsvp.createdAt)}</td>
                </tr>
              ))}
              {rsvps.length === 0 && (
                <tr>
                  <td className="p-4 text-text-muted" colSpan={6}>
                    Ainda ninguém disse «Vou».
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
