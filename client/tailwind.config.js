/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        primary: "#0F172A",
        accent: "#22D3EE",
        secondary: "#7C3AED",
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom right, #0F172A, #1E293B, #0F172A)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
