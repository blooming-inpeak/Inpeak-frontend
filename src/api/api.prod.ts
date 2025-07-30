import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 네트워크 오류 처리
    if (!error.response) {
      console.error('❌ 네트워크 오류 또는 서버 응답 없음:', error);
      return Promise.reject(error);
    }

    const status = error.response.status;
    const code = error.response.data?.code;

    // 토큰 재발급 처리
    if (status === 400 && code === 'INPUT_VALUE_INVALID' && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        return api(originalRequest);
      } catch (reissueError) {
        console.error('🔒 토큰 재발급 실패:', reissueError);
        return Promise.reject(reissueError);
      }
    }

    // 상태 코드별 처리
    switch (status) {
      case 400:
        console.warn('⚠️ 잘못된 요청:', error.response.data?.message || 'Bad Request');
        break;
      case 401:
        console.warn('🔐 인증 필요: 로그인 상태가 아닙니다.');
        break;
      case 500:
        console.error('🔥 서버 오류 발생');
        break;
      case 488:
        if (!window.location.search.includes('status=NEED_MORE_INFO')) {
          window.location.href = '/?status=NEED_MORE_INFO';
        }
        break;
        break;
      default:
        console.warn(`📦 처리되지 않은 상태 코드(${status})`, error.response.data);
        break;
    }

    return Promise.reject(error);
  },
);

export default api;
