/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'black': '#000112',
        'darkBg': '#20212C',
        'darkGray': '#2B2C37',
        'darkLine': '#3E3F4E',
        'mediumGray': '#828FA3',
        'lightLines': '#E4EBFA',
        'lightGray': '#F4F7FD',
        'white': '#FFFFFF',
        'purple': '#635FC7',
        'lightPurple': '#A8A4FF',
        'red': '#EA5555',
        'lightRed': '#FF9898',
      },
    },
  },
  plugins: [],
};
