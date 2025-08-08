import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GetMyPage } from './api/getMyPage/GetMyPage';
import { refreshAccessToken } from './api/refreshToken';
import { userState } from './store/auth/userState';
import { authInitializedState } from './store/auth/authInitializedState';

// 공개 라우트: 여기서는 /member/my 호출 안 함(401 방지)
const PUBLIC_ROUTES = ['/'];

const AppInitializer = () => {
  const setUser = useSetRecoilState(userState);
  const setAuthInitialized = useSetRecoilState(authInitializedState);
  const { pathname } = useLocation();

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      // 0) 캐시 선적용 (초기 깜빡임 최소화)
      const cached = sessionStorage.getItem('user') || localStorage.getItem('user');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (!cancelled) setUser(parsed);
        } catch (e) {
          if (import.meta.env.DEV) {
            console.warn('⚠️ user 캐시 파싱 실패, 캐시 초기화:', e);
          }
          sessionStorage.removeItem('user');
          localStorage.removeItem('user');
        }
      }

      try {
        // 1) 앱 시작 시 조용하게 재발급 1회 시도
        await refreshAccessToken(true);

        // 2) 공개 라우트면 여기서 종료 → /member/my 호출 안 함
        if (PUBLIC_ROUTES.includes(pathname)) return;

        // 3) 보호 라우트에서만 서버 상태와 동기화
        const me = await GetMyPage();
        if (cancelled) return;

        setUser(me);
        sessionStorage.setItem('user', JSON.stringify(me));
        localStorage.setItem('user', JSON.stringify(me));
      } catch {
        // 인증 실패 → 비로그인 상태로 정리
        if (cancelled) return;

        setUser(null);
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
      } finally {
        if (!cancelled) setAuthInitialized(true);
      }
    };

    void init();
    return () => {
      cancelled = true;
    };
  }, [pathname, setAuthInitialized, setUser]);

  return null;
};

export default AppInitializer;
