'use client';
import { useState, useTransition } from 'react';
import type { Employee } from '@/lib/types';
import Button from '@/components/Button';
import { updateProfileAction, uploadProfilePhotoAction } from '@/lib/actions';
import { resolveMediaUrl } from '@/lib/media';
import { resizeEmployeePhoto } from '@/lib/resizeImage';

export default function PerfilClient({ initial }: { initial: Employee }) {
  const [form, setForm] = useState({ name: initial.name, bio: initial.bio ?? '' });
  const [photoUrl, setPhotoUrl] = useState(initial.photoUrl);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    startTransition(async () => {
      await updateProfileAction(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  async function handlePhoto(file: File | undefined) {
    setPhotoError(null);
    if (!file) return;
    try {
      const blob = await resizeEmployeePhoto(file);
      const resized = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      setPhotoPreview(URL.createObjectURL(resized));
      const fd = new FormData();
      fd.append('photo', resized, 'photo.jpg');
      const updated = await uploadProfilePhotoAction(fd);
      setPhotoUrl(updated.photoUrl);
    } catch (err) {
      setPhotoError((err as Error).message);
    }
  }

  const shown = photoPreview || resolveMediaUrl(photoUrl);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Foto</label>
        <div className="flex items-center gap-3">
          {shown ? (
            <img src={shown} alt="" className="w-20 h-20 rounded-full object-cover border border-gold-border" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gold-muted text-gold flex items-center justify-center text-lg font-semibold">
              {form.name[0]}
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handlePhoto(e.target.files?.[0])}
            className="block w-full text-xs text-text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-gold-border file:bg-bg-section file:text-text-primary"
          />
        </div>
        {photoError && <p className="text-red-400 text-xs mt-1">{photoError}</p>}
      </div>
      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Nome</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-bg-card border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
      </div>
      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Bio</label>
        <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} className="w-full bg-bg-card border border-gold-border rounded px-3 py-2 text-text-primary text-sm resize-none" />
      </div>
      <Button onClick={handleSave} loading={isPending}>
        {saved ? 'Guardado!' : 'Guardar Perfil'}
      </Button>
    </div>
  );
}
