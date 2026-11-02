/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#08090D',
          secondary: '#101219',
          tertiary: '#161922',
        },
        primary: {
          DEFAULT: '#FFFFFF',
          muted: '#A5A7B0',
          dark: '#6F727D',
        },
        accent: {
          DEFAULT: '#A78BFA', // Soft Lavender
          light: '#C4B5FD',
          dark: '#7C3AED',
          glow: 'rgba(167, 139, 250, 0.18)',
        },
        electric: {
          DEFAULT: '#38BDF8', // Subtle Electric Blue
          light: '#7DD3FC',
          dark: '#0284C7',
          glow: 'rgba(56, 189, 248, 0.16)',
        },
        glass: {
          bg: 'rgba(255, 255, 255, 0.04)',
          'bg-hover': 'rgba(255, 255, 255, 0.08)',
          'bg-active': 'rgba(255, 255, 255, 0.12)',
          border: 'rgba(255, 255, 255, 0.12)',
          'border-hover': 'rgba(255, 255, 255, 0.22)',
          'border-accent': 'rgba(167, 139, 250, 0.35)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
        'glass-heavy': '24px',
      },
      boxShadow: {
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.37)',
        'glass-md': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-lg': '0 12px 48px 0 rgba(0, 0, 0, 0.55)',
        'glow-accent': '0 0 35px -5px rgba(167, 139, 250, 0.3)',
        'glow-electric': '0 0 35px -5px rgba(56, 189, 248, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

