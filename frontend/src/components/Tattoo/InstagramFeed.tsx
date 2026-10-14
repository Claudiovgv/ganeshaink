import Image from 'next/image';
import { getInstagramPosts, INSTAGRAM_PROFILE } from '@/lib/instagram';

export default async function InstagramFeed() {
  const posts = await getInstagramPosts();

  return (
    <section className="relative z-10 overflow-visible bg-transparent py-12 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-12 lg:px-16">
        <header className="mb-10 md:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-gate text-[0.68rem] uppercase tracking-[0.38em] text-gold mb-3">
              Instagram
            </p>
            <h2 className="font-gate text-3xl md:text-5xl font-semibold uppercase tracking-[0.12em] text-gold-light">
              No estúdio
            </h2>
          </div>
          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="font-gate text-[0.72rem] uppercase tracking-[0.22em] text-gold/80 hover:text-gold transition-colors"
          >
            @ganeshainktattoostudio
          </a>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden border border-gold/20 bg-black/40"
            >
              <Image
                src={post.src}
                alt="Publicação Ganesha Ink no Instagram"
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
