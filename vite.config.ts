import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    host: true, // Allows local network access
    port: 8080,
  },
  plugins: [react()],
  base: "/Portfolio/", // Ensure this matches your repo name
  resolve: {
    alias: {
      "@": "/src", 
    },
  },
});
