/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   '#0f1117',
          secondary: '#1a1d27',
          card:      '#1e2130',
          elevated:  '#252838',
        },
        brand: {
          DEFAULT: '#6c63ff',
          light:   '#8b85ff',
          dark:    '#4f47e0',
        },
        accent: {
          amber:  '#f59e0b',
          emerald:'#10b981',
          rose:   '#f43f5e',
        },
        border: {
          DEFAULT: '#2e3247',
          light:   '#3d4262',
        },
        text: {
          primary:   '#f0f1f5',
          secondary: '#9aa0b9',
          muted:     '#5d6380',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl2: '1rem',
        xl3: '1.25rem',
      },
      boxShadow: {
        card:  '0 4px 24px 0 rgba(0,0,0,0.35)',
        glow:  '0 0 24px 0 rgba(108,99,255,0.25)',
        glowSm:'0 0 12px 0 rgba(108,99,255,0.18)',
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease',
        'slide-up':   'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer':    'shimmer 1.5s infinite',
        'scale-in':   'scaleIn 0.2s ease',
        'cart-bounce':'cartBounce 0.4s ease',
      },
      keyframes: {
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:  { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer:  { '0%': { backgroundPosition: '-400px 0' }, '100%': { backgroundPosition: '400px 0' } },
        scaleIn:  { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        cartBounce: {
          '0%':   { transform: 'scale(1)' },
          '40%':  { transform: 'scale(1.3)' },
          '70%':  { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
