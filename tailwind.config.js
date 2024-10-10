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
      // Add custom screen here
      screens: {
        // Existing breakpoints are preserved
        // Add the custom breakpoints
        'galaxy-fold': { 'raw': '(width: 768px) and (height: 946px)' },
        
        // Custom screen range from 300px to 600px
        'small-range': { 'min': '300px', 'max': '600px' },
        
        // Custom screen range from 700px to 1300px
        'medium-range': { 'min': '700px', 'max': '1300px' },

        
      },
    },
  },
  plugins: [],
};
