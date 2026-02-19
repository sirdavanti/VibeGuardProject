/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vibeBlue: '#002366',
        vibeCoral: '#FF7F50',
        vibeOffWhite: '#F8F9FA',
      },
    },
  },
  plugins: [],
}