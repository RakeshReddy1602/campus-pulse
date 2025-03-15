/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.vue",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./node_modules/shadcn-vue/dist/*.{vue,js,ts}", // Add this
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
