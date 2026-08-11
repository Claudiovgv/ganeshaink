import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import ServicosClient from './ServicosClient';

export const metadata = { title: 'Serviços' };

export default async function ServicosPage() {
  let role: 'superadmin' | 'admin' | 'employee' = 'employee';
  try {
    const user = await api.auth.me();
    role = user.role as 'superadmin' | 'admin' | 'employee';
  } catch {
    // fallback
  }

  const services = role === 'admin' || role === 'superadmin'
    ? await api.services.adminList().catch(() => [])
    : await api.services.employeeList().catch(() => []);

  // Se a conta não tiver perfil de funcionário associado, fica undefined e a secção não aparece.
  const myOrder = await api.services.myOrder().catch(() => undefined);

  const employees = role === 'superadmin'
    ? await api.employees.list().catch(() => [])
    : [];

  // Os separadores/formulário mostram categorias "folha" — as que não têm
  // subcategorias são elas próprias a folha; as que têm, mostram os filhos
  // (é aí que os serviços devem ficar). Exceção: se a categoria-mãe ainda
  // tiver serviços diretamente nela (de antes de ganhar subcategorias),
  // mantém-se visível também, para não desaparecerem do ecrã.
  const tree = await api.categories.list().catch(() => []);
  const directCounts = services.reduce((acc, s) => {
    acc[s.categoryId] = (acc[s.categoryId] ?? 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  const categories = tree.flatMap((cat) => {
    if (!cat.children || cat.children.length === 0) return [cat];
    const children = cat.children.map((child) => ({ ...child, name: `${cat.name} — ${child.name}` }));
    return directCounts[cat.id] > 0 ? [{ ...cat, name: `${cat.name} (por organizar)` }, ...children] : children;
  });

  return (
    <div>
      <TopBar title="Serviços" />
      <div className="p-6">
        <ServicosClient initial={services} role={role} myOrder={myOrder} employees={employees} categories={categories} />
      </div>
    </div>
  );
}
