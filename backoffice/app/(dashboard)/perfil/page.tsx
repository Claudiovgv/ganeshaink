import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import PerfilClient from './PerfilClient';

export const metadata = { title: 'Perfil' };

export default async function PerfilPage() {
  const profile = await api.profile.get().catch(() => null);
  return (
    <div>
      <TopBar title="Perfil" />
      <div className="p-6 max-w-md">
        {profile
          ? <PerfilClient initial={profile} />
          : <p className="text-text-secondary">Não foi possível carregar o perfil.</p>
        }
      </div>
    </div>
  );
}
