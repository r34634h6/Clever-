/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'synth-dark': '#0a0e27',
        'synth-darker': '#050610',
        'synth-accent': '#ff006e',
        'synth-blue': '#00d9ff',
      },
    },
  },
  plugins: [],
}
