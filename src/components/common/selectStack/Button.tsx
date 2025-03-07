import { useState } from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  color: string;
}

export const Button = ({ name, color }: Props) => {
  const [isClick, setIsClick] = useState(false);
  return (
    <ButtonWrapper onClick={() => setIsClick(!isClick)} $isClick={isClick}>
      <ButtonIcon style={{ backgroundColor: color }}>
        <img src={`/images/stackIcon/${name}.svg`} />
      </ButtonIcon>
      <ButtonTitle>{name}</ButtonTitle>
    </ButtonWrapper>
  );
};

export const ButtonWrapper = styled.div<{ $isClick: boolean }>`
  width: 120px;
  height: 48px;
  padding: 10px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${({ $isClick }) => ($isClick ? '#F5F9FF' : '#F2F2F2')};
  border: ${({ $isClick }) => ($isClick ? '1.5px dashed #3277ed' : '')};

  padding: 10px;
  border-radius: 16px;
  gap: 8px;

  &:hover {
    background-color: #e6efff;
  }
`;

export const ButtonIcon = styled.div`
  width: 28px;
  height: 24px;
  padding: 2px 0;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.35px;
`;
