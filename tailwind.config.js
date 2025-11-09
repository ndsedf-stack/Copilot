/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0F1115",
        card: "#151821",
        text: "#E6E8EB",
        muted: "#8A8F98",
        primary: "#FF3B30",
        success: "#34C759",
        info: "#0A84FF",
        accent: "#FFD60A"
      },
      borderRadius: { xl: "12px" }
    }
  },
  plugins: []
};
