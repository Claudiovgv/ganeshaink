import type { Metadata } from 'next';
import ChoiceGate from '@/components/Gate/ChoiceGate';
import JsonLd from '@/components/seo/JsonLd';
import { localBusinessJsonLd, pageMetadata, PATHS, websiteJsonLd } from '@/lib/site';

export const revalidate = 86400;

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Estúdio de tatuagem, barbearia e beauty em Vale de Cambra',
    description:
      'Ganesha Ink em Vale de Cambra: estúdio de tatuagem, barbearia e salão de beauty. Tatuagens personalizadas, cortes e estética de unhas no mesmo espaço.',
    path: PATHS.home,
    ogTitle: 'Ganesha Ink — Tatuagem, Barbearia e Beauty em Vale de Cambra',
  }),
  title: {
    absolute: 'Ganesha Ink — Estúdio de Tatuagem, Barbearia e Beauty em Vale de Cambra',
  },
};

export default function GatePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={localBusinessJsonLd()} />
      <h1 className="sr-only">
        Ganesha Ink — estúdio de tatuagem, barbearia e salão de beauty em Vale de Cambra
      </h1>
      <ChoiceGate />
    </>
  );
}
