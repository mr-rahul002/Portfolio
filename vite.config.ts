import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true, // Allows local network access
    port: 8080,
  },
  plugins: [react()],
  base: "/Portfolio/", // Ensure it matches your repo name
  resolve: {
    alias: {
      "@": "/src", // Vite supports direct paths without 'path' module
    },
  },
}));
