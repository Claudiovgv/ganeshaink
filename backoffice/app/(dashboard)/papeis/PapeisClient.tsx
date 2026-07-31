'use client';
import { useState, useTransition } from 'react';
import type { AdminPermissionKey, ConfigurableRole, EmployeePermissionKey } from '@/lib/types';
import Button from '@/components/Button';
import { updateRolePermissionsAction } from '@/lib/actions';

const ADMIN_LABELS: Record<AdminPermissionKey, { title: string; desc: string }> = {
  manage_appointments: { title: 'Marcações e Consultas', desc: 'Ver e gerir marcações, aceitar/recusar consultas' },
  manage_employees: { title: 'Funcionários', desc: 'Criar, editar, ativar/desativar e apagar funcionários' },
  manage_services: { title: 'Serviços', desc: 'Criar, editar e desativar os serviços do catálogo' },
  manage_clients: { title: 'Clientes', desc: 'Ver a lista de clientes e o seu histórico' },
  manage_blog: { title: 'Blog', desc: 'Criar, editar e publicar artigos' },
  manage_settings: { title: 'Definições (SMTP e Tecnologia)', desc: 'Configurar o envio de emails e ver a tecnologia usada' },
  view_stats: { title: 'Estatísticas', desc: 'Ver receita, marcações e serviços mais pedidos' },
};

const EMPLOYEE_LABELS: Record<EmployeePermissionKey, { title: string; desc: string }> = {
  view_services: { title: 'Serviços', desc: 'Ver o catálogo de serviços' },
  manage_schedule: { title: 'Horário', desc: 'Editar o seu horário semanal' },
  manage_blocks: { title: 'Bloqueios', desc: 'Marcar dias de folga ou horas indisponíveis' },
  edit_profile: { title: 'Perfil', desc: 'Editar a sua foto, bio e dados pessoais' },
};

type RolesData = {
  keys: { admin: AdminPermissionKey[]; employee: EmployeePermissionKey[] };
  permissions: { admin: Record<AdminPermissionKey, boolean>; employee: Record<EmployeePermissionKey, boolean> };
};

const ROLE_TABS: { role: ConfigurableRole | 'superadmin'; label: string }[] = [
  { role: 'superadmin', label: 'Superadmin' },
  { role: 'admin', label: 'Admin' },
  { role: 'employee', label: 'Funcionário' },
];

export default function PapeisClient({ initial }: { initial: RolesData }) {
  const [active, setActive] = useState<ConfigurableRole | 'superadmin'>('admin');
  const [data, setData] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function toggle(role: ConfigurableRole, key: string) {
    setData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [role]: { ...prev.permissions[role], [key]: !(prev.permissions[role] as Record<string, boolean>)[key] },
      },
    }));
    setMessage(null);
  }

  function handleSave(role: ConfigurableRole) {
    startTransition(async () => {
      await updateRolePermissionsAction(role, data.permissions[role]);
      setMessage('Permissões guardadas.');
    });
  }

  return (
    <div className="space-y-6">
      <p className="text-text-secondary text-sm">
        Escolhe um papel e define exatamente que menus/secções essa conta vê no backoffice.
      </p>

      <div className="flex gap-2">
        {ROLE_TABS.map((tab) => (
          <button
            key={tab.role}
            onClick={() => { setActive(tab.role); setMessage(null); }}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              active === tab.role ? 'bg-gold text-bg-primary' : 'border border-gold-border text-text-secondary hover:border-gold hover:text-gold'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === 'superadmin' && (
        <div className="bg-bg-card border border-gold-border rounded-lg p-5">
          <p className="text-text-secondary text-sm">
            O Superadmin tem sempre <span className="text-gold font-medium">acesso total</span> a todas as secções,
            incluindo Utilizadores, Papéis e Log — isto não pode ser restringido, para garantir que há sempre uma conta com controlo completo do sistema.
          </p>
        </div>
      )}

      {(active === 'admin' || active === 'employee') && (
        <>
          <div className="bg-bg-card border border-gold-border rounded-lg divide-y divide-gold-border/20">
            {data.keys[active].map((key) => {
              const label = active === 'admin' ? ADMIN_LABELS[key as AdminPermissionKey] : EMPLOYEE_LABELS[key as EmployeePermissionKey];
              const checked = (data.permissions[active] as Record<string, boolean>)[key];
              return (
                <label key={key} className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer">
                  <div>
                    <p className="text-text-primary font-medium text-sm">{label.title}</p>
                    <p className="text-text-secondary text-xs mt-0.5">{label.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(active, key)}
                    className="w-5 h-5 shrink-0 accent-gold cursor-pointer"
                  />
                </label>
              );
            })}
          </div>
          <p className="text-text-muted text-xs">
            {active === 'admin'
              ? 'Utilizadores, Papéis e Log ficam sempre reservados ao Superadmin, por segurança.'
              : 'A Agenda, as Marcações e a Segurança ficam sempre visíveis — são essenciais para trabalhar.'}
          </p>
          {message && <p className="text-green-400 text-sm">{message}</p>}
          <Button onClick={() => handleSave(active)} disabled={isPending} loading={isPending}>Guardar</Button>
        </>
      )}
    </div>
  );
}
