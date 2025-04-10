import type { Config } from "tailwindcss";
import baseConfig from "@repo/ui/tailwind.config";

export default {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    "./app/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
} satisfies Config;
