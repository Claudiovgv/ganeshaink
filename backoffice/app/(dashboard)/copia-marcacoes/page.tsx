import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import CopiaMarcacoesClient from './CopiaMarcacoesClient';

export const metadata = { title: 'Cópia de marcações' };

export default async function CopiaMarcacoesPage() {
  const user = await api.auth.me().catch(() => null);
  const allowed = user && (user.role === 'superadmin' || (user.role === 'admin' && user.permissions?.manage_appointments));
  if (!allowed) {
    return (
      <div>
        <TopBar title="Cópia de marcações" />
        <div className="p-6 text-text-secondary">Não tens permissão para aceder a esta área.</div>
      </div>
    );
  }

  return (
    <div>
      <TopBar title="Cópia de marcações" />
      <div className="p-6">
        <CopiaMarcacoesClient />
      </div>
    </div>
  );
}
