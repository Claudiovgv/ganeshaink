import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import ClientesClient from './ClientesClient';

export const metadata = { title: 'Clientes' };

export default async function ClientesPage() {
  const clients = await api.clients.list().catch(() => []);

  return (
    <div>
      <TopBar title="Clientes" />
      <div className="p-6">
        <ClientesClient initial={clients} />
      </div>
    </div>
  );
}
