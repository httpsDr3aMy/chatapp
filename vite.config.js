import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// vite.config.js

export default {
  // ...
  build: {
    rollupOptions: {
      external: ['@fortawesome/fontawesome-svg-core'],
    },
  },
};