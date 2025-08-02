import axios from 'axios';
import { showToast } from '../components/error/ToastManager';

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
        showToast(error.response.data?.message || '잘못된 요청입니다.');
        break;
      case 401:
        showToast('로그인이 필요합니다.');
        break;
      case 403:
        showToast('접근 권한이 없습니다.');
        break;
      case 404:
        showToast('요청하신 정보를 찾을 수 없습니다.');
        break;
      case 409:
        showToast(error.response.data?.message || '요청이 충돌되었습니다.');
        break;
      case 422:
        showToast(error.response.data?.message || '요청을 처리할 수 없습니다.');
        break;
      case 429:
        showToast('요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.');
        break;
      case 500:
        showToast('서버 오류가 발생했습니다.');
        break;
      case 503:
        showToast('일시적으로 서비스가 불안정합니다.');
        break;
      case 488:
        if (!window.location.search.includes('status=NEED_MORE_INFO')) {
          window.location.href = '/?status=NEED_MORE_INFO';
        }
        break;
      default:
        showToast('네트워크 오류', '인터넷 연결을 확인해주세요.');
    }

    return Promise.reject(error);
  },
);

export default api;
