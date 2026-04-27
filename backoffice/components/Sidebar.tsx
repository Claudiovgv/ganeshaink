'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { logoutAction } from '@/lib/actions';

const ADMIN_NAV = [
  { section: 'Agenda', items: [{ href: '/', label: 'Dashboard' }] },
  {
    section: 'Marcações',
    items: [
      { href: '/marcacoes', label: 'Marcações' },
      { href: '/consultas', label: 'Consultas' },
    ],
  },
  {
    section: 'Gestão',
    items: [
      { href: '/funcionarios', label: 'Funcionários' },
      { href: '/servicos', label: 'Serviços' },
      { href: '/blog', label: 'Blog' },
      { href: '/clientes', label: 'Clientes' },
    ],
  },
];

const EMPLOYEE_NAV = [
  {
    section: '',
    items: [
      { href: '/', label: 'Agenda' },
      { href: '/servicos', label: 'Serviços' },
      { href: '/horario', label: 'Horário' },
      { href: '/bloqueios', label: 'Bloqueios' },
      { href: '/perfil', label: 'Perfil' },
    ],
  },
];

export default function Sidebar() {
  const user = useAuth();
  const pathname = usePathname();
  const nav = user.role === 'admin' ? ADMIN_NAV : EMPLOYEE_NAV;

  return (
    <aside className="fixed left-0 top-0 h-screen w-[180px] bg-bg-sidebar border-r border-gold-border/20 flex flex-col z-20">
      <div className="flex items-center gap-2 px-4 py-5 border-b border-gold-border/20">
        <Image src="/images/logo/ganesha-icon.png" alt="Ganesha Ink" width={28} height={28} className="object-contain" />
        <span className="font-display text-sm font-bold text-gold leading-tight">Ganesha<br />Ink</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {nav.map((group) => (
          <div key={group.section || 'main'} className="mb-4">
            {group.section && (
              <p className="text-text-muted text-[10px] uppercase tracking-widest px-2 mb-1">{group.section}</p>
            )}
            {group.items.map(({ href, label }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors mb-0.5 ${
                    active
                      ? 'bg-gold-muted text-gold font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-gold-border/20 p-3">
        <p className="text-text-secondary text-xs truncate mb-0.5">{user.name}</p>
        <p className="text-text-muted text-[10px] capitalize mb-2">{user.role}</p>
        <form action={logoutAction}>
          <button type="submit" className="text-text-muted text-xs hover:text-red-400 transition-colors">
            Terminar sessão
          </button>
        </form>
      </div>
    </aside>
  );
}
