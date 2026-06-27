import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
    },
  },
  plugins: [],
};

export default config;
