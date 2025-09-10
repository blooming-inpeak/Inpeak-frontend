import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/auth/userState';
import { loginModalState } from '../store/loginModal/loginModalState';
import { redirectAfterLoginState } from '../store/auth/redirectAfterLoginState';
import { useLocation } from 'react-router-dom';
import { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useRecoilValue(userState);
  const setOpenLoginModal = useSetRecoilState(loginModalState);
  const setRedirectAfterLogin = useSetRecoilState(redirectAfterLoginState);
  const location = useLocation();

  if (!user) {
    setRedirectAfterLogin(location.pathname);
    setOpenLoginModal(true);
    return null;
  }

  return children;
};

export default PrivateRoute;
