/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    hmr: {
      overlay: false
    }
  },
  plugins: [vue()], 
})