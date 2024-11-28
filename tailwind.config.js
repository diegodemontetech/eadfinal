/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      colors: {
        primary: '#E50914',
        background: '#121212',
        surface: '#1E1E1E',
        'surface-light': '#2A2A2A',
      },
    },
  },
  plugins: [],
};