/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2D9CDB',
          dark: '#1B6CA7',
        },
        secondary: {
          light: '#5e2eb1',
          dark: '#8460C3',
        },
        accent: {
          light: '#27AE60',
          dark: '#219150',
        },
        background: {
          light: '#F8FAFC',
          dark: '#0D1B2A',
        },
        text: {
          light: '#1E293B',
          dark: '#E5E7EB',
        },
      },
    },
  },
  plugins: [],
};
