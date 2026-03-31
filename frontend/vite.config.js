import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // Removed rewrite: (path) => path.replace(/^\/api/, '')
        // So /api/listings goes to http://localhost:8080/api/listings
      }
    }
  }
})
