import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  message: string;
  index: number;
  moveUp: boolean;
}

export const Toast = ({ message, index, moveUp }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => setVisible(true), 100 + index * 400);

    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 3100 + index * 400);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [index]);

  return <ToastWrapper className={`${visible ? 'show' : ''} ${moveUp ? 'moveUp' : ''}`}>{message}</ToastWrapper>;
};

const fadeOut = keyframes`
  0%{
    opacity: 1;
    transform: translateX(0);
  }
  100%{
    opacity: 0;
    transform: translateX(0);
  }
`;

const moveUpFadeOut = keyframes`
    0%{
    opacity: 1;
    transform: translateX(0) translateY(-46px);
  }
  100%{
    opacity: 0;
    transform: translateX(0) translateY(-46px);
  }
`;

const slideIn = keyframes`
  0%{
    transform: translateX(-200%);
  }
  100%{
    transform: translateX(0);
  }
`;

const slideUp = keyframes`
  0%{
    transform: translateY(0);
  }

  100%{
    transform: translateY(-46px); /* 첫 번째 요소가 위로 밀려나도록 */
  }
`;

export const ToastWrapper = styled.div`
  padding: 12px 20px;

  border-radius: 12px;
  background-color: #323b54;
  box-shadow: 0px 24px 24px 0px rgba(0, 0, 0, 0.04), 0px 0px 100px 0px rgba(0, 80, 216, 0.16);

  color: #fafafa;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.3px;

  transform: translateX(-200%);
  position: absolute;
  bottom: 24px;
  left: 24px;

  &.show {
    opacity: 1;
    animation: ${slideIn} 0.5s ease-out forwards, ${fadeOut} 0.2s ease-in 2.6s forwards;
  }

  &.moveUp {
    animation: ${slideIn} 0.5s ease-out forwards, ${slideUp} 0.5s ease-out 0.5s forwards,
      ${moveUpFadeOut} 0.2s ease-in 2.6s forwards;
  }
`;
