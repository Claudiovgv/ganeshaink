import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import ServicosClient from './ServicosClient';

export const metadata = { title: 'Serviços' };

export default async function ServicosPage() {
  let role: 'admin' | 'employee' = 'employee';
  try {
    const user = await api.auth.me();
    role = user.role as 'admin' | 'employee';
  } catch {
    // fallback
  }

  const services = role === 'admin'
    ? await api.services.adminList().catch(() => [])
    : await api.services.employeeList().catch(() => []);

  return (
    <div>
      <TopBar title="Serviços" />
      <div className="p-6">
        <ServicosClient initial={services} role={role} />
      </div>
    </div>
  );
}
