import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.inpeak.kr',  // 실제 API 서버의 URL
        changeOrigin: true,
        secure: false,  // HTTPS를 사용할 때 인증서 문제를 무시
        rewrite: (path) => path  // /api 그대로 전달
      }
    }
  }
})
