import React from 'react';
import styled from 'styled-components';

interface QuestionCircleProps {
  isBlue?: boolean;
  isPink?: boolean;
  isGreen?: boolean;
}

interface StatisticsRightProps {
  userName: string;
  totalPracticeTime: string;
  totalQuestions: number;
  totalPracticeCount: string;
  correctCount: number;
  wrongCount: number;
  giveUpCount: number;
}

const StatisticsRightComponent: React.FC<StatisticsRightProps> = ({
  userName,
  totalPracticeTime,
  totalQuestions,
  totalPracticeCount,
  correctCount,
  wrongCount,
  giveUpCount,
}) => {
  return (
    <Container>
      <Title>{userName}님의 히스토리 통계</Title>
      <StatsBox>
        <StatsRow>
          <StatsTitle>누적 연습시간</StatsTitle>
          <Divider />
          <StatsValue>{totalPracticeTime}</StatsValue>
        </StatsRow>
        <StatsRow>
          <StatsTitle>누적 질문 수</StatsTitle>
          <Divider />
          <StatsValue>{totalQuestions}개</StatsValue>
        </StatsRow>
        <StatsRow>
          <StatsTitle>총 연습 횟수</StatsTitle>
          <Divider />
          <StatsValue>{totalPracticeCount}</StatsValue>
        </StatsRow>
      </StatsBox>
      <QuestionStatsContainer>
        <QuestionStatsRow>
          <QuestionCircle isBlue />
          <QuestionLabel>정답</QuestionLabel>
          <QuestionValue>{correctCount}개</QuestionValue>
        </QuestionStatsRow>
        <QuestionStatsRow>
          <QuestionCircle isGreen />
          <QuestionLabel>포기한 질문</QuestionLabel>
          <QuestionValue>{giveUpCount}개</QuestionValue>
        </QuestionStatsRow>
        <QuestionStatsRow>
          <QuestionCircle isPink />
          <QuestionLabel>오답</QuestionLabel>
          <QuestionValue>{wrongCount}개</QuestionValue>
        </QuestionStatsRow>
      </QuestionStatsContainer>
    </Container>
  );
};

export default StatisticsRightComponent;

const Container = styled.div`
  width: auto;
  height: 237px;
  box-sizing: border-box;
  padding-top: 42px;
  padding-left: 40px;
`;

const Title = styled.h1`
  color: #212121;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin: 0;
`;

const StatsBox = styled.div`
  width: 208px;
  height: 83px;
  background: #f5f9ff;
  padding: 8px 16px;
  box-sizing: border-box;
  margin-top: 12px;
  display: table;
  border-radius: 12px;
`;

const StatsRow = styled.div`
  display: table-row;
  width: 100%;
`;

const StatsTitle = styled.h2`
  display: table-cell;
  color: #212121;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;
  margin: 0;
  text-align: left;
  padding-right: 12px;
`;

const StatsValue = styled.h2`
  display: table-cell;
  color: #212121;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;
  margin: 0;
  text-align: left;
  padding-left: 12px;
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: #e6efff;
  background-blend-mode: multiply;
`;

const QuestionStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 53px;
  width: 157px;
  height: 59px;
`;

const QuestionStatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const QuestionLabel = styled.h3`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  margin-left: 10px;
`;

const QuestionValue = styled.h4`
  color: #212121;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  margin-left: auto;
`;

export const QuestionCircle = styled.div<QuestionCircleProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ isBlue, isPink, isGreen }) =>
    isBlue ? '#3277ED' : isPink ? '#FFD0D4' : isGreen ? '#EAFFBA' : '#ccc'};
`;
