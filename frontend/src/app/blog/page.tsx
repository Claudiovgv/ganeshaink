import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api, BlogPost } from '@/lib/api';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artigos sobre tatuagem, barbearia, cuidados e tendências do Ganesha Ink.',
};

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-bg-card border border-gold-border rounded-lg overflow-hidden hover:border-gold transition-colors"
    >
      {post.coverImageUrl && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <p className="text-text-secondary text-xs mb-2">{formatDate(post.publishedAt)}</p>
        <h2 className="font-display text-xl font-semibold group-hover:text-gold transition-colors mb-2 leading-snug">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
        )}
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await api.blog.list().catch(() => [] as BlogPost[]);

  return (
    <div className="pt-20">
      <section className="bg-bg-section py-16 px-4 text-center">
        <h1 className="font-display text-5xl font-bold mb-4">
          <span className="text-gold-gradient">Blog</span>
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          Inspiração, técnicas e novidades do mundo da arte na pele.
        </p>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-text-secondary py-16">Nenhum artigo publicado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
