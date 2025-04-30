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
        rewrite: (path) => path.replace(/^\/api/, ""),
        headers: {
          // يمكن إضافة هيدرات إضافية هنا إذا لزم الأمر
          "X-Requested-With": "XMLHttpRequest",
          "Accept": "application/json",
        }
      },
    },
  },
});