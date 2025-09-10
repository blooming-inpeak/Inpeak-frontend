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
      // 서버 검증 전에는 userState를 초기화
      setUser(null);

      try {
        const res = await GetMyPage();

        if (!res.ok || !res.data?.user) {
          // 로그인 안 됐거나 세션 만료
          console.info('사용자 정보 없음 또는 세션 만료 상태, 로컬 캐시 초기화');
          clearUserData();
        } else {
          // 정상 로그인
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
