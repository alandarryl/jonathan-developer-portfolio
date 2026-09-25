/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B1120",
          50: "#F4F6FB",
          100: "#E7EAF0",
          200: "#C7CEDD",
          300: "#8891A7",
          400: "#5B6478",
          500: "#3A4257",
          600: "#242C40",
          700: "#182036",
          800: "#131B2E",
          900: "#0B1120",
          950: "#070B15",
        },
        mint: {
          DEFAULT: "#5EEAD4",
          50: "#EFFDFA",
          100: "#CCFBF1",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
        },
        amber: {
          DEFAULT: "#F5A623",
          400: "#F5A623",
          500: "#DC8F13",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(231,234,240,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(231,234,240,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
