import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await api.blog.get(params.slug).catch(() => null);
  if (!post) return { title: 'Artigo não encontrado' };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || undefined,
    openGraph: post.coverImageUrl
      ? { images: [{ url: post.coverImageUrl }] }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await api.blog.get(params.slug).catch(() => null);
  if (!post) notFound();

  return (
    <div className="pt-20">
      {post.coverImageUrl && (
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary" />
        </div>
      )}

      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/blog" className="text-text-secondary text-sm hover:text-gold transition-colors mb-8 inline-flex items-center gap-1">
          ← Blog
        </Link>
        <p className="text-text-secondary text-sm mt-4">{formatDate(post.publishedAt)}</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-8 leading-tight">
          {post.title}
        </h1>
        <div className="prose prose-invert prose-gold max-w-none text-text-secondary leading-relaxed
          [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text-primary [&_h2]:mt-10 [&_h2]:mb-4
          [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-text-primary [&_h3]:mt-8 [&_h3]:mb-3
          [&_p]:mb-5
          [&_a]:text-gold [&_a]:no-underline hover:[&_a]:underline
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5
          [&_li]:mb-1
          [&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-secondary
          [&_code]:bg-bg-card [&_code]:text-gold [&_code]:px-1 [&_code]:rounded [&_code]:text-sm
          [&_pre]:bg-bg-card [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-5
        ">
          <ReactMarkdown>{post.content || ''}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
