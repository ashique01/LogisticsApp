import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // increase warning limit to 1000 KB (1MB)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Put all node_modules into a single vendor chunk
            return 'vendor';
          }
          // You can add more manual chunking here if needed, e.g.:
          // if (id.includes('src/components/HeavyComponent')) {
          //   return 'heavy-component';
          // }
        },
      },
    },
  },
})
