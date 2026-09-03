import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import SmtpClient from './SmtpClient';

export const metadata = { title: 'SMTP — Definições' };

export default async function SmtpPage() {
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

  const settings = await api.settings.getSmtp().catch(() => null);
  const matrix = await api.settings.getNotifications().catch(() => null);

  return (
    <div>
      <TopBar title="SMTP e notificações" />
      <div className="p-6 max-w-5xl">
        {settings && matrix
          ? <SmtpClient initial={settings} initialMatrix={matrix} userEmail={user!.email} />
          : <p className="text-text-secondary">Não foi possível carregar as definições de SMTP.</p>
        }
      </div>
    </div>
  );
}
