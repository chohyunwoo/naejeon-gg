import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '80rem',
      },
    },
    extend: {
      colors: {
        base: {
          50: '#faf9f7',
          100: '#f4f2ee',
          200: '#e8e5df',
          300: '#d4cfc6',
          400: '#a8a298',
          500: '#7a7468',
          600: '#5c5648',
          700: '#403a30',
          800: '#2a261f',
          900: '#1a1813',
        },
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          500: '#06b6d4',
          600: '#0891b2',
        },
        border: '#e8e5df',
        input: '#e8e5df',
        ring: '#7c3aed',
        background: '#faf9f7',
        foreground: '#1a1813',
        primary: {
          DEFAULT: '#1a1813',
          foreground: '#faf9f7',
        },
        secondary: {
          DEFAULT: '#f4f2ee',
          foreground: '#403a30',
        },
        muted: {
          DEFAULT: '#f4f2ee',
          foreground: '#7a7468',
        },
        accent: {
          DEFAULT: '#f4f2ee',
          foreground: '#403a30',
        },
        destructive: {
          DEFAULT: '#dc2626',
          foreground: '#faf9f7',
        },
        card: {
          DEFAULT: '#faf9f7',
          foreground: '#1a1813',
        },
        popover: {
          DEFAULT: '#faf9f7',
          foreground: '#1a1813',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'card-hover': '0 12px 32px -8px rgba(64, 58, 48, 0.12)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
};

export default config;
