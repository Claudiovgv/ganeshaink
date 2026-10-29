import { MetadataRoute } from 'next';
import { SITE_ORIGIN, absoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/cancelar'] },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_ORIGIN,
  };
}
