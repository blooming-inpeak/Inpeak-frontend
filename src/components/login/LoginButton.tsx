import { useState } from 'react';
import styled from 'styled-components';
import { LoginModal } from './LoginModal';

export const Login = () => {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      <LoginButton onClick={() => setOpenLogin(true)}>3초만에 시작하기</LoginButton>
      {openLogin && <LoginModal setOpenLogin={setOpenLogin} />}
    </>
  );
};

export const LoginButton = styled.div`
  width: 147px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100px;
  border: none;
  background-color: #3277ed;

  padding: 6px 18px;

  color: white;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.35px;

  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #72a6ff;
  }
`;
