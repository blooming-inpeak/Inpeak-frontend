import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/auth/userState';
import { loginModalState } from '../store/loginModal/loginModalState';
import { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useRecoilValue(userState);
  const setOpenLoginModal = useSetRecoilState(loginModalState);

  if (!user) {
    setOpenLoginModal(true); // ✅ 로그인 안 돼있으면 모달 열기
    return null;
  }

  return children;
};

export default PrivateRoute;
