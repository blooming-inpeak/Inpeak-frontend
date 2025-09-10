import { JSX, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/auth/userState';
import { loginModalState } from '../store/loginModal/loginModalState';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useRecoilValue(userState);
  const setLoginModal = useSetRecoilState(loginModalState);

  useEffect(() => {
    if (!user) {
      setLoginModal(true);
    }
  }, [user, setLoginModal]);

  if (!user) return null;
  return children;
};

export default PrivateRoute;
