import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['electron'],
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
  },
  base: './',
});