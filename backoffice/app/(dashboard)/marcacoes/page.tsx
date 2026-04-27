import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import AppointmentsClient from './AppointmentsClient';

export const metadata = { title: 'Marcações' };

export default async function MarcacoesPage() {
  const appointments = await api.appointments.list().catch(() => []);
  return (
    <div>
      <TopBar title="Marcações" />
      <div className="p-6">
        <AppointmentsClient initial={appointments} />
      </div>
    </div>
  );
}
