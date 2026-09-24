import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        find: resolve(__dirname, 'find/index.html'),
        learn: resolve(__dirname, 'learn/index.html'),
      },
    },
  },
})
