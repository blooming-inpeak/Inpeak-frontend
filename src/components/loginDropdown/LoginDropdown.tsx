import { useState } from 'react';
import styled from 'styled-components';
import { OpenLoginModal } from './OpenLoginModal';

export const LoginDropdown = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <LoginDropdownWrapper>
      <LoginDropdownProfile>
        <img src="/images/profile.png" alt="profile" style={{ width: '30px', height: '30px' }} />
        <LoginDropdownName>김인픽</LoginDropdownName>
      </LoginDropdownProfile>
      <LoginDropdownButton
        src="/images/chevron/Chevron_bottom.svg"
        alt="chevron bottom"
        onClick={() => setOpenModal(true)}
      />
      {openModal && <OpenLoginModal onCloseModal={() => setOpenModal(false)} />}
    </LoginDropdownWrapper>
  );
};

export const LoginDropdownWrapper = styled.div`
  width: 150px;
  height: 30px;

  display: flex;
  justify-content: space-between;

  gap: 30px;
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

export const LoginDropdownButton = styled.img`
  width: 16px;
  cursor: pointer;
`;
