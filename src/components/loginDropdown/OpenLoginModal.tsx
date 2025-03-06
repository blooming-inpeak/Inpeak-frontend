import { Divide, OpenLoginModalBottom, OpenLoginModalMenu, OpenLoginModalWrapper } from './OpenLoginModalStyle';

export const OpenLoginModal = () => {
  return (
    <OpenLoginModalWrapper>
      <OpenLoginModalBottom>
        <OpenLoginModalMenu>마이페이지</OpenLoginModalMenu>
        <OpenLoginModalMenu>문의하기</OpenLoginModalMenu>
        <Divide />
        <OpenLoginModalMenu style={{ height: '100%' }}>로그아웃</OpenLoginModalMenu>
      </OpenLoginModalBottom>
    </OpenLoginModalWrapper>
  );
};
