import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    proxy: {
      "/plant": {
        target: "http://localhost:8000/",
        changeOrigin: true,
        secure: false,
      },

      "/get/emails": {
        target: "http://localhost:8000/",
        changeOrigin: true,
        secure: false,
      },

      "/ws": {
        target: "ws://localhost:8000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },

      "/post/emails": {
        target: "http://localhost:8000/",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: "../",
  },
});
