const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'TattooParlor',
  name: 'Ganesha Ink',
  alternateName: 'Ganesha Ink Tattoostudio',
  description:
    'Estúdio de tatuagem e body piercing em Vale de Cambra. Tatuagens personalizadas, consulta e higiene profissional.',
  url: 'https://ganeshaink.pt/tattoo',
  image: 'https://ganeshaink.pt/images/logo/ganesha-logo-gold-white.webp',
  telephone: '+351913570454',
  email: 'ricardo.vieira@ganeshaink.pt',
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

export default function TattooStudioStory() {
  return (
    <section className="relative z-10 overflow-visible bg-transparent py-12 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <article className="relative mx-auto w-full max-w-7xl px-5 md:px-12 lg:px-16">
        <header className="mb-10 md:mb-16">
          <p className="font-gate text-[0.68rem] uppercase tracking-[0.38em] text-gold mb-4">
            Ganesha Ink
          </p>
          <h2 className="font-gate text-2xl sm:text-3xl md:text-5xl font-semibold uppercase tracking-[0.12em] text-gold-light max-w-4xl">
            Estúdio de tatuagem
            <br />
            Em Vale de Cambra
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start">
          <div className="md:pr-12 lg:pr-16">
            <span className="block h-px w-10 bg-gold mb-5" />
            <h3 className="font-gate text-xl md:text-2xl uppercase tracking-[0.16em] text-gold mb-6">
              O estúdio
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              A <strong className="text-white font-medium">Ganesha Ink</strong> é um tattoostudio em
              Vale de Cambra, há 14 anos que fazemos tatuagem e body piercing à medida. Peça a
              peça, com consulta.
            </p>
          </div>

          <div
            className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-gold/40 to-transparent"
            aria-hidden
          />

          <div className="mt-12 md:mt-0 md:pl-12 lg:pl-16">
            <span className="block h-px w-10 bg-gold mb-5" />
            <h3 className="font-gate text-xl md:text-2xl uppercase tracking-[0.16em] text-gold mb-6">
              O conceito
            </h3>
            <div className="space-y-5 text-base md:text-lg leading-relaxed text-white/78">
              <p>
                A tatuagem não é um catálogo, é uma conversa. Na Ganesha cada trabalho começa pelo
                que queres levar, blackwork, realismo, fineline ou um custom feito de raiz. Tratamos
                de traço a traço. O nosso rigor em estúdio é exímio, em todas as sessões: pele
                limpa, agulha certa, desenho teu.
              </p>
              <p>
                Quem entra na Ganesha de Vale de Cambra pensa em ficar, e não passar à pressa,
                apenas para um serviço ocasional.
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
