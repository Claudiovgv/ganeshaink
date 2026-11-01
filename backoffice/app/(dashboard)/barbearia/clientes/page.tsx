import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import { canSeeTradeStats, StatsForbidden } from '../../statsAccess';
import BarbeariaClientesClient from './BarbeariaClientesClient';

export const metadata = { title: 'Clientes da barbearia' };

export default async function BarbeariaClientesPage() {
  const user = await api.auth.me().catch(() => null);
  if (!canSeeTradeStats(user, 'barbershop')) {
    return <StatsForbidden title="Clientes da barbearia" />;
  }

  const initial = await api.stats.getBarbershopClients().catch(() => null);

  return (
    <div>
      <TopBar title="Clientes" />
      <div className="p-6">
        {initial
          ? <BarbeariaClientesClient initial={initial} />
          : <p className="text-text-secondary">Não foi possível carregar os clientes da Barbearia.</p>}
      </div>
    </div>
  );
}
