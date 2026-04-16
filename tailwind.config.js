/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quest: {
          bg: '#05070A',
          surface: '#0C1117',
          card: '#111820',
          border: '#1C2536',
          accent: '#6BA3FF',
          'accent-light': '#9DC4FF',
          text: '#F2F5F9',
          muted: '#94A3B8',
          dim: '#4A5568',
        },
        accent: '#6BA3FF',
        success: '#22c55e',
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
