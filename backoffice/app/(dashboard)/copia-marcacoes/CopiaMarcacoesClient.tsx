'use client';
import { useState, useTransition } from 'react';
import Button from '@/components/Button';
import type { AppointmentExportRow } from '@/lib/types';
import { exportAppointmentsAction, importAppointmentsAction } from '@/lib/actions';

export default function CopiaMarcacoesClient() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [importErrors, setImportErrors] = useState<string[]>([]);

  function handleExport() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        const data = await exportAppointmentsAction();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const day = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = `ganesha-marcacoes-${day}.json`;
        a.click();
        URL.revokeObjectURL(url);
        setMessage(`Exportadas ${data.count} marcações.`);
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function handleImport(file: File) {
    setError(null);
    setMessage(null);
    setImportErrors([]);
    startTransition(async () => {
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        const rows: AppointmentExportRow[] = Array.isArray(parsed)
          ? parsed
          : Array.isArray(parsed.appointments)
            ? parsed.appointments
            : [];
        if (rows.length === 0) {
          setError('O ficheiro não tem marcações.');
          return;
        }
        const res = await importAppointmentsAction(rows);
        if (!res.ok) {
          setError(res.error);
          return;
        }
        setMessage(`Importadas ${res.result.created} · ignoradas (já existiam) ${res.result.skipped} · de ${res.result.total}.`);
        setImportErrors(res.result.errors || []);
      } catch (err) {
        setError((err as Error).message || 'Ficheiro JSON inválido.');
      }
    });
  }

  return (
    <div className="max-w-2xl space-y-8">
      <p className="text-text-secondary text-sm">
        Antes de um deploy, exporta as marcações da versão que está online. Depois de actualizares o site, importa o mesmo ficheiro aqui.
        O import reconhece o funcionário e o serviço pelo <strong>nome</strong> — se o nome mudou, essa linha fica de fora.
        Marcações no mesmo horário do mesmo artista não são duplicadas.
      </p>

      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded px-3 py-2">{error}</p>}
      {message && <p className="text-green-400 text-sm">{message}</p>}
      {importErrors.length > 0 && (
        <ul className="text-amber-400 text-xs space-y-1 list-disc pl-5">
          {importErrors.map((line) => <li key={line}>{line}</li>)}
        </ul>
      )}

      <div className="bg-bg-card border border-gold-border/30 rounded-lg p-5 space-y-3">
        <h2 className="font-display font-bold">Exportar</h2>
        <p className="text-text-secondary text-sm">Descarrega um JSON com todas as marcações desta base de dados.</p>
        <Button onClick={handleExport} loading={isPending}>Exportar marcações</Button>
      </div>

      <div className="bg-bg-card border border-gold-border/30 rounded-lg p-5 space-y-3">
        <h2 className="font-display font-bold">Importar</h2>
        <p className="text-text-secondary text-sm">Escolhe o JSON que exportaste (online ou daqui). Não apaga marcações existentes.</p>
        <input
          type="file"
          accept="application/json,.json"
          disabled={isPending}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImport(file);
            e.target.value = '';
          }}
          className="block text-sm text-text-secondary file:mr-3 file:rounded file:border-0 file:bg-gold file:text-bg-primary file:px-3 file:py-1.5 file:text-sm"
        />
      </div>

      <div className="text-text-secondary text-sm space-y-2 border-t border-gold-border/30 pt-6">
        <h2 className="font-display font-bold text-text-primary">Cópia directa na base de dados</h2>
        <p>
          Se preferires, no phpMyAdmin (cPanel) exporta a tabela <code className="text-gold">appointments</code> em SQL
          antes do deploy. Depois do deploy, importa esse SQL — só faz isto se souberes que os IDs de funcionários e serviços
          são os mesmos. O menu acima é mais seguro porque usa nomes, não IDs.
        </p>
      </div>
    </div>
  );
}
