import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import BarbeariaClient from './BarbeariaClient';

export const metadata = { title: 'Barbearia' };

export default async function BarbeariaPage() {
  const user = await api.auth.me().catch(() => null);
  const allowed = user && (user.role === 'superadmin' || (user.role === 'admin' && user.permissions?.view_stats));
  if (!allowed) {
    return (
      <div>
        <TopBar title="Barbearia" />
        <div className="p-6 text-text-secondary">Não tens permissão para aceder a esta área.</div>
      </div>
    );
  }

  const initial = await api.stats.getBarbershop('month', 0).catch(() => null);

  return (
    <div>
      <TopBar title="Barbearia" />
      <div className="p-6">
        {initial
          ? <BarbeariaClient initial={initial} />
          : <p className="text-text-secondary">Não foi possível carregar os dados da Barbearia.</p>
        }
      </div>
    </div>
  );
}
