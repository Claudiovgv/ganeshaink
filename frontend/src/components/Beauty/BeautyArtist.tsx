import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/Barbearia/ScrollReveal';

export default function BeautyArtist() {
  return (
    <section className="relative z-10 overflow-visible bg-black py-12 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <ScrollReveal className="relative w-full max-w-lg mx-auto md:mx-0 overflow-visible" shift={40}>
          <Image
            src="/images/employees/vera-ferreira.webp"
            alt="Vera Ferreira, nail artist da Ganesha Ink"
            width={768}
            height={1024}
            className="h-auto w-full object-contain object-center"
          />
        </ScrollReveal>

        <ScrollReveal className="md:pl-4" shift={52}>
          <span className="block h-px w-12 bg-gold mb-6" />
          <p className="font-gate text-[0.68rem] uppercase tracking-[0.38em] text-gold mb-3">
            A nail artist
          </p>
          <h2 className="font-gate text-4xl md:text-6xl font-semibold uppercase tracking-[0.14em] text-gold-light mb-6">
            Vera Ferreira
          </h2>
          <div className="space-y-4 text-white/78 leading-relaxed text-base md:text-lg max-w-xl">
            <p>
              Nail artist da casa. Gel, acrílico e o detalhe que pedes — a mão a pensar
              no teu estilo, não no catálogo da semana.
            </p>
            <p>
              A mesa é dela. Tu marcas a hora.
            </p>
          </div>
          <Link
            href="/marcar?area=nails"
            className="mt-8 inline-flex items-center px-6 py-3 bg-gold text-bg-primary font-semibold rounded hover:bg-gold-light transition-colors"
          >
            Marcar unhas
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
