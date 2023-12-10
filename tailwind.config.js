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
        splash: '#501EE0',
        g50: '#E9E9E9',
        g75: '#A4A4A4',
        g100: '#7E7E7E',
        g200: '#474747',
        g300: '#212121',
        g400: '#171717',
        g500: '#141414',
        btn: '#501EE0',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
