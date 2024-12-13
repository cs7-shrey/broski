import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['electron'],
      input: {
        app: 'floating.html'
      }
    },
  },
  plugins: [react()],
  server: {
    port: 3001,
    open: '/floating.html'
  },
  base: './',
});