import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/auth/userState';
import { loginModalState } from '../store/loginModal/loginModalState';
import { authInitializedState } from '../store/auth/authInitializedState';
import { JSX } from 'react';
import { useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useRecoilValue(userState);
  const isAuthInitialized = useRecoilValue(authInitializedState);
  const setOpenLoginModal = useSetRecoilState(loginModalState);
  const location = useLocation();

  if (!isAuthInitialized) return null;

  if (!user) {
    // 로그인 필요 페이지에서만 이전 경로 저장
    setOpenLoginModal(true);
    // location.state.from에 현재 경로 저장
    history.replaceState({ from: location.pathname }, '');
    return null;
  }

  return children;
};

export default PrivateRoute;
