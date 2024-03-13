/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        'Madimi': ['Madimi One', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

