/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode via a class name on html/body
  theme: {
    extend: {
      colors: {
        // Adding custom colors tailored for a premium look, avoiding generic red/blue
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9', // Sky blue for primary action
          600: '#0284c7',
        },
        dark: {
          bg: '#0f172a',    // Deep slate for dark mode background
          card: '#1e293b',  // Slightly lighter slate for cards
          text: '#e2e8f0',  // Muted light text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
