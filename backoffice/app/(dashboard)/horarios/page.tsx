import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import HorariosClient from './HorariosClient';

export const metadata = { title: 'Horários' };

export default async function HorariosPage() {
  const employees = await api.adminSchedules.list().catch(() => []);
  return (
    <div>
      <TopBar title="Horários da Equipa" />
      <div className="p-6">
        <HorariosClient employees={employees} />
      </div>
    </div>
  );
}
