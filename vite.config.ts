import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.inpeak.kr/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path,
      },
    },
  },
  build: {
    target: 'esnext',
  },
});
