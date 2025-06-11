import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true
    }
  },
  css: {
    devSourcemap: true
  },
  build: {
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['axios']
        }
      }
    }
  }
})
