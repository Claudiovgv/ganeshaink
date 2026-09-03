'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { api, Employee } from '@/lib/api';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';
import { resolvePhotoUrl } from '@/lib/media';

interface Props {
  serviceId: number;
  onSelect: (employee: Employee) => void;
  onBack: () => void;
}

export default function Step3Employee({ serviceId, onSelect, onBack }: Props) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.employees.list()
      .then((all) => setEmployees(all.filter((e) => e.services.some((s) => s.id === serviceId))))
      .catch(() => setError('Erro ao carregar artistas.'))
      .finally(() => setLoading(false));
  }, [serviceId]);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Escolhe o Artista</h2>
      <p className="text-text-secondary text-sm mb-8">Quem queres que te atenda?</p>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && !error && employees.length === 0 && (
        <p className="text-text-secondary text-sm">Nenhum artista disponível para este serviço.</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {employees.map((emp) => (
            <button
              key={emp.id}
              onClick={() => onSelect(emp)}
              className="bg-bg-card border border-gold-border rounded-lg p-5 text-left hover:border-gold transition-colors group flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border border-gold-border flex-shrink-0 bg-bg-section">
                {resolvePhotoUrl(emp.photoUrl) ? (
                  <Image src={resolvePhotoUrl(emp.photoUrl)!} alt={emp.name} width={56} height={56} sizes="56px" className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl font-display text-gold">
                    {emp.name[0]}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-gold transition-colors">{emp.name}</h3>
                {emp.bio && <p className="text-text-secondary text-xs mt-1 line-clamp-2">{emp.bio}</p>}
              </div>
            </button>
          ))}
        </div>
      )}

      <Button variant="ghost" onClick={onBack}>← Voltar</Button>
    </div>
  );
}
