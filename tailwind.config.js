/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        man: '#002772',
        'man-secondary': '#d6e6ff',
        woman: '#720060',
        'woman-secondary': '#fde2ff',
        jewel: '#b89000',
        'jewel-secondary': '#fff5e1',
        electronic: '#006633',
        'electronic-secondary': '#e6ffe8',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#003366',
          secondary: '#720060',
          accent: '#B89000',
        },
      },
    ],
  },
};
