import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import PapeisClient from './PapeisClient';

export const metadata = { title: 'Papéis' };

export default async function PapeisPage() {
  const me = await api.auth.me().catch(() => null);
  if (!me || me.role !== 'superadmin') {
    return (
      <div>
        <TopBar title="Papéis" />
        <div className="p-6 text-text-secondary">Acesso restrito ao superadmin.</div>
      </div>
    );
  }

  const roles = await api.roles.get().catch(() => null);

  return (
    <div>
      <TopBar title="Papéis" />
      <div className="p-6 max-w-2xl">
        {roles
          ? <PapeisClient initial={roles} />
          : <p className="text-text-secondary">Não foi possível carregar os papéis.</p>
        }
      </div>
    </div>
  );
}
