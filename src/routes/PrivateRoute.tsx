import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/auth/userState';
import { loginModalState } from '../store/loginModal/loginModalState';
import { authInitializedState } from '../store/auth/authInitializedState';
import { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useRecoilValue(userState);
  const isAuthInitialized = useRecoilValue(authInitializedState);
  const setOpenLoginModal = useSetRecoilState(loginModalState);

  // 아직 로그인 체크 안 끝났으면 아무 것도 렌더하지 않음
  if (!isAuthInitialized) return null;

  if (!user) {
    setOpenLoginModal(true);
    return null;
  }

  return children;
};

export default PrivateRoute;
