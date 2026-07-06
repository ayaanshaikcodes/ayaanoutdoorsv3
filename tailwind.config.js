/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'], // editorial display headlines
        display: ['Plus Jakarta Sans', 'sans-serif'], // wordmark + UI
        sans: ['Inter', 'system-ui', 'sans-serif'], // body
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'], // field-log lines
      },
      colors: {
        // editorial base
        paper: '#FAF9F5',
        ink: '#191C1A',
        night: '#131512',
        card: '#1C1F1B',
        stone: '#79746C',
        // brand accents (kept from the original site)
        forest: '#2f5d3a',
        sage: '#7a9b76',
        terra: '#c2693f',
        sand: '#e9e0cf',
      },
      maxWidth: {
        article: '44rem',
      },
    },
  },
  plugins: [],
}
