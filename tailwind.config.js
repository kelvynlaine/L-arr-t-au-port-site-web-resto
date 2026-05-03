/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marine: "#1a3a5c",
        sable: "#f5f0e8",
        terracotta: "#e07a5f",
        "vert-eau": "#4a908a",
        bois: "#8b6f47",
        dore: "#c9a96e",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        larretauport: {
          "primary": "#1a3a5c",
          "secondary": "#e07a5f",
          "accent": "#c9a96e",
          "neutral": "#8b6f47",
          "base-100": "#f5f0e8",
          "info": "#4a908a",
          "success": "#4a908a",
          "warning": "#e07a5f",
          "error": "#e07a5f",
        },
      },
    ],
  },
}
