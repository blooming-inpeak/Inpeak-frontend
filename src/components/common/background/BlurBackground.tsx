import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
}

export const BlurBackground = ({ children }: Props) => {
  return <BlurBackgroundContainer>{children}</BlurBackgroundContainer>;
};

export const BlurBackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;
