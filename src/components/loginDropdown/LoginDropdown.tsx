import { useState } from 'react';
import styled from 'styled-components';
import { OpenLoginModal } from './OpenLoginModal';

export const LoginDropdown = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <LoginDropdownWrapper $isOpen={openModal}>
      <LoginDropdownTop>
        <LoginDropdownProfile>
          <img src="/images/profile.png" alt="profile" style={{ width: '30px', height: '30px' }} />
          <LoginDropdownName>김인픽</LoginDropdownName>
        </LoginDropdownProfile>

        <LoginDropdownButton
          src={`/images/chevron/Chevron_bottom.svg`}
          alt="chevron bottom"
          onClick={() => setOpenModal(!openModal)}
          $openModal={openModal}
        />
      </LoginDropdownTop>

      {openModal && <OpenLoginModal />}
    </LoginDropdownWrapper>
  );
};

export const LoginDropdownWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  background-color: ${({ $isOpen }) => ($isOpen ? '#ffffff' : '')};
`;

export const LoginDropdownTop = styled.div`
  width: 150px;
  height: 30px;
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;
`;

export const LoginDropdownProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LoginDropdownName = styled.div`
  color: #212121;

  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;
`;

export const LoginDropdownButton = styled.img<{ $openModal: boolean }>`
  width: 16px;
  cursor: pointer;
  transform: ${({ $openModal }) => ($openModal ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.3s ease;
`;
