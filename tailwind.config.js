/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      zIndex: {
        modalBackdrop: 1000,
        modal: 1010,
      },
    },
  },
  plugins: [],
};
