import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
let accessToken = import.meta.env.VITE_ACCESS_TOKEN;
let refreshToken = import.meta.env.VITE_REFRESH_TOKEN;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  if (import.meta.env.DEV && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const code = error.response?.data?.code;

    if (status === 400 && code === 'INPUT_VALUE_INVALID' && !originalRequest._retry) {
      originalRequest._retry = true;

      if (import.meta.env.DEV) {
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
        } catch (e) {
          console.error('🔒 토큰 재발급 실패:', e);
          return Promise.reject(e);
        }
      } else {
        return api(originalRequest); // prod에서는 재요청만
      }
    }

    // 공통 에러 핸들링
    switch (status) {
      case 400:
        console.warn('⚠️ 잘못된 요청:', error.response.data?.message || 'Bad Request');
        break;
      case 401:
        alert('로그인이 필요합니다.');
        break;
      case 500:
        alert('서버 오류가 발생했습니다.');
        break;
      case 488:
        if (!window.location.search.includes('status=NEED_MORE_INFO')) {
          window.location.href = '/?status=NEED_MORE_INFO';
        }
        break;
    }

    return Promise.reject(error);
  },
);

export default api;
