import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4f7f3',
          100: '#e6ede5',
          200: '#cddacb',
          300: '#a8c0a5',
          400: '#8FAF8A',
          500: '#6a9165',
          600: '#537450',
          700: '#435d41',
          800: '#374b36',
          900: '#2e3e2d',
        },
        rose: {
          50: '#fdf6f3',
          100: '#f9ebe4',
          200: '#f2d4c6',
          300: '#e8b49f',
          400: '#C4927A',
          500: '#b87258',
          600: '#a05c44',
          700: '#864a38',
          800: '#6f3e31',
          900: '#5d352b',
        },
        gold: {
          50: '#fdf9f0',
          100: '#f9f0da',
          200: '#f1deb1',
          300: '#e5c67e',
          400: '#C8A96E',
          500: '#b8903f',
          600: '#9e7530',
          700: '#825d29',
          800: '#6b4b27',
          900: '#593e25',
        },
        cream: '#FAF7F2',
        charcoal: '#2D2D2D',
      },
      fontFamily: {
        frank: ['Frank Ruhl Libre', 'serif'],
        heebo: ['Heebo', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 70% 50% 40%' },
          '75%': { borderRadius: '60% 40% 60% 30% / 70% 40% 60% 30%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #FAF7F2 0%, #f0ebe3 25%, #e8ddd3 50%, #f5f0ea 75%, #FAF7F2 100%)',
      },
    },
  },
  plugins: [],
}

export default config
