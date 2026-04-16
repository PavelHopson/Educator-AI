/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "!./node_modules/**",
  ],
  theme: {
    extend: {
      colors: {
        quest: {
          50:  '#F2F5F9',
          100: '#C4CED8',
          200: '#94A3B8',
          300: '#6BA3FF',
          400: '#6BA3FF',
          500: '#4A7FD4',
          600: '#3A6BB5',
          700: '#1C2536',
          800: '#111820',
          900: '#0C1117',
          950: '#05070A',
        },
        accent: '#6BA3FF',
        success: '#4AE6A0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(107, 163, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(107, 163, 255, 0.6)' },
        }
      }
    }
  },
  plugins: [],
}
