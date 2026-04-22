import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5080 ',
        changeOrigin: true,
      },
      '/about': {
        target: 'http://localhost:5080 ',
        changeOrigin: true,
      },
      '/highscores': {
        target: 'http://localhost:5080',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: "../backend/game",
    emptyOutDir: true,
  },
})
