/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1967d2",
          hover: "#0146a6",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f9ab00",
          hover: "#e9a000",
          foreground: "#202124",
        },
        background: "#f5f7fc",
        foreground: "#202124",
        muted: {
          DEFAULT: "#f0f5f7",
          foreground: "#696969",
        },
        border: "#ecedf2",
        input: "#ecedf2",
        ring: "#1967d2",
        destructive: {
          DEFAULT: "#d93025",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#34a853",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#202124",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#202124",
        },
        accent: {
          DEFAULT: "#f0f5f7",
          foreground: "#202124",
        },
      },
      fontFamily: {
        sans: ["Jost", "sans-serif"],
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    preflight: false, // Disable Tailwind's CSS reset to prevent Bootstrap conflicts
  },
}
