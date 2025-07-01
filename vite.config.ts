import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    port: 5000,
    host: "localhost",
    strictPort: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://ecommerce-be-api.runasp.net",
        changeOrigin: true,
      },
    },
  },
  // build: {
  //   outDir: "dist",
  //   sourcemap: true,
  //   rollupOptions: {
  //     input: {
  //       main: "src/main.tsx",
  //       // admin: "src/admin.tsx",
  //     },
  //   },
  // },
});
