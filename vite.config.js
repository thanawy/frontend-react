import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://backend.thanawy.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "https://backend.thanawy.com"),
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Accept": "application/json",
          
        }
      },
    },
  },
});