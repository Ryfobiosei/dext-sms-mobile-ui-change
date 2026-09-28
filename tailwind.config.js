/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#f8fafc',
          dark: '#05060b',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#0d101c',
        },
        card: {
          DEFAULT: '#ffffff',
          dark: '#111424',
        },
        border: {
          DEFAULT: '#e2e8f0',
          dark: '#1e2336',
        },
        'text-primary': {
          DEFAULT: '#0f172a',
          dark: '#f1f5f9',
        },
        'text-secondary': {
          DEFAULT: '#475569',
          dark: '#94a3b8',
        },
        'text-muted': {
          DEFAULT: '#64748b',
          dark: '#64748b',
        },
        primary: {
          DEFAULT: '#2563eb',
          dark: '#3b82f6',
        },
        success: {
          DEFAULT: '#16a34a',
          dark: '#22c55e',
        },
        warning: {
          DEFAULT: '#d97706',
          dark: '#f59e0b',
        },
        error: {
          DEFAULT: '#dc2626',
          dark: '#ef4444',
        },
        option: {
          a: '#2563eb',
          b: '#16a34a',
          c: '#d97706',
          d: '#9333ea',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
