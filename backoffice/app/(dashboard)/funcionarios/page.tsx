import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import FuncionariosClient from './FuncionariosClient';

export const metadata = { title: 'Funcionários' };

export default async function FuncionariosPage() {
  const employees = await api.employees.list().catch(() => []);
  return (
    <div>
      <TopBar title="Funcionários" />
      <div className="p-6">
        <FuncionariosClient initial={employees} />
      </div>
    </div>
  );
}
