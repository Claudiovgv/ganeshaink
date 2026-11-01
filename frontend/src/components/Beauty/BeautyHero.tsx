import Image from 'next/image';

export default function BeautyHero() {
  return (
    <section className="relative h-[100dvh] overflow-hidden bg-black">
      <h1 className="sr-only">Beauty — salão de unhas Ganesha Ink em Vale de Cambra</h1>
      <Image
        src="/images/hero/beauty-hero-portrait.webp"
        alt="Cores e vernizes de unhas no Beauty da Ganesha Ink"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center md:hidden"
      />
      <Image
        src="/images/hero/beauty-hero.webp"
        alt="Cores e vernizes de unhas no Beauty da Ganesha Ink"
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-[center_40%] md:block"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25" />
    </section>
  );
}
