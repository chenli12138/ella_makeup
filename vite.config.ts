import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  // Include JPG files as assets
  assetsInclude: ["**/*.jpg", "**/*.JPG"],
});
