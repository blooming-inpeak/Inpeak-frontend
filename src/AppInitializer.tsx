import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { GetMyPage } from './api/getMyPage/GetMyPage';
import { userState } from './store/auth/userState';

const AppInitializer = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const init = async () => {
      const cachedUser = localStorage.getItem('user');

      if (cachedUser) {
        // ✅ 캐시된 유저 정보를 먼저 사용
        setUser(JSON.parse(cachedUser));
      }

      try {
        // ✅ 서버에서 유효한 유저 정보 다시 요청 (토큰 만료 여부 판단 목적)
        const user = await GetMyPage();
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // ❌ 토큰 만료 등 실패 시 캐시/상태 초기화
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken'); // (필요 시만)
      }
    };

    init();
  }, [setUser]);

  return null;
};

export default AppInitializer;
