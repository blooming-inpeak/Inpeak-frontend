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
      try {
        // 1. 로컬스토리지에 유저 정보가 있으면 먼저 세팅
        const localUser = localStorage.getItem('user');
        if (localUser) setUser(JSON.parse(localUser));

        // 2. 서버에서 최신 유저 정보 받아오기
        const res = await GetMyPage();

        if (res.ok && res.data?.user) {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        } else {
          console.info('사용자 정보 없음 또는 세션 만료 상태, 로컬 캐시 초기화');
          clearUserData();
        }
      } catch (error: unknown) {
        console.error('사용자 정보 조회 실패:', error);
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
