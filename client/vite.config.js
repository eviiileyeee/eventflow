import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";  // Add this import

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx"], // Ensure .jsx files are resolved
    alias: {
      '@': path.resolve(__dirname, './src'),  // Add this alias configuration
    },
  },
  server: {
    mimeTypes: {
      "woff": "font/woff",
      "woff2": "font/woff2",
    }
  }
});