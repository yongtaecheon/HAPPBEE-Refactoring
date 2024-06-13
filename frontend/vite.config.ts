import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://happbee-backend-fastapi.vercel.app",
        changeOrigin: true,
      },
      "/user": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
});
