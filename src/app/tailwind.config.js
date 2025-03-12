module.exports = {
  darkMode: 'class', // or 'media' if you prefer
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // ✅ Scans all JSX/TSX files inside src
    "./public/index.html",         // ✅ Ensures Tailwind works in index.html
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};