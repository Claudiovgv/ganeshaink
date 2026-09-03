import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import ConsultasClient from '../consultas/ConsultasClient';

export const metadata = { title: 'Piercings' };

export default async function PiercingsPage() {
  const user = await api.auth.me().catch(() => null);
  const allowed = user && (
    user.role === 'superadmin'
    || (user.role === 'admin' && user.permissions?.manage_appointments)
  );
  if (!allowed) {
    return (
      <div>
        <TopBar title="Piercings" />
        <div className="p-6 text-text-secondary">Não tens permissão para aceder a esta área.</div>
      </div>
    );
  }

  const [consultations, employees] = await Promise.all([
    api.consultations.list({ category: 'piercing' }).catch(() => []),
    api.employees.list().catch(() => []),
  ]);
  const pending = consultations.filter((c) => c.status === 'pending').length;

  return (
    <div>
      <TopBar title={`Piercings${pending > 0 ? ` (${pending} pendentes)` : ''}`} />
      <div className="p-6">
        <p className="text-text-secondary text-sm mb-4">
          Pedidos de piercing do site — confirma aqui a marcação. O contacto do cliente é obrigatório.
        </p>
        <ConsultasClient
          initial={consultations}
          employees={employees}
          emptyMessage="Sem pedidos de piercing."
          scheduleTitle="Confirmar piercing"
          confirmLabel="Confirmar"
        />
      </div>
    </div>
  );
}
