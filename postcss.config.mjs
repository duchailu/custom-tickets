// Tailwind CSS 4 passe par ce plugin PostCSS (il remplace tailwindcss + autoprefixer).
// La configuration du thème est maintenant dans styles/globals.css.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
