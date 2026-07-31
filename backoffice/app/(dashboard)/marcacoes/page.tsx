import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import AppointmentsClient from './AppointmentsClient';

export const metadata = { title: 'Marcações' };

export default async function MarcacoesPage() {
  const [appointments, employees, services, clients] = await Promise.all([
    api.appointments.list().catch(() => []),
    api.employees.list().catch(() => []),
    api.services.adminList().catch(() => []),
    api.clients.list().catch(() => []),
  ]);

  return (
    <div>
      <TopBar title="Marcações" />
      <div className="p-6">
        <AppointmentsClient
          initial={appointments}
          employees={employees}
          services={services}
          clients={clients}
        />
      </div>
    </div>
  );
}
