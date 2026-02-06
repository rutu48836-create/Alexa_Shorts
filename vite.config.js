import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    force: true, // Force re-optimization
    exclude: [] // Clear any exclusions
  },
  server: {
    port: 5173,
    strictPort: false // Allow using alternative port
  }
})