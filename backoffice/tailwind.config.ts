import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#DFC06A',
          muted: 'rgba(201,168,76,0.08)',
          border: 'rgba(201,168,76,0.25)',
        },
        bg: {
          primary: '#0D0D0D',
          section: '#111111',
          card: '#1A1A1A',
          sidebar: '#141414',
        },
        text: {
          primary: '#F5F0E8',
          secondary: '#9A9078',
          muted: '#5A5040',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
