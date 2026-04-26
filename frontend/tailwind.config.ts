import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0D0D0D',
        'bg-card': '#1A1A1A',
        'bg-section': '#111111',
        'gold': '#C9A84C',
        'gold-light': '#E8C96A',
        'gold-muted': 'rgba(201,168,76,0.15)',
        'gold-border': 'rgba(201,168,76,0.3)',
        'text-primary': '#F5F5F5',
        'text-secondary': '#A0A0A0',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
