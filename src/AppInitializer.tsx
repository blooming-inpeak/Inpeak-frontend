import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState, UserInfo } from './store/auth/userState';
import { authInitializedState } from './store/auth/authInitializedState';
import { GetMyPage } from './api/getMyPage/GetMyPage';

const AppInitializer = () => {
  const setUser = useSetRecoilState(userState);
  const setAuthInitialized = useSetRecoilState(authInitializedState);

  useEffect(() => {
    const init = async () => {
      const clearUserData = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      };

      try {
        const localUser = localStorage.getItem('user');
        if (localUser) setUser(JSON.parse(localUser) as UserInfo);

        const res = await GetMyPage();

        if (res && res.ok === false && res.statusCode === 'UNAUTHORIZED') {
          clearUserData();
        } else if (res) {
          setUser(res as UserInfo);
          localStorage.setItem('user', JSON.stringify(res));
        } else {
          clearUserData();
        }
      } catch (error) {
        console.error('사용자 정보 조회 실패', error);
        clearUserData();
      } finally {
        setAuthInitialized(true);
      }
    };

    init();
  }, [setUser, setAuthInitialized]);

  return null;
};

export default AppInitializer;
