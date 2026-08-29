/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta principal do sistema WMS Gollinho - branco/azul corporativo
        wms: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2563eb', // azul primário (ações, links, destaque)
          600: '#1d4ed8',
          700: '#1e40af', // azul institucional (sidebar, header)
          800: '#1e3a8a',
          900: '#172554',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(23, 37, 84, 0.06), 0 1px 3px 0 rgba(23, 37, 84, 0.08)',
      },
    },
  },
  plugins: [],
};
