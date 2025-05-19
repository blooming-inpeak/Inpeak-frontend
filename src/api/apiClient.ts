// 테스트용으로 작성된 axios API 클라이언트 코드 1
// import axios from 'axios';

// const baseURL = import.meta.env.VITE_API_BASE_URL;
// console.log('✅ baseURL:', baseURL);

// let accessToken = import.meta.env.VITE_ACCESS_TOKEN;
// let refreshToken = import.meta.env.VITE_REFRESH_TOKEN;

// const api = axios.create({
//   baseURL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   config => {
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error),
// );

// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     const status = error.response?.status;
//     const code = error.response?.data?.code;

//     // 🔁 토큰 재발급 로직
//     if (status === 400 && code === 'INPUT_VALUE_INVALID' && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.post(
//           `${baseURL}/auth/reissue`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${refreshToken}`,
//               'Content-Type': 'application/json',
//             },
//             withCredentials: true,
//           },
//         );

//         const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

//         accessToken = newAccessToken;
//         refreshToken = newRefreshToken;

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (reissueError) {
//         console.error('🔒 토큰 재발급 실패:', reissueError);
//         return Promise.reject(reissueError);
//       }
//     }

//     // 상태 코드별 처리
//     switch (status) {
//       case 400:
//         alert(error.response.data?.message || '잘못된 요청입니다.');
//         break;
//       case 401:
//         alert('로그인이 필요합니다.');
//         break;
//       case 488:
//         if (!window.location.search.includes('status=NEED_MORE_INFO')) {
//           window.location.href = '/?status=NEED_MORE_INFO';
//         }
//         break;
//       case 500:
//         alert('서버 오류가 발생했습니다.');
//         break;
//       default:
//         console.warn(`📦 처리되지 않은 상태 코드(${status})`, error.response.data);
//         break;
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;

// 테스트용으로 작성된 axios API 클라이언트 코드 2
// import axios from 'axios';

// const baseURL = import.meta.env.VITE_API_BASE_URL;
// console.log('✅ baseURL:', baseURL);

// let accessToken = import.meta.env.VITE_ACCESS_TOKEN;
// let refreshToken = import.meta.env.VITE_REFRESH_TOKEN;

// // 외부에서 토큰을 동적으로 설정할 수 있도록 export
// export const setTokens = (newAccessToken: string, newRefreshToken: string) => {
//   accessToken = newAccessToken;
//   refreshToken = newRefreshToken;
// };

// const api = axios.create({
//   baseURL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   config => {
//     // 필요시 Authorization 헤더 동적 주입 가능
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error),
// );

// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     // 네트워크 오류 (서버 다운 등) 대응
//     if (!error.response) {
//       console.error('❌ 네트워크 오류가 발생했습니다.');
//       return Promise.reject(error);
//     }

//     const status = error.response.status;
//     const code = error.response.data?.code;

//     // 토큰 재발급 처리
//     if (status === 400 && code === 'INPUT_VALUE_INVALID' && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // ✅ 서버가 쿠키에 토큰을 자동으로 넣는 경우, 별도 저장 불필요
//         return api(originalRequest); // 재요청
//       } catch (reissueError) {
//         console.error('🔒 토큰 재발급 실패 - 로그인으로 이동합니다.');
//         window.location.href = '/login';
//         return Promise.reject(reissueError);
//       }
//     }

//     // 에러 상태별 콘솔 로그 처리
//     switch (status) {
//       case 400:
//         console.warn('⚠️ 잘못된 요청:', error.response.data?.message || 'Bad Request');
//         break;
//       case 401:
//         console.warn('🔐 인증 필요: 로그인 상태가 아닙니다.');
//         break;
//       case 500:
//         console.error('🔥 서버 오류 발생');
//         break;
//       case 488:
//         if (!window.location.search.includes('status=NEED_MORE_INFO')) {
//           window.location.href = '/?status=NEED_MORE_INFO';
//         }
//         break;
//       default:
//         console.warn(`📦 처리되지 않은 상태 코드(${status})`, error.response.data);
//         break;
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;

// 배포용 axios API 클라이언트 코드
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log('✅ baseURL:', baseURL);

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
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
