import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    host: true,
    port: 8080,
  },
  plugins: [react()],
  base: "/Portfolio/",
  resolve: {
    alias: {
      "@": "/src", 
    },
  },
});
