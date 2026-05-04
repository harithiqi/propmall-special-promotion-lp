/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/*.js"],
  theme: {
    extend: {
      colors: {
        'pm-orange': '#F4980E',
        'pm-orange-light': '#F4A42A',
        'pm-red': '#EC221F',
        'pm-green': '#00C950',
        'pm-whatsapp': '#25D366',
        'pm-dark': '#1a1a1a',
        'pm-muted': '#6A7282',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
