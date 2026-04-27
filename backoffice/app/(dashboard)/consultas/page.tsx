import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import ConsultasClient from './ConsultasClient';

export const metadata = { title: 'Consultas' };

export default async function ConsultasPage() {
  const [consultations, employees] = await Promise.all([
    api.consultations.list().catch(() => []),
    api.employees.list().catch(() => []),
  ]);
  const pending = consultations.filter((c) => c.status === 'pending').length;

  return (
    <div>
      <TopBar title={`Consultas${pending > 0 ? ` (${pending} pendentes)` : ''}`} />
      <div className="p-6">
        <ConsultasClient initial={consultations} employees={employees} />
      </div>
    </div>
  );
}
