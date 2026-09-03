'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

interface Props {
  employeeId: number;
  serviceId: number;
  onSelect: (date: string, time: string) => void;
  onBack: () => void;
}

function lisbonYmd(d: Date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Lisbon',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

function getDateOptions() {
  const options: { value: string; label: string }[] = [];
  const now = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const value = lisbonYmd(d);
    const label = d.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Lisbon' });
    options.push({ value, label });
  }
  return options;
}

export default function Step4DateTime({ employeeId, serviceId, onSelect, onBack }: Props) {
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const dateOptions = getDateOptions();

  async function handleDateChange(d: string) {
    setDate(d);
    setSelectedTime('');
    setSlots([]);
    setSlotsError('');
    setLoadingSlots(true);
    try {
      const res = await api.availability.slots(employeeId, d, serviceId);
      setSlots(res.slots);
      if (res.slots.length === 0) setSlotsError('Sem disponibilidade neste dia. Escolhe outro.');
    } catch {
      setSlotsError('Erro ao carregar disponibilidade.');
    } finally {
      setLoadingSlots(false);
    }
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Data & Hora</h2>
      <p className="text-text-secondary text-sm mb-8">Quando queres ser atendido?</p>

      <div className="mb-6">
        <label className="block text-sm text-text-secondary mb-2">Data</label>
        <select
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary focus:border-gold focus:outline-none"
        >
          <option value="">Selecciona uma data...</option>
          {dateOptions.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {loadingSlots && <LoadingSpinner size={24} />}
      {slotsError && <p className="text-text-secondary text-sm mb-6">{slotsError}</p>}

      {slots.length > 0 && (
        <div className="mb-8">
          <label className="block text-sm text-text-secondary mb-3">Hora</label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`py-2 rounded text-sm transition-colors ${
                  selectedTime === slot
                    ? 'bg-gold text-bg-primary font-semibold'
                    : 'border border-gold-border text-text-secondary hover:border-gold hover:text-gold'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mt-4">
        <Button variant="ghost" onClick={onBack}>← Voltar</Button>
        {selectedTime && date && (
          <Button onClick={() => onSelect(date, selectedTime)}>
            Continuar →
          </Button>
        )}
      </div>
    </div>
  );
}
