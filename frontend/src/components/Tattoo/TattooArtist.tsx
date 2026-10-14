import Image from 'next/image';

export default function TattooArtist() {
  return (
    <section className="relative z-10 overflow-visible bg-transparent py-12 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="relative w-full max-w-lg mx-auto md:mx-0 overflow-visible">
          <Image
            src="/images/employees/ricardo-vieira.png"
            alt="Ricardo Vieira, tatuador da Ganesha Ink"
            width={768}
            height={1024}
            unoptimized
            className="h-auto w-full object-contain object-center"
          />
        </div>

        <div className="md:pl-4">
          <span className="block h-px w-12 bg-gold mb-6" />
          <p className="font-gate text-[0.68rem] uppercase tracking-[0.38em] text-gold mb-3">
            O tatuador
          </p>
          <h2 className="font-gate text-4xl md:text-6xl font-semibold uppercase tracking-[0.14em] text-gold-light mb-6">
            Ricardo Vieira
          </h2>
          <div className="space-y-4 text-white/78 leading-relaxed text-base md:text-lg max-w-xl">
            <p>
              Tatuador e body piercer da Ganesha Ink. Há 14 anos no estúdio, o Ricardo trata de
              cada peça como se fosse a única: blackwork, realismo, fineline e custom feito de
              raiz.
            </p>
            <p>
              O traço, a colocação e a sessão ficam com ele — pele limpa, agulha certa, desenho
              teu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
