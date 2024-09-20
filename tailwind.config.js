/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: '#B0B0B0',
        primary: '#288364',
        base_400: '#B0B0B0',
      },
      fontFamily: {
        'darker-grotesque': ['Darker Grotesque', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [{
      light: {
        "primary": "#288364",
        "secondary": "#288364",
        "accent": "#288364",
        "neutral": "#288364",
        "base-100": "#FFFFFF",
        "base-200": "#F5F5F5",
        "base-300": "#E0E0E0",
      },
    }, "dark"],
  },
  darkMode: ["class", "[data-theme='dark']"],
}

