/** @type {import('tailwindcss').Config} */
export default {
  content: [
   "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'header-gradient-start': '#1f2937', 
        'header-gradient-end': '#4b5563',
        'header-border': '#374151',
        'text-primary': '#ffffff',
        'text-secondary': '#d1d5db',
        'status-info': '#3b82f6',
        'status-warning': '#f59e0b',
        'button-primary': '#22c55e',
        'button-secondary': '#1e293b',
        'button-hover': '#334155',
      },
      boxShadow: {
        'industrial': '0 4px 10px rgba(0,0,0,0.5)',
        'button': '0 2px 4px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
