import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import EstatisticasClient from './EstatisticasClient';

import { canSeeGeneralStats, StatsForbidden } from '../statsAccess';

export const metadata = { title: 'Estatísticas' };

export default async function EstatisticasPage() {
  const user = await api.auth.me().catch(() => null);
  if (!canSeeGeneralStats(user)) {
    return <StatsForbidden title="Estatísticas" />;
  }

  const initial = await api.stats.get('month', 0).catch(() => null);

  return (
    <div>
      <TopBar title="Estatísticas" />
      <div className="p-6">
        {initial
          ? <EstatisticasClient initial={initial} />
          : <p className="text-text-secondary">Não foi possível carregar as estatísticas.</p>
        }
      </div>
    </div>
  );
}
