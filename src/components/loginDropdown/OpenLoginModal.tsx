import {
  Divide,
  OpenLoginModalBottom,
  OpenLoginModalButton,
  OpenLoginModalMenu,
  OpenLoginModalName,
  OpenLoginModalProfile,
  OpenLoginModalTop,
  OpenLoginModalWrapper,
} from './OpenLoginModalStyle';

export const OpenLoginModal = ({ onCloseModal }: { onCloseModal: () => void }) => {
  return (
    <OpenLoginModalWrapper>
      <OpenLoginModalTop>
        <OpenLoginModalProfile>
          <img src="/images/profile.png" alt="profile" style={{ width: '30px', height: '30px' }} />
          <OpenLoginModalName>김인픽</OpenLoginModalName>
        </OpenLoginModalProfile>
        <OpenLoginModalButton src="/images/chevron/Chevron_top.svg" alt="chevron top" onClick={onCloseModal} />
      </OpenLoginModalTop>

      <OpenLoginModalBottom>
        <OpenLoginModalMenu>마이페이지</OpenLoginModalMenu>
        <Divide />
        <OpenLoginModalMenu>로그아웃</OpenLoginModalMenu>
      </OpenLoginModalBottom>
    </OpenLoginModalWrapper>
  );
};
