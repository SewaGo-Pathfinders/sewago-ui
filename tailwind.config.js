import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#4B5992",
        accent: '#539DF3',
        'icon-color': '#484C52',
        'text-color': '#35383D',
      },
    },
  },
  plugins: [],
}

