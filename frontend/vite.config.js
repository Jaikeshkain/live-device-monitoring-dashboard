import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // allow external access
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "a3283d6bb6b7.ngrok-free.app", // ✅ your frontend Ngrok domain
    ],
  },
});
