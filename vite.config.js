import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   // host: "localhost",
  //   // port: 3000,
  //   // origin: "http://127.0.0.1:8080",
  //   // proxy: {
  //   //   "/foo": "http://localhost:3000",
  //   // },
  // },
});
