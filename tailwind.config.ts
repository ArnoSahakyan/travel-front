/** @type {import('tailwindcss').Config} */
import * as defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      mono: [...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        primary: {
          light: '#2A7A7B',
          dark: '#1BA098',
        },
        secondary: {
          light: '#4A5568',
          dark: '#869BA9',
        },
        accent: {
          light: '#E07A5F',
          dark: '#E07A5F',
        },
        background: {
          light: '#F5F7FA',
          dark: '#081521',
        },
        text: {
          light: '#D4A96A',
          dark: '#DEB992',
        },
      },
    },
  },
  plugins: [typography],
};
