import { useNavigate } from 'react-router-dom';
import { Divide, OpenLoginModalBottom, OpenLoginModalMenu, OpenLoginModalWrapper } from './OpenLoginModalStyle';
import useLogout from '../../hooks/logout/useLogout';

interface Props {
  onClose: () => void;
}

export const OpenLoginModal = ({ onClose }: Props) => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const logout = useLogout();

  const onClickMyPage = () => {
    onClose();
    navigate('/mypage');
  };

  const onClickContact = () => {
    onClose();
    navigate('/contact');
  };
  return (
    <OpenLoginModalWrapper>
      <OpenLoginModalBottom>
        <OpenLoginModalMenu onClick={onClickMyPage} style={{ color: pathname === '/mypage' ? '#0050d8' : '' }}>
          마이페이지
        </OpenLoginModalMenu>
        <OpenLoginModalMenu onClick={onClickContact} style={{ color: pathname === '/contact' ? '#0050d8' : '' }}>
          문의하기
        </OpenLoginModalMenu>
        <Divide />
        <OpenLoginModalMenu
          onClick={logout} // ✅ 로그아웃 실행
        >
          로그아웃
        </OpenLoginModalMenu>
      </OpenLoginModalBottom>
    </OpenLoginModalWrapper>
  );
};
