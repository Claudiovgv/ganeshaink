'use client';
import { useState, useTransition } from 'react';
import type { Employee } from '@/lib/types';
import Button from '@/components/Button';
import { updateProfileAction } from '@/lib/actions';

export default function PerfilClient({ initial }: { initial: Employee }) {
  const [form, setForm] = useState({ name: initial.name, bio: initial.bio ?? '', photoUrl: initial.photoUrl ?? '' });
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    startTransition(async () => {
      await updateProfileAction(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Nome</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-bg-card border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
      </div>
      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Bio</label>
        <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} className="w-full bg-bg-card border border-gold-border rounded px-3 py-2 text-text-primary text-sm resize-none" />
      </div>
      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Foto URL</label>
        <input value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} placeholder="https://..." className="w-full bg-bg-card border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted" />
      </div>
      <Button onClick={handleSave} loading={isPending}>
        {saved ? 'Guardado!' : 'Guardar Perfil'}
      </Button>
    </div>
  );
}
