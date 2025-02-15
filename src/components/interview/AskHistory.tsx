import styled from 'styled-components';
import { ClassButton } from './ClassButton';
import { useState } from 'react';
import { AskHistoryBox } from './AskHistoryBox';
import { AskHistoryMore } from './AskHistoryMore';
// import { EmptyAskHistory } from './EmptyAskHistory';

export const AskHistory = () => {
  const [isSelect, setIsSelect] = useState('전체');

  return (
    <AskHistoryWrapper>
      <AskHistoryTitle>최근 질문 히스토리</AskHistoryTitle>

      <AskHistoryClass>
        <ClassButton name="전체" isSelect={isSelect === '전체'} setIsSelect={setIsSelect} />
        <ClassButton name="정답" isSelect={isSelect === '정답'} setIsSelect={setIsSelect} />
        <ClassButton name="오답" isSelect={isSelect === '오답'} setIsSelect={setIsSelect} />
        <ClassButton name="포기" isSelect={isSelect === '포기'} setIsSelect={setIsSelect} />
      </AskHistoryClass>

      <AskHistoryBox />
      <AskHistoryBox />
      <AskHistoryBox />

      <AskHistoryMore />

      {/* 질문 히스토리 비어있는 컴포넌트 */}
      {/* <EmptyAskHistory /> */}
    </AskHistoryWrapper>
  );
};

export const AskHistoryWrapper = styled.div`
  width: 549px;
  height: 422px;
  padding: 40px 50px;

  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04);
  backdrop-filter: blur(10px);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const AskHistoryTitle = styled.div`
  color: black;
  font-size: 18px;
  font-weight: 600;

  margin-bottom: 28px;
`;

export const AskHistoryClass = styled.div`
  display: flex;
  gap: 6px;
`;
