import { useSetRecoilState } from 'recoil';
import { GetMyPage } from './api/getMyPage/GetMyPage';
import { userState } from './store/auth/userState';
import { useEffect } from 'react';

const AppInitializer = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await GetMyPage();
        setUser(data);
      } catch {
        console.error('유저 정보 불러오기 실패');
      }
    };
    init();
  }, []);

  return null;
};

export default AppInitializer;
