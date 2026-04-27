import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import BloqueiosClient from './BloqueiosClient';

export const metadata = { title: 'Bloqueios' };

export default async function BloqueiosPage() {
  const blocks = await api.timeBlocks.list().catch(() => []);
  return (
    <div>
      <TopBar title="Bloqueios / Férias" />
      <div className="p-6 max-w-2xl">
        <BloqueiosClient initial={blocks} />
      </div>
    </div>
  );
}
