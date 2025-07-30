import React from 'react';
import styled from 'styled-components';

interface Props {
  name: '전체' | '정답' | '오답' | '포기'; // 허용되는 값들을 명확히 지정
  isSelect: boolean;
  setIsSelect: React.Dispatch<React.SetStateAction<'전체' | '정답' | '오답' | '포기'>>;
}

export const ClassButton: React.FC<Props> = ({ name, isSelect, setIsSelect }) => {
  return (
    <ClassButtonWrapper isSelect={isSelect} onClick={() => setIsSelect(name)}>
      {name}
    </ClassButtonWrapper>
  );
};

export const ClassButtonWrapper = styled.div<{ isSelect: boolean }>`
  width: auto;
  height: 26px;
  padding: 4px 10px;
  cursor: pointer;

  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.3px;
  margin-bottom: 20px;

  background-color: ${({ isSelect }) => (isSelect ? '#e6efff' : '#f5f9ff')};
  color: ${({ isSelect }) => (isSelect ? '#0050d8' : '#747474')};
`;
