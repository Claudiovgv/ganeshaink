import type { Metadata } from 'next';
import ChoiceGate from '@/components/Gate/ChoiceGate';

export const metadata: Metadata = {
  title: 'Ganesha Ink — Tatuagem, Barbearia & Beauty',
  description:
    'Entra no estúdio Ganesha Ink em Vale de Cambra. Escolhe o teu universo: Tattoostudio, Barbearia ou Beauty.',
};

export default function GatePage() {
  return <ChoiceGate />;
}
