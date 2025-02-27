// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "sf-pro-text": ["var(--font-sf-pro-text)"],
      },
      fontSize: {
        "search-box": [
          "16px",
          {
            lineHeight: "16px",
            letterSpacing: "0%",
            fontWeight: "400",
          },
        ],
        "error-modal-title": [
          "20px",
          {
            lineHeight: "23.87px",
            letterSpacing: "0%",
            fontWeight: "700",
          },
        ],
        "card-header": [
          "15px",
          {
            lineHeight: "20px",
            letterSpacing: "0%",
            fontWeight: "700",
          },
        ],
        "card-link": [
          "13px",
          {
            lineHeight: "13px",
            letterSpacing: "0%",
            fontWeight: "400",
          },
        ],
        button: [
          "14px",
          {
            lineHeight: "14px",
            letterSpacing: "0%",
            fontWeight: "700",
            textAlign: "center",
          },
        ],
      },
    },
  },
  plugins: [],
};

export default config;
