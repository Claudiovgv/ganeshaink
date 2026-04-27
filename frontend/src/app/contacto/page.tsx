import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta o Ganesha Ink — localização, horários e redes sociais.',
};

export default function ContactoPage() {
  return (
    <div className="pt-20">
      <section className="bg-bg-section py-16 px-4 text-center">
        <h1 className="font-display text-5xl font-bold mb-4">
          <span className="text-gold-gradient">Contacto</span>
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          Estamos em Lisboa. Vem visitar-nos ou fala connosco online.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-3">Morada</h2>
            <address className="not-italic text-text-secondary space-y-1">
              <p>Rua do Ganesha, Nº 123</p>
              <p>1000-000 Lisboa, Portugal</p>
            </address>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-3">Horário</h2>
            <div className="text-text-secondary space-y-1 text-sm">
              {[
                ['Segunda — Sexta', '10:00 — 19:00'],
                ['Sábado', '10:00 — 17:00'],
                ['Domingo', 'Fechado'],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between gap-4">
                  <span>{day}</span>
                  <span className={hours === 'Fechado' ? 'text-red-400' : 'text-text-primary'}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-3">Contactos</h2>
            <div className="text-text-secondary space-y-2 text-sm">
              <p>
                <a href="tel:+351910000000" className="hover:text-gold transition-colors">
                  +351 910 000 000
                </a>
              </p>
              <p>
                <a href="mailto:geral@ganeshaink.pt" className="hover:text-gold transition-colors">
                  geral@ganeshaink.pt
                </a>
              </p>
              <p>
                <a
                  href="https://www.instagram.com/ganeshaink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  @ganeshaink no Instagram
                </a>
              </p>
            </div>
          </div>
          <div className="pt-2">
            <Link
              href="/marcar"
              className="inline-flex px-6 py-3 bg-gold text-bg-primary font-semibold rounded hover:bg-gold-light transition-colors"
            >
              Marcar Agora
            </Link>
          </div>
        </div>

        <div className="bg-bg-card border border-gold-border rounded-lg overflow-hidden flex items-center justify-center min-h-64">
          <div className="text-center text-text-secondary p-8">
            <p className="text-4xl mb-4">📍</p>
            <p className="text-sm">Lisboa, Portugal</p>
            <a
              href="https://maps.google.com/?q=Lisboa+Portugal"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-gold text-sm hover:underline"
            >
              Ver no Google Maps →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
