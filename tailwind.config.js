/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',    // deep blue-black background
          primary: '#6366f1', // indigo-500 equivalent
          secondary: '#ec4899', // pink-500
          accent: '#8b5cf6',    // violent-500
          light: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
