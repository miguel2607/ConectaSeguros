/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'conecta-orange': '#FDB03D',
        'conecta-orange-dark': '#e09a2a',
        'conecta-blue': '#1A2B4C',
        'conecta-blue-light': '#2A3B5C',
      },
      fontFamily: {
        sans: ['Antipasto'],
        serif: ['Antipasto'],
        mono: ['Antipasto'],
      },
      fontWeight: {
        thin: '200',
        light: '200',
        normal: '400',
        regular: '400',
        medium: '400',
        semibold: '400',
        bold: '400',
        extrabold: '400',
        black: '400',
      },
    },
  },
  plugins: [],
}

