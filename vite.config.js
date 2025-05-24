import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    cors: {
      origin: [
        "http://localhost:5000",
        "https://job-tracker-backend-4c2c.onrender.com",
      ],
      credentials: true,
    },
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});
