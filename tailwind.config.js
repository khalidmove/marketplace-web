/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      colors: {
        'custom-lightGray': "#F3F3F3",
        'custom-purple': "#35035C",
        'custom-gray': "#ADADAD",
        'custom-darkGray': "#253D4E",
        'custom-red': "#D7186D",
        'custom-lightGrayColor': "#F7ECFA",
        'featuredProducts-borderColor': "#ADADAD40",
        'custom-darkGrayColor': "#838383",
        'custom-newPurple': "#5C1083",
        'custom-lightPurple': "#F7ECFA",
        'custom-darkPurple': "#D7B7E6",
        'custom-newPurpleColor': "#99267C",
        'custom-newLightGray': "#E2D6DA",
        'custom-newGray': "#87848A",
        'custom-offWhite': "#F3F3F3",
        'custom-black': "#1E0909",
        'custom-newGrayColor': "#858080",
        'custom-red': "#FC0965",
        'custom-newGrayColors': "#6B6B6B",
        'custom-grayColors': "#97999B",
      }
    },
  },
  plugins: [],
};
