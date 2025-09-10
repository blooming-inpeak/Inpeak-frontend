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
        // 1️⃣ localStorage에 유저 정보가 있으면 먼저 세팅
        const localUser = localStorage.getItem('user');
        if (localUser) {
          setUser(JSON.parse(localUser) as UserInfo);
        }

        // 2️⃣ 서버에서 최신 유저 정보 가져오기
        const res = await GetMyPage();
        if (res) {
          setUser(res as UserInfo);
          localStorage.setItem('user', JSON.stringify(res));
        } else {
          clearUserData();
        }
      } catch (error) {
        console.error('❌ 사용자 정보 조회 실패:', error);
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
