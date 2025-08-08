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
  totalPracticeCount: number;
  correctCount: number;
  wrongCount: number;
  giveUpCount: number;
}
const getFontSizeByLength = (length: number) => {
  if (length <= 3) return '20px';
  if (length <= 5) return '19px';
  if (length <= 8) return '18px';
  return '14px';
};

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
      <Title fontSize={getFontSizeByLength(userName.length)}>{userName}님의 히스토리 통계</Title>
      <StatsBox>
        <StatsRow>
          <StatsTitle>누적 연습시간</StatsTitle>
          <DividerCell>
            <Divider />
          </DividerCell>
          <StatsValue>{totalPracticeTime}</StatsValue>
        </StatsRow>
        <StatsRow>
          <StatsTitle>누적 질문 수</StatsTitle>
          <DividerCell>
            <Divider />
          </DividerCell>
          <StatsValue>{totalQuestions}개</StatsValue>
        </StatsRow>
        <StatsRow>
          <StatsTitle>총 연습 횟수</StatsTitle>
          <DividerCell>
            <Divider />
          </DividerCell>
          <StatsValue>{totalPracticeCount}번</StatsValue>
        </StatsRow>
      </StatsBox>
      <QuestionStatsContainer>
        <QuestionStatsRow>
          <QuestionCircle isBlue />
          <QuestionLabel>정답</QuestionLabel>
          <QuestionValue>{correctCount}개</QuestionValue>
        </QuestionStatsRow>
        <QuestionStatsRow>
          <QuestionCircle isPink />
          <QuestionLabel>오답</QuestionLabel>
          <QuestionValue>{wrongCount}개</QuestionValue>
        </QuestionStatsRow>
        <QuestionStatsRow>
          <QuestionCircle isGreen />
          <QuestionLabel>포기한 질문</QuestionLabel>
          <QuestionValue>{giveUpCount}개</QuestionValue>
        </QuestionStatsRow>
      </QuestionStatsContainer>
    </Container>
  );
};

export default StatisticsRightComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Title = styled.h1<{ fontSize: string }>`
  font-size: ${({ fontSize }) => fontSize};
  color: #212121;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin: 0;
  white-space: nowrap;
  max-width: 200px;
`;

const StatsBox = styled.div`
  width: 208px;
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
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;
  margin: 0;
  text-align: left;
  padding: 2px 12px 2px 0;
`;

const DividerCell = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: #e6efff;
  background-blend-mode: multiply;
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
  padding: 2px 0 2px 12px;
`;

const QuestionStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 157px;
  margin-top: auto;
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

export const QuestionCircle = styled.div.withConfig({
  shouldForwardProp: prop => !['isBlue', 'isPink', 'isGreen'].includes(prop),
})<QuestionCircleProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ isBlue, isPink, isGreen }) =>
    isBlue ? '#3277ED' : isPink ? '#FFD0D4' : isGreen ? '#EAFFBA' : '#ccc'};
`;
