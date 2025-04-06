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
        setUser(JSON.parse(cachedUser));
      }

      try {
        const user = await GetMyPage();
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      }
    };

    init();
  }, []);

  return null;
};

export default AppInitializer;
