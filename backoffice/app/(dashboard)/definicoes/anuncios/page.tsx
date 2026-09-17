import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import AnunciosClient from './AnunciosClient';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Anúncios — Definições' };

export default async function AnunciosPage() {
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

  const settings = await api.settings.getAdsense().catch(() => null);

  return (
    <div>
      <TopBar title="Anúncios" />
      <div className="p-6 max-w-xl">
        {settings
          ? <AnunciosClient initial={settings} />
          : <p className="text-text-secondary">Não foi possível carregar as definições de anúncios.</p>
        }
      </div>
    </div>
  );
}
