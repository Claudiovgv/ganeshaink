import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import ParceriasClient from './ParceriasClient';

export const metadata = { title: 'Parcerias' };

export default async function ParceriasPage() {
  const user = await api.auth.me().catch(() => null);
  const allowed = user && (user.role === 'superadmin' || (user.role === 'admin' && user.permissions?.manage_appointments));
  if (!allowed) {
    return (
      <div>
        <TopBar title="Parcerias" />
        <div className="p-6 text-text-secondary">Não tens permissão para aceder a esta área.</div>
      </div>
    );
  }

  const partnerships = await api.partnerships.list().catch(() => []);

  return (
    <div>
      <TopBar title="Parcerias" />
      <div className="p-6">
        <ParceriasClient initial={partnerships} />
      </div>
    </div>
  );
}
