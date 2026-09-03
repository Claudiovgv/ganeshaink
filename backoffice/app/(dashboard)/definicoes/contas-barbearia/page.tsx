import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import ContasBarbeariaClient from './ContasBarbeariaClient';

export const metadata = { title: 'Contas Barbearia — Definições' };

export default async function ContasBarbeariaPage() {
  const user = await api.auth.me().catch(() => null);
  const allowed = user && (user.role === 'superadmin' || (user.role === 'admin' && user.permissions?.manage_settings));
  if (!allowed) {
    return (
      <div>
        <TopBar title="Definições" />
        <div className="p-6 text-text-secondary">Não tens permissão para aceder a esta área.</div>
      </div>
    );
  }

  const [employees, categories] = await Promise.all([
    api.employees.list().catch(() => []),
    api.categories.adminList().catch(() => []),
  ]);

  const barbershop = categories.find((c) => c.slug === 'barbershop');
  const barbershopCategoryIds = new Set<number>(
    barbershop
      ? [barbershop.id, ...categories.filter((c) => c.parentId === barbershop.id).map((c) => c.id)]
      : []
  );
  const barbers = employees.filter(
    (e) => e.isActive && e.services.some((s) => barbershopCategoryIds.has(s.service.categoryId))
  );

  return (
    <div>
      <TopBar title="Contas Barbearia" />
      <div className="p-6 max-w-2xl">
        <p className="text-text-secondary text-sm mb-4">
          Valor de material por marcação e % da receita líquida que fica retida para o estúdio (o barbeiro recebe o resto) — usados na página Análise → Barbearia.
        </p>
        {barbers.length === 0
          ? <p className="text-text-secondary">Nenhum barbeiro ativo com serviços de Barbearia atribuídos.</p>
          : <ContasBarbeariaClient initial={barbers} />
        }
      </div>
    </div>
  );
}
