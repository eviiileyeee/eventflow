import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx"], // Ensure .jsx files are resolved
  },
  server: {
    mimeTypes: {
      "woff": "font/woff",
      "woff2": "font/woff2",
    }
  }
});
