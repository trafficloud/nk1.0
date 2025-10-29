/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#1A3A63',
        accent: '#FF5722',
        icon: '#4ECDC4',
        text: {
          DEFAULT: '#333333',
          dark: '#0A0A0A',
        },
        bg: {
          soft: '#F9FAFB',
          card: '#FFFFFF',
        },
        ctaButton: '#FF5722',
      },
      boxShadow: {
        'elev-1': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'elev-2': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'elev-3': '0 8px 24px rgba(0, 0, 0, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'reveal': 'reveal 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'zoom-in': 'zoomIn 0.6s ease-out',
        'shine': 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};