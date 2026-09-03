'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { logoutAction } from '@/lib/actions';

/* ── Ícones SVG inline ── */
const Icons: Record<string, JSX.Element> = {
  Dashboard: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  Estatísticas: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/>
    </svg>
  ),
  Barbearia: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  ),
  Tatuagens: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 2C12 2 5 10.5 5 15a7 7 0 0 0 14 0c0-4.5-7-13-7-13z"/>
    </svg>
  ),
  Nails: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  ),
  'Contas Barbearia': (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  'Cópia de marcações': (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Marcações: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  Consultas: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Piercings: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3"/>
      <circle cx="12" cy="12" r="8"/>
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
    </svg>
  ),
  Horários: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  Funcionários: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Serviços: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
    </svg>
  ),
  Categorias: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  Clientes: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Parcerias: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Blog: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  Agenda: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  Horário: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Bloqueios: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Perfil: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Segurança: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z"/>
    </svg>
  ),
  SMTP: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>
    </svg>
  ),
  'SMTP e notificações': (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>
    </svg>
  ),
  Tecnologia: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Log: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h4"/>
    </svg>
  ),
  Utilizadores: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M19.5 20a6 6 0 0 0-4.5-8"/>
    </svg>
  ),
  'Papéis': (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
};

const IconMais = (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/>
  </svg>
);

type AdminPermissionKey = 'manage_appointments' | 'manage_employees' | 'manage_services' | 'manage_clients' | 'manage_blog' | 'manage_settings' | 'view_stats';
type EmployeePermissionKey = 'view_services' | 'manage_schedule' | 'manage_blocks' | 'edit_profile';

const ADMIN_NAV_ALL = [
  { section: 'Agenda', items: [{ href: '/', label: 'Dashboard', perm: null as AdminPermissionKey | null }] },
  {
    section: 'Análise',
    items: [
      { href: '/estatisticas', label: 'Estatísticas', perm: 'view_stats' as AdminPermissionKey | null },
      { href: '/barbearia', label: 'Barbearia', perm: 'view_stats' as AdminPermissionKey | null },
      { href: '/tatuagens', label: 'Tatuagens', perm: 'view_stats' as AdminPermissionKey | null },
      { href: '/nails', label: 'Nails', perm: 'view_stats' as AdminPermissionKey | null },
      { href: '/piercings', label: 'Piercings', perm: 'manage_appointments' as AdminPermissionKey | null },
    ],
  },
  {
    section: 'Marcações',
    items: [
      { href: '/marcacoes', label: 'Marcações', perm: 'manage_appointments' as AdminPermissionKey | null },
      { href: '/copia-marcacoes', label: 'Cópia de marcações', perm: 'manage_appointments' as AdminPermissionKey | null },
      { href: '/consultas', label: 'Consultas', perm: 'manage_appointments' as AdminPermissionKey | null },
    ],
  },
  {
    section: 'Gestão',
    items: [
      { href: '/funcionarios', label: 'Funcionários', perm: 'manage_employees' as AdminPermissionKey | null },
      { href: '/horarios', label: 'Horários', perm: 'manage_employees' as AdminPermissionKey | null },
      { href: '/bloqueios-equipa', label: 'Bloqueios', perm: 'manage_employees' as AdminPermissionKey | null },
      { href: '/servicos', label: 'Serviços', perm: 'manage_services' as AdminPermissionKey | null },
      { href: '/categorias', label: 'Categorias', perm: 'manage_services' as AdminPermissionKey | null },
      { href: '/clientes', label: 'Clientes', perm: 'manage_clients' as AdminPermissionKey | null },
      { href: '/parcerias', label: 'Parcerias', perm: 'manage_appointments' as AdminPermissionKey | null },
      { href: '/blog', label: 'Blog', perm: 'manage_blog' as AdminPermissionKey | null },
    ],
  },
  {
    section: 'Definições',
    items: [
      { href: '/definicoes/smtp', label: 'SMTP e notificações', perm: 'manage_settings' as AdminPermissionKey | null },
      { href: '/definicoes/contas-barbearia', label: 'Contas Barbearia', perm: 'manage_settings' as AdminPermissionKey | null },
      { href: '/definicoes/tecnologia', label: 'Tecnologia', perm: 'manage_settings' as AdminPermissionKey | null },
    ],
  },
  { section: 'Conta', items: [{ href: '/seguranca', label: 'Segurança', perm: null as AdminPermissionKey | null }] },
];

function getAdminNav(permissions: Partial<Record<AdminPermissionKey, boolean>> | undefined) {
  return ADMIN_NAV_ALL
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.perm || permissions?.[item.perm]),
    }))
    .filter((group) => group.items.length > 0);
}

const EMPLOYEE_NAV_ALL = [
  {
    section: '',
    items: [
      { href: '/', label: 'Agenda', perm: null as EmployeePermissionKey | null },
      { href: '/marcacoes', label: 'Marcações', perm: null as EmployeePermissionKey | null },
      { href: '/servicos', label: 'Serviços', perm: 'view_services' as EmployeePermissionKey | null },
      { href: '/horario', label: 'Horário', perm: 'manage_schedule' as EmployeePermissionKey | null },
      { href: '/bloqueios', label: 'Bloqueios', perm: 'manage_blocks' as EmployeePermissionKey | null },
      { href: '/perfil', label: 'Perfil', perm: 'edit_profile' as EmployeePermissionKey | null },
      { href: '/seguranca', label: 'Segurança', perm: null as EmployeePermissionKey | null },
    ],
  },
];

function getEmployeeNav(permissions: Partial<Record<EmployeePermissionKey, boolean>> | undefined) {
  return EMPLOYEE_NAV_ALL
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.perm || permissions?.[item.perm]),
    }))
    .filter((group) => group.items.length > 0);
}

const SUPERADMIN_NAV = [
  { section: 'Agenda', items: [{ href: '/', label: 'Dashboard' }] },
  {
    section: 'Análise',
    items: [
      { href: '/estatisticas', label: 'Estatísticas' },
      { href: '/barbearia', label: 'Barbearia' },
      { href: '/tatuagens', label: 'Tatuagens' },
      { href: '/nails', label: 'Nails' },
      { href: '/piercings', label: 'Piercings' },
    ],
  },
  {
    section: 'Marcações',
    items: [
      { href: '/marcacoes', label: 'Marcações' },
      { href: '/copia-marcacoes', label: 'Cópia de marcações' },
      { href: '/consultas', label: 'Consultas' },
    ],
  },
  {
    section: 'Gestão',
    items: [
      { href: '/funcionarios', label: 'Funcionários' },
      { href: '/horarios', label: 'Horários' },
      { href: '/bloqueios-equipa', label: 'Bloqueios' },
      { href: '/servicos', label: 'Serviços' },
      { href: '/categorias', label: 'Categorias' },
      { href: '/clientes', label: 'Clientes' },
      { href: '/parcerias', label: 'Parcerias' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    section: 'Definições',
    items: [
      { href: '/definicoes/smtp', label: 'SMTP e notificações' },
      { href: '/definicoes/contas-barbearia', label: 'Contas Barbearia' },
      { href: '/definicoes/tecnologia', label: 'Tecnologia' },
      { href: '/definicoes/logs', label: 'Log' },
    ],
  },
  {
    section: 'Conta',
    items: [
      { href: '/seguranca', label: 'Segurança' },
      { href: '/utilizadores', label: 'Utilizadores' },
      { href: '/papeis', label: 'Papéis' },
    ],
  },
];

// Primeiros 4 itens no bottom nav — o resto vai para o drawer "Mais"
const ADMIN_BOTTOM_MAIN = ['Dashboard', 'Marcações', 'Consultas', 'Clientes'];
const EMPLOYEE_BOTTOM_MAIN = ['Agenda', 'Marcações', 'Horário', 'Perfil'];

export default function Sidebar() {
  const user = useAuth();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const nav = user.role === 'superadmin' ? SUPERADMIN_NAV : user.role === 'admin' ? getAdminNav(user.permissions) : getEmployeeNav(user.permissions);
  const mainLabels = user.role === 'superadmin' || user.role === 'admin' ? ADMIN_BOTTOM_MAIN : EMPLOYEE_BOTTOM_MAIN;
  const allItems = nav.flatMap((g) => g.items);
  const mainItems = mainLabels
    .map((label) => allItems.find((i) => i.label === label))
    .filter(Boolean) as { href: string; label: string }[];
  const moreItems = allItems.filter((i) => !mainLabels.includes(i.label));

  // Saber se algum item do "Mais" está ativo
  const moreActive = moreItems.some((i) =>
    i.href === '/' ? pathname === '/' : pathname.startsWith(i.href)
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[180px] bg-bg-sidebar border-r border-gold-border/20 flex-col z-20">
        <div className="flex items-center justify-center px-4 py-5 border-b border-gold-border/20">
          <Image src="/images/logo/ganesha-logo-gold-white.webp" alt="Ganesha Ink" width={120} height={40} className="object-contain" />
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
                      active ? 'bg-gold-muted text-gold font-medium' : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                    }`}
                  >
                    <span className="opacity-60">{Icons[label]}</span>
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

      {/* ── Mobile top bar ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-bg-sidebar border-b border-gold-border/20 flex items-center px-4 z-20">
        <Image src="/images/logo/ganesha-logo-gold-white.webp" alt="Ganesha Ink" width={100} height={32} className="object-contain" />
        <span className="ml-auto text-text-secondary text-xs">{user.name}</span>
      </header>

      {/* ── Mobile bottom nav ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-bg-sidebar border-t border-gold-border/20 flex items-center z-30">
        {mainItems.map(({ href, label }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setDrawerOpen(false)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
                active ? 'text-gold' : 'text-text-muted'
              }`}
            >
              {Icons[label]}
              <span className="text-[10px] leading-none">{label}</span>
            </Link>
          );
        })}

        {/* Botão Mais */}
        <button
          onClick={() => setDrawerOpen((o) => !o)}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
            drawerOpen || moreActive ? 'text-gold' : 'text-text-muted'
          }`}
        >
          {IconMais}
          <span className="text-[10px] leading-none">Mais</span>
        </button>
      </nav>

      {/* ── Drawer "Mais" ── */}
      {drawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="md:hidden fixed inset-0 z-20 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Sheet */}
          <div className="md:hidden fixed bottom-16 left-0 right-0 z-20 bg-bg-sidebar border-t border-gold-border/30 rounded-t-2xl pb-2 animate-slide-up">
            <div className="w-10 h-1 bg-gold-border rounded-full mx-auto mt-3 mb-4" />

            <div className="px-4 space-y-1">
              {moreItems.map(({ href, label }) => {
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      active ? 'bg-gold-muted text-gold font-medium' : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                    }`}
                  >
                    {Icons[label]}
                    <span className="text-sm">{label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-gold-border/20 mt-3 mx-4 pt-3">
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex items-center gap-3 px-3 py-2 w-full text-red-400 hover:text-red-300 transition-colors text-sm"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                  </svg>
                  Terminar sessão
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
