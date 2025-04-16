import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  envPrefix: "VITE_",
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: "0.0.0.0", // Binds to all network interfaces
    port: 5173, // Optional: Customize port
    strictPort: true, // Fails if the port is unavailable
  },
});
