import React, { useState } from 'react';
import styled from 'styled-components';
import { ClassButton } from './ClassButton';
import { AskHistoryBox } from './AskHistoryBox';
import { AskHistoryMore } from './AskHistoryMore';
import { CaptionType } from '../common/caption/CaptionType';

interface HistoryItem {
  question: string;
  answer: string;
  // common 폴더의 caption 컴포넌트 사용
  status: CaptionType;
  detailUrl: string;
}

export const AskHistory: React.FC = () => {
  const [isSelect, setIsSelect] = useState('전체');

  // 예시 데이터 배열
  const sampleHistory: HistoryItem[] = [
    {
      question: '사용자 중심 디자인에 귀하의 접근 방식을 설명해 주시겠어요?',
      answer: '저는 디자인이 단순히 문제 해결을 넘어, 감정적 연결과 긍정적 경험을 제공해야 한다고 믿습니다.',
      status: '정답-small',
      detailUrl: '/detail/1',
    },
    {
      question: '최근에 어떤 프로젝트를 진행했나요?',
      answer: '저는 최근에 AI 기반 디자인 도구를 개발하는 프로젝트에 참여했습니다.',
      status: '오답-small',
      detailUrl: '/detail/2',
    },
    {
      question: '어떤 상황에서 어려움을 겪었나요?',
      answer: '팀원 간의 의견 차이로 프로젝트 진행이 지연된 경험이 있습니다.',
      status: '포기-small',
      detailUrl: '/detail/3',
    },
  ];

  const filteredHistory = sampleHistory.filter(item => {
    if (isSelect === '전체') return true;
    return item.status.startsWith(isSelect);
  });

  return (
    <AskHistoryWrapper>
      <AskHistoryTitle>최근 질문 히스토리</AskHistoryTitle>
      {filteredHistory.length > 0 ? (
        <>
          <AskHistoryClass>
            <ClassButton name="전체" isSelect={isSelect === '전체'} setIsSelect={setIsSelect} />
            <ClassButton name="정답" isSelect={isSelect === '정답'} setIsSelect={setIsSelect} />
            <ClassButton name="오답" isSelect={isSelect === '오답'} setIsSelect={setIsSelect} />
            <ClassButton name="포기" isSelect={isSelect === '포기'} setIsSelect={setIsSelect} />
          </AskHistoryClass>

          {filteredHistory.map((item, index) => (
            <AskHistoryBox
              key={index}
              question={item.question}
              answer={item.answer}
              status={item.status}
              detailUrl={item.detailUrl}
            />
          ))}

          {filteredHistory.length >= 3 && <AskHistoryMore />}
        </>
      ) : (
        <EmptyMessage>
          <h1>아직 진행된 면접이 없어요</h1>
          <h2>모의면접 연습하고 히스토리를 쌓아나가 보세요!</h2>
        </EmptyMessage>
      )}
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

export const EmptyMessage = styled.div`
  width: 100%;
  color: #9a9a9a;
  text-align: center;
  line-height: 150%;
  padding-top: 135px;

  h1 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 5px;
  }
  h2 {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.35px;
    margin: 0;
  }
`;
