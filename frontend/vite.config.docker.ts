import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/max_wave": {
        target: "http://backend:5000", // Backend host and port
        changeOrigin: true,
      },
    },
  },
});
