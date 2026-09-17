import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import TradeStatsClient from '../TradeStatsClient';
import { canSeeTradeStats, StatsForbidden } from '../statsAccess';

export const metadata = { title: 'Estética' };

export default async function NailsPage() {
  const user = await api.auth.me().catch(() => null);
  if (!canSeeTradeStats(user, 'nails')) {
    return <StatsForbidden title="Estética" />;
  }

  const initial = await api.stats.getTrade('nails', 'month', 0).catch(() => null);

  return (
    <div>
      <TopBar title="Estética" />
      <div className="p-6">
        {initial
          ? <TradeStatsClient slug="nails" personLabel="Estética" initial={initial} />
          : <p className="text-text-secondary">Não foi possível carregar as estatísticas.</p>
        }
      </div>
    </div>
  );
}
