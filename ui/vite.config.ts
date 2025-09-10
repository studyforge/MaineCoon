import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'process'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: Number(process.env.VITE_PORT),
    proxy: {
        '/user': 'http://localhost:3333',
    }
  }
})
