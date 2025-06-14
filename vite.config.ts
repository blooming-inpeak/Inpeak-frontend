import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import removeConsole from 'vite-plugin-remove-console';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'production' ? [removeConsole({ external: ['error', 'warn'] })] : [])],
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
}));
