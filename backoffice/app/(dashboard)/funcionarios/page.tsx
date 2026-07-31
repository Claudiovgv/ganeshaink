import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import FuncionariosClient from './FuncionariosClient';

export const metadata = { title: 'Funcionários' };

export default async function FuncionariosPage() {
  const [employees, services] = await Promise.all([
    api.employees.list().catch(() => []),
    api.services.adminList().catch(() => []),
  ]);
  return (
    <div>
      <TopBar title="Funcionários" />
      <div className="p-6">
        <FuncionariosClient initial={employees} services={services} />
      </div>
    </div>
  );
}
