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
          {/* Morada */}
          <div className="bg-bg-card border border-gold-border rounded-lg p-6">
            <h2 className="font-display text-sm font-semibold text-gold tracking-widest uppercase mb-4">Morada</h2>
            <address className="not-italic text-text-secondary leading-relaxed">
              <p className="text-text-primary font-medium">Rua do Ganesha, Nº 123</p>
              <p>1000-000 Lisboa, Portugal</p>
            </address>
          </div>

          {/* Horário */}
          <div className="bg-bg-card border border-gold-border rounded-lg p-6">
            <h2 className="font-display text-sm font-semibold text-gold tracking-widest uppercase mb-4">Horário</h2>
            <div className="space-y-2">
              {[
                ['Segunda — Sexta', '10:00 — 19:00'],
                ['Sábado', '10:00 — 17:00'],
                ['Domingo', 'Fechado'],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center py-1.5 border-b border-gold-border/40 last:border-0">
                  <span className="text-text-secondary text-sm">{day}</span>
                  <span className={`text-sm font-medium ${hours === 'Fechado' ? 'text-red-400' : 'text-text-primary'}`}>
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contactos */}
          <div className="bg-bg-card border border-gold-border rounded-lg p-6">
            <h2 className="font-display text-sm font-semibold text-gold tracking-widest uppercase mb-4">Contactos</h2>
            <div className="space-y-4">
              <a href="tel:+351910000000" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full border border-gold-border flex items-center justify-center flex-shrink-0 group-hover:border-gold transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <span className="text-text-secondary text-sm group-hover:text-gold transition-colors">+351 910 000 000</span>
              </a>
              <a href="mailto:geral@ganeshaink.pt" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full border border-gold-border flex items-center justify-center flex-shrink-0 group-hover:border-gold transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <span className="text-text-secondary text-sm group-hover:text-gold transition-colors">geral@ganeshaink.pt</span>
              </a>
              <a href="https://www.instagram.com/ganeshaink" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full border border-gold-border flex items-center justify-center flex-shrink-0 group-hover:border-gold transition-colors">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="text-gold">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="text-text-secondary text-sm group-hover:text-gold transition-colors">@ganeshaink no Instagram</span>
              </a>
            </div>
          </div>

          <Link
            href="/marcar"
            className="inline-flex px-6 py-3 bg-gold text-bg-primary font-semibold rounded hover:bg-gold-light transition-colors"
          >
            Marcar Agora
          </Link>
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
