/** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    minWidth: {
      600: '600px',
    },
    extend: {
      colors: {
        main: '#501EE0',
        g50: '#E9E9E9',
        g75: '#A4A4A4',
        g100: '#7E7E7E',
        g200: '#474747',
        g300: '#212121',
        g400: '#171717',
        g500: '#141414',
        v50: '#EEEAFA',
        v75: '#B7A3F2',
        v100: '#9A7DED',
        v200: '#6E44E5',
        v300: '#501EE0',
        v400: '#38159D',
        v500: '#311289',
        'light-gray': '#F5F5F5',
        b300: '#C8C8C8',
      },
      boxShadow: {
        square: '0 4px 12px rgba(0,0,0,0.1)',
        line: 'inset 0 0 0 2px #6E44E5, 0 4px 10px rgba(0,0,0,0.1)',
        poster: '0px 30px 50px 0px rgba(0, 0, 0, 0.50)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'bg-home': "url('/bg-home.png')",
      },
      backgroundPosition: {
        'bottom-4': 'center top',
      },
      blur: {
        xs: '2px',
      },
      borderWidth: {
        1: '1px',
      },
      backgroundImage: {
        'gradient-movie': 'linear-gradient(180deg, #6646C1 0%, #1F0A5D 100%)',
      },
    },
  },
  plugins: [],
};
