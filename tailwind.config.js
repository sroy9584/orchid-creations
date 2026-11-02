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
        // Base Charcoal Slate (Derived from #192526)
        background: {
          DEFAULT: '#0D1516',
          secondary: '#192526', // Exact Adobe Palette #192526
          tertiary: '#243436',
          card: 'rgba(25, 37, 38, 0.75)',
        },
        // Crisp Porcelain Text (Exact Adobe Palette #F0F2F2)
        primary: {
          DEFAULT: '#F0F2F2', // Exact Adobe Palette #F0F2F2
          muted: '#A5B5B6',
          dark: '#687B7C',
        },
        // Signature Orchid Magenta (Exact Adobe Palette #BF54A3)
        accent: {
          DEFAULT: '#BF54A3', // Exact Adobe Palette #BF54A3
          light: '#D977BF',
          dark: '#8E3476',
          plum: '#592D4D',   // Exact Adobe Palette #592D4D
          glow: 'rgba(191, 84, 163, 0.28)',
        },
        // Deep Orchid Plum (Exact Adobe Palette #592D4D)
        plum: {
          DEFAULT: '#592D4D',
          dark: '#3D1E34',
          light: '#7A3F6A',
          glow: 'rgba(89, 45, 77, 0.35)',
        },
        // Emerald Teal Accent (Exact Adobe Palette #107361)
        teal: {
          DEFAULT: '#107361', // Exact Adobe Palette #107361
          light: '#189981',
          dark: '#0B4E42',
          glow: 'rgba(16, 115, 97, 0.25)',
        },
        glass: {
          bg: 'rgba(240, 242, 242, 0.04)',
          'bg-hover': 'rgba(240, 242, 242, 0.08)',
          'bg-active': 'rgba(191, 84, 163, 0.15)',
          border: 'rgba(240, 242, 242, 0.12)',
          'border-hover': 'rgba(191, 84, 163, 0.35)',
          'border-accent': 'rgba(191, 84, 163, 0.55)',
          'border-teal': 'rgba(16, 115, 97, 0.45)',
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
        'glass-sm': '0 4px 16px 0 rgba(13, 21, 22, 0.5)',
        'glass-md': '0 8px 32px 0 rgba(13, 21, 22, 0.6)',
        'glass-lg': '0 12px 48px 0 rgba(13, 21, 22, 0.75)',
        'glow-accent': '0 0 35px -5px rgba(191, 84, 163, 0.4)',
        'glow-plum': '0 0 35px -5px rgba(89, 45, 77, 0.45)',
        'glow-teal': '0 0 35px -5px rgba(16, 115, 97, 0.35)',
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
