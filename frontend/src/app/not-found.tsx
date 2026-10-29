import type { Metadata } from 'next';
import Link from 'next/link';
import { STUDIO_NAV } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-28 pb-20 text-center">
      <p className="font-gate text-[0.68rem] uppercase tracking-[0.38em] text-gold mb-4">Ganesha Ink</p>
      <h1 className="font-display text-4xl font-bold mb-4">Página não encontrada</h1>
      <p className="text-text-secondary max-w-md mb-10">
        Esta morada não existe. Escolhe o estúdio de tatuagem, a barbearia ou o Beauty em Vale de Cambra.
      </p>
      <nav aria-label="Destinos do estúdio" className="flex flex-col sm:flex-row gap-3">
        {STUDIO_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex items-center justify-center px-5 py-3 border border-gold/70 text-gold font-gate text-xs font-semibold uppercase tracking-[0.18em] rounded hover:bg-gold/10 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link href="/" className="mt-8 font-gate text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-gold">
        Voltar ao início
      </Link>
    </div>
  );
}
