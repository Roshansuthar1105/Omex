import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  resolve: {
    alias: {
      path: "path-browserify",
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
})
