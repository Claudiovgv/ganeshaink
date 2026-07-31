import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import UtilizadoresClient from './UtilizadoresClient';

export const metadata = { title: 'Utilizadores' };

export default async function UtilizadoresPage() {
  const me = await api.auth.me().catch(() => null);
  if (!me || me.role !== 'superadmin') {
    return (
      <div>
        <TopBar title="Utilizadores" />
        <div className="p-6 text-text-secondary">Acesso restrito ao superadmin.</div>
      </div>
    );
  }

  const users = await api.users.list().catch(() => []);

  return (
    <div>
      <TopBar title="Utilizadores" />
      <div className="p-6">
        <UtilizadoresClient initial={users} currentUserId={me.id} />
      </div>
    </div>
  );
}
