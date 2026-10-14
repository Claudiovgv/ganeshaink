import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function BarberArtist() {
  return (
    <section className="relative z-10 overflow-visible bg-black py-12 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <ScrollReveal className="relative w-full max-w-lg mx-auto md:mx-0 overflow-visible" shift={40}>
          <Image
            src="/images/employees/eduardo-gomes.webp"
            alt="Eduardo Gomes, barbeiro da Ganesha Ink"
            width={768}
            height={1024}
            className="h-auto w-full object-contain object-center"
          />
        </ScrollReveal>

        <ScrollReveal className="md:pl-4" shift={52}>
          <span className="block h-px w-12 bg-gold mb-6" />
          <p className="font-gate text-[0.68rem] uppercase tracking-[0.38em] text-gold mb-3">
            O barbeiro
          </p>
          <h2 className="font-gate text-4xl md:text-6xl font-semibold uppercase tracking-[0.14em] text-gold-light mb-6">
            Eduardo Gomes
          </h2>
          <div className="space-y-4 text-white/78 leading-relaxed text-base md:text-lg max-w-xl">
            <p>
              Barbeiro da casa. Preciso no degradê, no clássico e no acabamento da barba —
              um corte a pensar no rosto, não na moda da semana.
            </p>
            <p>
              A cadeira é dele. Tu marcas a hora.
            </p>
          </div>
          <Link
            href="/marcar?area=barbershop"
            className="mt-8 inline-flex items-center px-6 py-3 bg-gold text-bg-primary font-semibold rounded hover:bg-gold-light transition-colors"
          >
            Marcar corte
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
