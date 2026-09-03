import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-bg-card border-t border-gold-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Sobre */}
        <div className="md:col-span-2">
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/images/logo/ganesha-logo-gold.webp"
              alt="Ganesha Ink"
              width={140}
              height={50}
              className="object-contain"
            />
          </Link>
          <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
            14 anos a transformar estilo em expressão. Na Ganesha Ink, tatuagens, barbearia e unhas convivem com arte e atitude.
          </p>
        </div>

        {/* Links Rápidos */}
        <div>
          <h3 className="text-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Links Rápidos
          </h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>
              <Link href="/politica-de-privacidade" className="hover:text-gold transition-colors">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/politica-de-cookies" className="hover:text-gold transition-colors">
                Política de Cookies
              </Link>
            </li>
            <li>
              <a
                href="https://www.livroreclamacoes.pt/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                Livro de Reclamações
              </a>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Contacto
          </h3>
          <address className="not-italic text-sm text-text-secondary space-y-3">
            <a
              href="https://maps.google.com/?q=R.+Eng.+Duarte+Pacheco+33,+3730-254+Vale+de+Cambra"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors block"
            >
              R. Eng. Duarte Pacheco n.º 33<br />
              3730-254 Vale de Cambra
            </a>
            <div>
              <a href="tel:+351913570454" className="hover:text-gold transition-colors block">
                +351 913 570 454
              </a>
              <p className="text-xs text-text-muted mt-0.5">
                Custo de uma chamada para a rede fixa nacional.
              </p>
            </div>
            <a href="mailto:ricardo.vieira@ganeshaink.pt" className="hover:text-gold transition-colors block">
              ricardo.vieira@ganeshaink.pt
            </a>
          </address>

          <div className="flex gap-4 mt-5">
            <a
              href="https://www.instagram.com/ganeshaink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gold-border py-4 text-center text-xs text-text-secondary">
        © {new Date().getFullYear()} Ganesha Ink · Todos os direitos reservados
      </div>
    </footer>
  );
}
