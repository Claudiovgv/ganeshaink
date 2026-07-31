import { ReactNode } from 'react';

interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
  mobileHide?: boolean;   // esconde esta coluna nos cards mobile
  mobileMain?: boolean;   // destaca como título do card
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function DataTable<T extends { id: number }>({ columns, data, emptyMessage = 'Sem resultados.' }: Props<T>) {
  if (data.length === 0) {
    return <p className="text-text-secondary text-sm py-8 text-center">{emptyMessage}</p>;
  }

  const visibleCols = columns.filter((c) => !c.mobileHide);
  const mainCol = columns.find((c) => c.mobileMain) ?? columns[0];
  const restCols = visibleCols.filter((c) => c.key !== mainCol.key && c.label !== '');
  const actionCol = columns.find((c) => c.key === 'actions' || c.label === '');

  return (
    <>
      {/* ── Desktop: tabela normal ── */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gold-border/30">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold-border/30 bg-bg-section">
              {columns.map((col) => (
                <th key={col.key} className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-gold-border/10 last:border-0 hover:bg-bg-card/50 transition-colors ${i % 2 === 0 ? '' : 'bg-bg-section/30'}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-text-primary">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile: cards ── */}
      <div className="md:hidden space-y-3">
        {data.map((row) => (
          <div key={row.id} className="bg-bg-card border border-gold-border/30 rounded-lg px-4 py-3">
            {/* Linha principal */}
            <div className="mb-2">
              {mainCol.render(row)}
            </div>
            {/* Restantes campos */}
            {restCols
              .filter((c) => c.key !== (actionCol?.key ?? ''))
              .map((col) => (
                <div key={col.key} className="flex items-center justify-between py-1 gap-3">
                  <span className="text-text-muted text-xs shrink-0">{col.label}</span>
                  <span className="text-text-secondary text-xs text-right">{col.render(row)}</span>
                </div>
              ))}
            {/* Ações — linha própria, largura total, um botão por linha para não ficarem apertados */}
            {actionCol && (
              <div className="mt-3 pt-3 border-t border-gold-border/20 [&_button]:w-full [&_button]:justify-center">
                {actionCol.render(row)}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
