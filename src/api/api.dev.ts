import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log('✅ baseURL:', baseURL);

let accessToken = import.meta.env.VITE_ACCESS_TOKEN;
let refreshToken = import.meta.env.VITE_REFRESH_TOKEN;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  config => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const status = error.response?.status;
    const code = error.response?.data?.code;

    // 🔁 토큰 재발급 로직
    if (status === 400 && code === 'INPUT_VALUE_INVALID' && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${baseURL}/auth/reissue`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

        accessToken = newAccessToken;
        refreshToken = newRefreshToken;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
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
        alert('로그인이 필요합니다.');
        break;
      case 488:
        if (!window.location.search.includes('status=NEED_MORE_INFO')) {
          window.location.href = '/?status=NEED_MORE_INFO';
        }
        break;
      case 500:
        alert('서버 오류가 발생했습니다.');
        break;
      default:
        console.warn(`📦 처리되지 않은 상태 코드(${status})`, error.response.data);
        break;
    }

    return Promise.reject(error);
  },
);

export default api;
