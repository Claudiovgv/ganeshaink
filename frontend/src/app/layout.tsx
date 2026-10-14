import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter, Cinzel } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ClientErrorReporter from '@/components/ClientErrorReporter';
import AdSenseLoader from '@/components/AdSenseLoader';
import HideOnGate from '@/components/HideOnGate';

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
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Ganesha Ink',
  },
  title: {
    template: '%s | Ganesha Ink',
    default: 'Ganesha Ink — Tatuagem, Barbearia & Piercing em Vale de Cambra',
  },
  description:
    'Studio premium de tatuagem, barbearia, body piercing e estética de unhas em Vale de Cambra. Marcações online disponíveis.',
  icons: {
    icon: '/images/logo/ganesha-icon.webp',
    apple: '/images/logo/ganesha-icon.png',
  },
  openGraph: {
    siteName: 'Ganesha Ink',
    locale: 'pt_PT',
    type: 'website',
  },
  other: {
    'google-adsense-account': 'ca-pub-9938976891580683',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${playfair.variable} ${inter.variable} ${cinzel.variable}`}>
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
