import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Dark mode should be set here, not inside `extend`
  theme: {
    extend: {
      colors: {
        "custom-orange": "rgb(255, 108, 44)",
      },
    },
  },
  plugins: [],
};

export default config;
