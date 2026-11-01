'use client';
import type { BarbershopClientsResponse } from '@/lib/types';

function money(n: number) {
  return `${n.toFixed(2)} €`;
}

export default function BarbeariaClientesClient({ initial }: { initial: BarbershopClientsResponse }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary">Estatísticas</h2>
        <p className="text-text-muted text-sm mt-1">
          Clientes registados da barbearia, ordenados pelos que já fizeram mais cortes e pelo valor que já deixaram na loja.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Clientes</p>
          <p className="text-2xl font-display font-bold text-text-primary">{initial.totals.clients}</p>
        </div>
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Cortes</p>
          <p className="text-2xl font-display font-bold text-text-primary">{initial.totals.cuts}</p>
        </div>
        <div className="bg-bg-card border border-gold rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Já gastaram na loja</p>
          <p className="text-2xl font-display font-bold text-gold">{money(initial.totals.spent)}</p>
        </div>
      </div>

      <div className="bg-bg-card border border-gold-border rounded-lg overflow-hidden">
        {initial.clients.length === 0 ? (
          <p className="text-text-secondary text-sm p-5">Ainda não há cortes concluídos para mostrar.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-border/30 bg-bg-section">
                <th className="text-left px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Cliente</th>
                <th className="text-left px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Contacto</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Cortes</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Gasto na loja</th>
              </tr>
            </thead>
            <tbody>
              {initial.clients.map((client) => (
                <tr key={`${client.email}-${client.phone}-${client.name}`} className="border-b border-gold-border/10 last:border-0">
                  <td className="px-5 py-2.5 text-text-primary">{client.name || 'Sem nome'}</td>
                  <td className="px-5 py-2.5 text-text-secondary hidden sm:table-cell">
                    {[client.phone, client.email].filter(Boolean).join(' · ') || '—'}
                  </td>
                  <td className="px-5 py-2.5 text-text-primary text-right font-medium">{client.cuts}</td>
                  <td className="px-5 py-2.5 text-gold text-right font-medium">{money(client.spent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
