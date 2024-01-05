/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit,minmax(15rem,1fr))",
      },
      fontFamily: {
        sans: ["Montserrat"],
        // Add other font families as needed
      },
    },
  },
  plugins: [],
};
