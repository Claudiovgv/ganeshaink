import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter, Cinzel } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ClientErrorReporter from '@/components/ClientErrorReporter';
import AdSenseLoader from '@/components/AdSenseLoader';
import HideOnGate from '@/components/HideOnGate';
import { SITE_LOGO, SITE_NAME, SITE_ORIGIN } from '@/lib/site';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0D0D0D',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },
  title: {
    template: '%s | Ganesha Ink',
    default: 'Ganesha Ink — Estúdio de Tatuagem, Barbearia e Beauty em Vale de Cambra',
  },
  description:
    'Estúdio de tatuagem, barbearia e salão de beauty em Vale de Cambra. Tatuagens personalizadas, cortes e estética de unhas. Marcações online para barbearia e Beauty.',
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/images/logo/ganesha-icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo/ganesha-icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/logo/ganesha-icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: [{ url: '/images/logo/ganesha-apple-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: 'pt_PT',
    type: 'website',
    images: [{ url: SITE_LOGO, width: 640, height: 640, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [SITE_LOGO],
  },
  other: {
    'google-adsense-account': 'ca-pub-9938976891580683',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${playfair.variable} ${inter.variable} ${cinzel.variable}`}>
      <body className="bg-bg-primary text-text-primary font-body min-h-screen flex flex-col antialiased">
        <HideOnGate>
          <Header />
        </HideOnGate>
        <ClientErrorReporter />
        <AdSenseLoader />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <HideOnGate>
          <Footer />
        </HideOnGate>
      </body>
    </html>
  );
}
