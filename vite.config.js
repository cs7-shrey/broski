import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['electron'],
      input: {
        main: 'MainPage/main.jsx',
      }
    },
  },
  plugins: [react()],
  server: {
    open: 'floating.html',
    port: 3000,
  },
  base: './',
});