import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import EstatisticasClient from './EstatisticasClient';

export const metadata = { title: 'Estatísticas' };

export default async function EstatisticasPage() {
  const user = await api.auth.me().catch(() => null);
  const allowed = user && (user.role === 'superadmin' || (user.role === 'admin' && user.permissions?.view_stats));
  if (!allowed) {
    return (
      <div>
        <TopBar title="Estatísticas" />
        <div className="p-6 text-text-secondary">Não tens permissão para aceder a esta área.</div>
      </div>
    );
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
