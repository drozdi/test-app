/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1976D2',
        secondary: '#5cbbf6',
        accent: '#9C27B0',
        positive: '#4caf50',
        negative: '#dc3545',
        info: '#2196f3',
        warning: '#fb8c00'
      },
    },
  },
  plugins: [],
}
