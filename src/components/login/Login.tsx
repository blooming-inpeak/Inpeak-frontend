import styled from 'styled-components';

export const Login = () => {
  return <LoginButton>3초만에 시작하기</LoginButton>;
};

export const LoginButton = styled.button`
  width: 100%;
  height: 100%;

  border-radius: 100px;
  border: none;
  background-color: #0050d8;

  color: white;
  font-size: clamp(10px, 0.8vw, 14px);
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.35px;

  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #3277ed;
  }
`;
