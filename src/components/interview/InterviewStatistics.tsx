import React from 'react';
import styled from 'styled-components';

interface QuestionCircleProps {
  isBlue?: boolean;
  isPink?: boolean;
  isGreen?: boolean;
}

interface StatisticsProps {
  totalPracticeTime: string;
  totalQuestions: number;
  totalPracticeCount: string;
  correctCount: number;
  wrongCount: number;
  giveUpCount: number;
}

const InterviewStatistics: React.FC<StatisticsProps> = ({
  totalPracticeTime,
  totalQuestions,
  totalPracticeCount,
  correctCount,
  wrongCount,
  giveUpCount,
}) => {
  // 시간 변환 로직: "MM:SS" 형태를 시간:분 형태로 변환
  const convertToHourMinute = (time: string) => {
    const [minutesStr] = time.split(':');
    const minutes = parseInt(minutesStr, 10);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, '0')}시간 ${String(remainingMinutes).padStart(2, '0')}분`;
  };

  return (
    <Container>
      <StatsBox>
        <StatsRow>
          <StatsTitle>누적 연습시간</StatsTitle>
          <Divider />
          <StatsValue>{convertToHourMinute(totalPracticeTime)}</StatsValue>
        </StatsRow>
        <StatsRow>
          <StatsTitle>누적 질문 수</StatsTitle>
          <Divider />
          <StatsValue>{totalQuestions}개</StatsValue>
        </StatsRow>
        <StatsRow>
          <StatsTitle>총 연습 횟수</StatsTitle>
          <Divider />
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

export default InterviewStatistics;

const Container = styled.div`
  display: flex;
  width: auto;
  height: 224px;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30px;
`;

const StatsBox = styled.div`
  width: 100%;
  height: auto;
  background: #eff5ff;
  padding: 8px 16px;
  box-sizing: border-box;
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
  font-size: 12px;
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
  font-size: 12px;
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
  width: 157px;
  height: 59px;
  flex-direction: column;
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
