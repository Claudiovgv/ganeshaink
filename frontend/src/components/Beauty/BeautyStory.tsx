import Link from 'next/link';
import ScrollReveal from '@/components/Barbearia/ScrollReveal';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'NailSalon',
  name: 'Ganesha Ink Beauty',
  description: 'Estética de unhas Ganesha Ink em Vale de Cambra.',
  url: 'https://ganeshaink.pt/nails',
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

export default function BeautyStory() {
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
            Beauty
            <br />
            Em Vale de Cambra
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start">
          <ScrollReveal className="md:pr-12 lg:pr-16" shift={48}>
            <span className="block h-px w-10 bg-gold mb-5" />
            <h3 className="font-gate text-xl md:text-2xl uppercase tracking-[0.16em] text-gold mb-6">
              A mesa
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              Senta-te, escolhe a cor e decide o que te apetece fazer. Gel, acrílico ou
              um detalhe diferente nas unhas.
            </p>
          </ScrollReveal>

          <div className="hidden md:block w-px" aria-hidden />

          <ScrollReveal className="mt-12 md:mt-0 md:pl-12 lg:pl-16" shift={56}>
            <span className="block h-px w-10 bg-gold mb-5" />
            <h3 className="font-gate text-xl md:text-2xl uppercase tracking-[0.16em] text-gold mb-6">
              O detalhe
            </h3>
            <div className="space-y-5 text-base md:text-lg leading-relaxed text-white/78">
              <p>
                Manicure, pedicure e nail art, com atenção ao acabamento e ao resultado
                que procuras. Desde algo simples a um desenho mais trabalhado, o importante
                é que gostes.
              </p>
              <p>
                Marca a tua hora no site. A cor escolhe-se à mesa.
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
      </article>
    </section>
  );
}
