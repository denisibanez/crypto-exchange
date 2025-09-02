/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mantendo a identidade visual do projeto original
        'bg-primary': '#0b1020',
        'bg-secondary': '#11182e',
        'bg-tertiary': '#0f1530',
        'bg-input': '#0c1227',
        'bg-button': '#0e162d',
        'bg-button-primary': '#1b294e',
        'text-primary': '#e5e7eb',
        'text-muted': '#9ca3af',
        'accent': '#60a5fa',
        'danger': '#ef4444',
        'success': '#10b981',
        'warning': '#f59e0b',
        'border': '#1f2937',
        // Toast colors with better contrast
        'toast-success': '#065f46',
        'toast-error': '#7f1d1d',
        'toast-warning': '#78350f',
        'toast-info': '#1e3a8a',
      },
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        'lg': '10px',
      },
      boxShadow: {
        'card': '0 6px 20px rgba(0,0,0,0.25)',
      },
      backgroundImage: {
        'gradient-bg': 'linear-gradient(180deg, #0b1020, #050810)',
        'card-gradient': 'radial-gradient(1200px 400px at 10% -20%, rgba(96,165,250,0.06), transparent 40%), linear-gradient(180deg, #11182e, #0f1530)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
