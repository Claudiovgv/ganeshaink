import { MetadataRoute } from 'next';
import { api } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://ganeshaink.pt';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/servicos`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/artistas`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/galeria`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/marcar`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/consulta`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contacto`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const posts = await api.blog.list().catch(() => []);
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
