// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Vela Sans", "sans-serif"],
      },
      fontSize: {
        h1: "var(--font-size-h1)",
        h2: "var(--font-size-h2)",
        h3: "var(--font-size-h3)",
        h4: "var(--font-size-h4)",
        h5: "var(--font-size-h5)",
        h6: "var(--font-size-h6)",
        body: "var(--font-size-body)",
        small: "var(--font-size-small)",
        label: "var(--font-size-label)",
      },
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: "1.1",
        normal: "1.5",
      },
      letterSpacing: {
        tight: "-0.03em",
        normal: "0",
      },
    },
  },
  plugins: [],
};
