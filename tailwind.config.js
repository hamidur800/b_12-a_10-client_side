/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark"], // light এবং dark দুইটা থিম সক্রিয়
  },
  plugins: [require("daisyui")],
};
