import Image from 'next/image';

export default function BeautyHero() {
  return (
    <section className="relative h-[100dvh] overflow-hidden bg-black">
      <h1 className="sr-only">Beauty — salão de unhas Ganesha Ink em Vale de Cambra</h1>
      <Image
        src="/images/employees/vera-ferreira.webp"
        alt="Vera Ferreira, nail artist da Ganesha Ink"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_20%]"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute left-1/2 top-1/2 z-10 w-[min(86vw,32rem)] -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/images/logo/ganesha-logo-gold-white.webp"
          alt="Ganesha Ink"
          width={720}
          height={360}
          priority
          className="h-auto w-full object-contain drop-shadow-[0_0_24px_rgba(201,168,76,0.24)]"
        />
      </div>
    </section>
  );
}
