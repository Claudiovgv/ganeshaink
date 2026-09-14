'use client';

import type { SchedulePrefs } from '@/lib/types';

export const EMPTY_PREFS: SchedulePrefs = {
  lunchStart: '',
  lunchEnd: '',
  nextDayCutoffEnabled: false,
  nextDayCutoffTime: '23:00',
};

export default function SchedulePrefsFields({
  prefs,
  onChange,
}: {
  prefs: SchedulePrefs;
  onChange: (patch: Partial<SchedulePrefs>) => void;
}) {
  return (
    <div className="space-y-4 pt-2">
      <div className="bg-bg-section/40 border border-gold-border/20 rounded-lg p-4 space-y-3">
        <p className="text-sm text-text-primary font-medium">Almoço</p>
        <p className="text-text-muted text-xs">
          Igual em todos os dias de trabalho. Esse intervalo fica bloqueado no site.
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-xs text-text-secondary">
            Início
            <input
              type="time"
              value={prefs.lunchStart}
              onChange={(e) => onChange({ lunchStart: e.target.value })}
              className="mt-1 block bg-bg-section border border-gold-border/30 rounded px-2 py-1 text-sm text-text-primary"
            />
          </label>
          <span className="text-text-muted text-xs mt-5">—</span>
          <label className="text-xs text-text-secondary">
            Fim
            <input
              type="time"
              value={prefs.lunchEnd}
              onChange={(e) => onChange({ lunchEnd: e.target.value })}
              className="mt-1 block bg-bg-section border border-gold-border/30 rounded px-2 py-1 text-sm text-text-primary"
            />
          </label>
        </div>
      </div>

      <div className="bg-bg-section/40 border border-gold-border/20 rounded-lg p-4 space-y-3">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={prefs.nextDayCutoffEnabled}
            onChange={(e) => onChange({ nextDayCutoffEnabled: e.target.checked })}
            className="accent-gold mt-0.5"
          />
          <span>
            <span className="text-sm text-text-primary font-medium block">Bloquear marcações para amanhã à noite</span>
            <span className="text-text-muted text-xs">
              A partir desta hora, o site deixa de aceitar marcações para o dia seguinte. O horário de agendamento online é até esta hora (ex.: das 9h às 23h). No backoffice continuas a poder marcar.
            </span>
          </span>
        </label>
        <label className="text-xs text-text-secondary block">
          A partir das
          <input
            type="time"
            value={prefs.nextDayCutoffTime}
            disabled={!prefs.nextDayCutoffEnabled}
            onChange={(e) => onChange({ nextDayCutoffTime: e.target.value })}
            className="mt-1 block bg-bg-section border border-gold-border/30 rounded px-2 py-1 text-sm text-text-primary disabled:opacity-40"
          />
        </label>
      </div>
    </div>
  );
}
