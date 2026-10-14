import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: 'Ganesha Ink Barbearia',
  description: 'Barbearia Ganesha Ink em Vale de Cambra — cortes, barba e degradê.',
  url: 'https://ganeshaink.pt/barbearia',
  image: 'https://ganeshaink.pt/images/logo/ganesha-logo-gold-white.webp',
  telephone: '+351913570454',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Eng. Duarte Pacheco n.º 33',
    addressLocality: 'Vale de Cambra',
    addressRegion: 'Aveiro',
    postalCode: '3730-254',
    addressCountry: 'PT',
  },
  areaServed: ['Vale de Cambra', 'Oliveira de Azeméis', 'São João da Madeira', 'Arouca', 'Distrito de Aveiro'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:30',
      closes: '18:00',
    },
  ],
  sameAs: ['https://www.instagram.com/ganeshaink'],
};

export default function BarberStory() {
  return (
    <section className="relative z-10 overflow-visible bg-black py-12 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <article className="relative mx-auto w-full max-w-7xl px-5 md:px-12 lg:px-16">
        <ScrollReveal className="mb-10 md:mb-16">
          <p className="font-gate text-[0.68rem] uppercase tracking-[0.38em] text-gold mb-4">
            Ganesha Ink
          </p>
          <h2 className="font-gate text-2xl sm:text-3xl md:text-5xl font-semibold uppercase tracking-[0.12em] text-gold-light max-w-4xl">
            Barbearia
            <br />
            Em Vale de Cambra
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start">
          <ScrollReveal className="md:pr-12 lg:pr-16" shift={48}>
            <span className="block h-px w-10 bg-gold mb-5" />
            <h3 className="font-gate text-xl md:text-2xl uppercase tracking-[0.16em] text-gold mb-6">
              Na cadeira
            </h3>
            <div className="space-y-5 text-lg md:text-xl leading-relaxed text-white/80">
              <p>
                Degradê, tesoura, clássico, rapado ou barba. Falamos sobre o corte,
                percebemos o que queres e pomos mãos no corte.
              </p>
              <p className="text-base md:text-lg text-white/78">
                Escolhe a hora no site. O corte fica connosco.
              </p>
            </div>
            <Link
              href="/marcar?area=barbershop"
              className="mt-8 inline-flex items-center px-6 py-3 bg-gold text-bg-primary font-semibold rounded hover:bg-gold-light transition-colors"
            >
              Marcar corte
            </Link>
          </ScrollReveal>

          <div className="hidden md:block w-px" aria-hidden />

          <ScrollReveal className="mt-12 md:mt-0 md:pl-12 lg:pl-16" shift={56}>
            <span className="block h-px w-10 bg-gold mb-5" />
            <h3 className="font-gate text-xl md:text-2xl uppercase tracking-[0.16em] text-gold mb-6">
              O espaço
            </h3>
            <div className="space-y-5 text-base md:text-lg leading-relaxed text-white/78">
              <p>
                A Ganesha Ink junta tatuagem, barbearia e beleza num só espaço. Um estúdio
                com diferentes formas de expressão, onde há lugar para cortes de cabelo,
                cuidados de beleza e tatuagens.
              </p>
              <p>
                Um conceito pensado para homens e mulheres, com serviços diferentes, mas
                com algo em comum: a liberdade de escolher o teu estilo.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </section>
  );
}
