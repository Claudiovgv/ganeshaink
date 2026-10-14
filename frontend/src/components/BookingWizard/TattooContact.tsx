import Link from 'next/link';
import { STUDIO_PHONE, tattooWhatsAppUrl } from '@/lib/booking';
import Button from '../ui/Button';

export default function TattooContact({ onBack }: { onBack?: () => void }) {
  return (
    <div className="mx-auto max-w-lg text-center">
      <p className="font-gate text-[0.68rem] uppercase tracking-[0.38em] text-gold mb-3">
        Tattoostudio
      </p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-10">Fala com o tatuador</h2>

      <div className="space-y-3">
        <a
          href={tattooWhatsAppUrl('talk')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center px-6 py-3.5 bg-gold text-bg-primary font-semibold rounded hover:bg-gold-light transition-colors"
        >
          WhatsApp com o tatuador
        </a>
        <a
          href={tattooWhatsAppUrl('call')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center px-6 py-3.5 border border-gold text-gold rounded hover:bg-gold-muted transition-colors"
        >
          Agendar uma chamada
        </a>
        <a
          href={`tel:${STUDIO_PHONE}`}
          className="flex w-full items-center justify-center px-6 py-3.5 border border-gold-border text-text-primary rounded hover:border-gold hover:text-gold transition-colors"
        >
          Ligar agora
        </a>
        <Link
          href="/consulta?tipo=tattoo"
          className="flex w-full items-center justify-center px-6 py-3.5 text-gold/80 hover:text-gold transition-colors text-sm"
        >
          Ou deixa o teu contacto no pedido de consulta
        </Link>
      </div>

      {onBack && (
        <div className="mt-10">
          <Button variant="ghost" onClick={onBack}>
            ← Voltar
          </Button>
        </div>
      )}
    </div>
  );
}
