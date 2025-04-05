import { useSetRecoilState } from 'recoil';
import { userState } from '../../store/auth/userState';
import { logoutAPI } from '../../api/logout/logoutAPI';

const useLogout = () => {
  const setUser = useSetRecoilState(userState);

  const logout = async () => {
    try {
      await logoutAPI();
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return logout;
};

export default useLogout;
