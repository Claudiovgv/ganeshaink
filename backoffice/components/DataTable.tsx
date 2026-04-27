import { ReactNode } from 'react';

interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
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
  return (
    <div className="overflow-x-auto rounded-lg border border-gold-border/30">
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
            <tr key={row.id} className={`border-b border-gold-border/10 last:border-0 hover:bg-bg-card/50 transition-colors ${i % 2 === 0 ? '' : 'bg-bg-section/30'}`}>
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
  );
}
