import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import SegurancaClient from './SegurancaClient';

export const metadata = { title: 'Segurança' };

export default async function SegurancaPage() {
  const user = await api.auth.me().catch(() => null);
  return (
    <div>
      <TopBar title="Segurança" />
      <div className="p-6 max-w-md">
        {user
          ? <SegurancaClient twoFactorEnabled={user.twoFactorEnabled ?? false} />
          : <p className="text-text-secondary">Não foi possível carregar as definições de segurança.</p>
        }
      </div>
    </div>
  );
}
