import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
