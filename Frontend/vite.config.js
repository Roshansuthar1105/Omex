import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 3000,
    host: true,
    strictPort: false,
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
