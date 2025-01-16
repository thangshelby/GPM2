/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#363a46',
        'secondary':'#a3a8b9',
        'bg_secondary':'#4c5261',
        'bg_tertiary':'#262931',
        'active':'#62697d',
        'text_primary':'#57aefb',
        'text_sub':'#616a7a',
        'red':'#fb5057',
        'green':'#00a449',
        'white':'#e8e9eb',
        'button':'#353945'
      }
    },
  },
  plugins: [],
}