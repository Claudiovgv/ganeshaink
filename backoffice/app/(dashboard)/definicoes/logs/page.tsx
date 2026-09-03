import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import LogsClient from './LogsClient';

export const metadata = { title: 'Logs — Definições' };

export default async function LogsPage() {
  const user = await api.auth.me().catch(() => null);
  if (!user || user.role !== 'superadmin') {
    return (
      <div>
        <TopBar title="Definições" />
        <div className="p-6 text-text-secondary">Acesso restrito ao superadmin.</div>
      </div>
    );
  }

  const [data, blocks] = await Promise.all([
    api.logs.list({ page: 1 }).catch(() => null),
    api.logs.loginBlocks().catch(() => ({ blocks: [] })),
  ]);

  return (
    <div>
      <TopBar title="Logs" />
      <div className="p-6">
        {data
          ? <LogsClient initial={{ ...data, blockedLogins: blocks.blocks.length }} />
          : <p className="text-text-secondary">Não foi possível carregar os logs.</p>
        }
      </div>
    </div>
  );
}
