import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';

export const metadata = { title: 'Tecnologia — Definições' };

const STACK = [
  {
    group: 'Backend / API',
    items: ['Node.js', 'Express.js', 'Prisma ORM', 'MySQL', 'JWT (autenticação)', 'bcrypt (encriptação de passwords)', 'otplib (2FA / TOTP)', 'Helmet (segurança HTTP)'],
  },
  {
    group: 'Frontend público',
    items: ['Next.js 14 (App Router)', 'React 18', 'TypeScript', 'Tailwind CSS'],
  },
  {
    group: 'Backoffice',
    items: ['Next.js 14 (App Router)', 'React 18', 'TypeScript', 'Tailwind CSS'],
  },
  {
    group: 'Infraestrutura',
    items: ['cPanel (PTiSTP) com suporte Node.js', 'Deploy automático via Git (.cpanel.yml)', 'MySQL alojado no servidor'],
  },
];

export default async function TecnologiaPage() {
  const user = await api.auth.me().catch(() => null);
  const allowed = user && (user.role === 'superadmin' || (user.role === 'admin' && user.permissions?.manage_settings));
  if (!allowed) {
    return (
      <div>
        <TopBar title="Definições" />
        <div className="p-6 text-text-secondary">Acesso restrito ao superadmin.</div>
      </div>
    );
  }

  return (
    <div>
      <TopBar title="Tecnologia" />
      <div className="p-6 max-w-2xl space-y-6">
        <p className="text-text-secondary text-sm">Tecnologias e serviços usados neste site.</p>
        {STACK.map((section) => (
          <div key={section.group} className="bg-bg-card border border-gold-border rounded-lg p-5">
            <h3 className="font-semibold text-text-primary mb-3">{section.group}</h3>
            <ul className="flex flex-wrap gap-2">
              {section.items.map((item) => (
                <li key={item} className="text-xs border border-gold-border text-text-secondary px-2.5 py-1 rounded">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
