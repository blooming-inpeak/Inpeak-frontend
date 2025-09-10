import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { GetMyPage } from './api/getMyPage/GetMyPage';
import { userState } from './store/auth/userState';
import { authInitializedState } from './store/auth/authInitializedState';

const AppInitializer = () => {
  const setUser = useSetRecoilState(userState);
  const setAuthInitialized = useSetRecoilState(authInitializedState);

  useEffect(() => {
    const init = async () => {
      // 1. 로컬 캐시 확인
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        try {
          setUser(JSON.parse(cachedUser));
        } catch (e) {
          console.warn('로컬에 저장된 사용자 정보 파싱 실패:', e);
          clearUserData();
        }
      }

      // 2. 서버 검증
      try {
        const res = await GetMyPage();

        if (!res.ok || !res.data?.user) {
          console.info('사용자 정보 없음 또는 세션 만료 상태');
          clearUserData();
        } else {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('사용자 정보 조회 실패:', error.message);
        } else {
          console.error('알 수 없는 오류 발생:', error);
        }
        clearUserData();
      } finally {
        setAuthInitialized(true);
      }
    };

    const clearUserData = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    };

    init();
  }, [setUser, setAuthInitialized]);

  return null;
};

export default AppInitializer;
