/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#A855F7',
          dark: '#8B5CF6',
          light: '#C084FC'
        },
        'secondary': {
          DEFAULT: '#EC4899',
          dark: '#DB2777',
          light: '#F472B6'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(139, 92, 246, 0.5)',
        'glow-lg': '0 0 25px rgba(139, 92, 246, 0.6)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

