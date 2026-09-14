/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F8FC",
        surface: "#FFFFFF",
        border: "#E5E7EB",
        primary: {
          DEFAULT: "#0F172A",
          hover: "#1E293B",
          light: "#334155",
        },
        accent: {
          DEFAULT: "#2563EB",
          light: "#EFF6FF",
        },
        text: {
          main: "#111827",
          secondary: "#667085",
        },
        semantic: {
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        card: "1rem", // 16px
        btn: "0.75rem", // 12px
      },
      boxShadow: {
        saas: "0 1px 3px 0 rgba(15, 23, 42, 0.03), 0 1px 2px -1px rgba(15, 23, 42, 0.03)",
        saasHover: "0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 4px 6px -2px rgba(15, 23, 42, 0.02)",
      },
    },
  },
  plugins: [],
};
