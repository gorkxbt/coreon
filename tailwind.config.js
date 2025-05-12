/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'coreon-blue': {
          light: '#5CDBFF',
          DEFAULT: '#30C6FF',
          dark: '#0078A9',
        },
        'coreon-navy': {
          light: '#102050',
          DEFAULT: '#081136',
          dark: '#050A20',
        },
        'coreon-gray': {
          light: '#F5F5F7',
          DEFAULT: '#E5E5E5',
          dark: '#BBBBBB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(10px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(10px) rotate(-360deg)' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 10px 2px rgba(48, 198, 255, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 25px 5px rgba(48, 198, 255, 0.5)',
          },
        },
      },
      animation: {
        'orbit': 'orbit 8s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} 