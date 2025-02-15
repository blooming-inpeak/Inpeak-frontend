import { useState } from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  color: string;
}

export const Button = ({ name, color }: Props) => {
  const [isClicke, setIsClick] = useState(false);
  return (
    <ButtonWrapper style={{ backgroundColor: isClicke ? '#3277ED' : '#F2F2F2' }} onClick={() => setIsClick(!isClicke)}>
      <ButtonIcon style={{ backgroundColor: color }}>
        <img src={`/images/stackIcon/${name}.svg`} />
      </ButtonIcon>
      <ButtonTitle style={{ color: isClicke ? '#ffffff' : 'black' }}>{name}</ButtonTitle>
    </ButtonWrapper>
  );
};

export const ButtonWrapper = styled.div`
  width: 100px;
  height: 28px;

  display: flex;
  align-items: center;
  cursor: pointer;

  padding: 10px;
  border-radius: 16px;
  gap: 8px;
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
