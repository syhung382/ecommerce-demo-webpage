import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    port: 5173,
    host: "localhost",
    strictPort: true,
    open: true,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:5000",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
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
