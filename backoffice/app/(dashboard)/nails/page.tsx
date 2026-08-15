import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';

export const metadata = { title: 'Nails' };

export default async function NailsPage() {
  const user = await api.auth.me().catch(() => null);
  const allowed = user && (user.role === 'superadmin' || (user.role === 'admin' && user.permissions?.view_stats));
  if (!allowed) {
    return (
      <div>
        <TopBar title="Nails" />
        <div className="p-6 text-text-secondary">Não tens permissão para aceder a esta área.</div>
      </div>
    );
  }

  return (
    <div>
      <TopBar title="Nails" />
      <div className="p-6">
        <div className="bg-bg-card border border-gold-border rounded-lg p-8 text-center">
          <p className="text-text-primary font-semibold mb-1">Em breve</p>
          <p className="text-text-secondary text-sm">Esta área ainda não está disponível.</p>
        </div>
      </div>
    </div>
  );
}
