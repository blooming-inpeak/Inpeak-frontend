import { useNavigate } from 'react-router-dom';
import { Divide, OpenLoginModalBottom, OpenLoginModalMenu, OpenLoginModalWrapper } from './OpenLoginModalStyle';

export const OpenLoginModal = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  console.log(pathname);
  return (
    <OpenLoginModalWrapper>
      <OpenLoginModalBottom>
        <OpenLoginModalMenu
          onClick={() => navigate('/mypage')}
          style={{ color: pathname === '/mypage' ? '#0050d8' : '' }}
        >
          마이페이지
        </OpenLoginModalMenu>
        <OpenLoginModalMenu
          onClick={() => navigate('/contact')}
          style={{ color: pathname === '/contact' ? '#0050d8' : '' }}
        >
          문의하기
        </OpenLoginModalMenu>
        <Divide />
        <OpenLoginModalMenu style={{ height: '100%' }}>로그아웃</OpenLoginModalMenu>
      </OpenLoginModalBottom>
    </OpenLoginModalWrapper>
  );
};
