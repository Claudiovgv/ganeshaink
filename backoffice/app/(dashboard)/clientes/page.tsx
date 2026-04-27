import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import DataTable from '@/components/DataTable';
import type { Client } from '@/lib/types';

export const metadata = { title: 'Clientes' };

export default async function ClientesPage() {
  const clients = await api.clients.list().catch(() => []);

  const columns = [
    { key: 'name', label: 'Nome', render: (c: Client) => <span className="font-medium">{c.name}</span> },
    { key: 'email', label: 'Email', render: (c: Client) => <span className="text-text-secondary text-sm">{c.email}</span> },
    { key: 'phone', label: 'Telefone', render: (c: Client) => <span className="text-text-secondary text-sm">{c.phone}</span> },
    { key: 'count', label: 'Marcações', render: (c: Client) => <span className="text-gold font-medium">{c.appointmentCount}</span> },
  ];

  return (
    <div>
      <TopBar title="Clientes" />
      <div className="p-6">
        <DataTable columns={columns} data={clients} emptyMessage="Sem clientes registados." />
      </div>
    </div>
  );
}
