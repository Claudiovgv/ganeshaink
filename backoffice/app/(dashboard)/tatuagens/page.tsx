import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import TradeStatsClient from '../TradeStatsClient';
import { canSeeTradeStats, StatsForbidden } from '../statsAccess';

export const metadata = { title: 'Tatuagens' };

export default async function TatuagensPage() {
  const user = await api.auth.me().catch(() => null);
  if (!canSeeTradeStats(user, 'tattoo')) {
    return <StatsForbidden title="Tatuagens" />;
  }

  const initial = await api.stats.getTrade('tattoo', 'month', 0).catch(() => null);

  return (
    <div>
      <TopBar title="Tatuagens" />
      <div className="p-6">
        {initial
          ? <TradeStatsClient slug="tattoo" personLabel="Tatuador" initial={initial} />
          : <p className="text-text-secondary">Não foi possível carregar as estatísticas.</p>
        }
      </div>
    </div>
  );
}
