import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import AdminBloqueiosClient from './AdminBloqueiosClient';

export const metadata = { title: 'Bloqueios da Equipa' };

export default async function BloqueiosEquipaPage() {
  const [blocks, employees] = await Promise.all([
    api.adminBlocks.list().catch(() => []),
    api.employees.list().catch(() => []),
  ]);

  return (
    <div>
      <TopBar title="Bloqueios da Equipa" />
      <div className="p-6 max-w-2xl">
        <AdminBloqueiosClient initial={blocks} employees={employees} />
      </div>
    </div>
  );
}
