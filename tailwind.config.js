/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#1B262C",
        semiBlue: "#0F4C75",
        lightBlue: "#3282B8",
        Blue: "#BBE1FA",
        blueWhite: "#a7c3d5",
      },
    },
    screens: {
      sm: "10px",
      // => @media (min-width: 640px) { ... }

      md: "641px",
      // => @media (min-width: 768px) { ... }

      lg: "1008px",
      // => @media (min-width: 1024px) { ... }

      // xl: "1280px",
      // // => @media (min-width: 1280px) { ... }

      // "2xl": "1536px",
      // // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
