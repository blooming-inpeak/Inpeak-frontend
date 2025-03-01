import styled from 'styled-components';
import HistoryStatisticsGraph from './HistoryStatisticsGraph';

interface QuestionCircleProps {
  isBlue?: boolean;
  isPink?: boolean;
  isGreen?: boolean;
}

export const HistoryStatistics = () => {
  const userName = '김인픽';
  const totalPracticeTime = '01시간 35분';
  const totalQuestions = 30;
  const totalPracticeCount = '10번';

  const correctCount = 6;
  const wrongCount = 21;
  const giveUpCount = 3;

  const correctPercentage = Math.round((correctCount / totalQuestions) * 100);
  const giveUpPercentage = Math.round((giveUpCount / totalQuestions) * 100);
  const wrongPercentage = Math.round((wrongCount / totalQuestions) * 100);

  return (
    <HistoryStatisticsBox>
      <StatisticsRight>
        <h1>{userName}님의 히스토리 통계</h1>
        <StatisticsRightBox>
          <StatisticsList>
            <StatisticsItemTitle>누적 연습시간</StatisticsItemTitle>
            <Stroke />
            <StatisticsItemValue>{totalPracticeTime}</StatisticsItemValue>
          </StatisticsList>
          <StatisticsList>
            <StatisticsItemTitle>누적 질문 수</StatisticsItemTitle>
            <Stroke />
            <StatisticsItemValue>{totalQuestions}개</StatisticsItemValue>
          </StatisticsList>
          <StatisticsList>
            <StatisticsItemTitle>총 연습 횟수</StatisticsItemTitle>
            <Stroke />
            <StatisticsItemValue>{totalPracticeCount}</StatisticsItemValue>
          </StatisticsList>
        </StatisticsRightBox>
        <StatisticsQuestionNumContainer>
          <StatisticsQuestionNumList>
            <QuestionCircle isBlue />
            <h3>정답</h3>
            <h4>{correctCount}개</h4>
          </StatisticsQuestionNumList>
          <StatisticsQuestionNumList>
            <QuestionCircle isGreen />
            <h3>포기한 질문</h3>
            <h4>{giveUpCount}개</h4>
          </StatisticsQuestionNumList>
          <StatisticsQuestionNumList>
            <QuestionCircle isPink />
            <h3>오답</h3>
            <h4>{wrongCount}개</h4>
          </StatisticsQuestionNumList>
        </StatisticsQuestionNumContainer>
      </StatisticsRight>
      <StatisticsLeft>
        <HistoryStatisticsGraph
          percentage1={correctPercentage}
          percentage2={giveUpPercentage}
          percentage3={wrongPercentage}
        />
      </StatisticsLeft>
    </HistoryStatisticsBox>
  );
};

const HistoryStatisticsBox = styled.div`
  width: 553px;
  height: 321px;
  border-radius: 24px;
  border: 1px solid #e6efff;
  background: #fff;
  box-shadow: 100px 100px 100px 0px rgba(0, 0, 0, 0.02), 2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 100px 0px rgba(0, 80, 216, 0.08);
  display: flex;
`;

const StatisticsRight = styled.div`
  width: auto;
  height: 237px;
  box-sizing: border-box;
  padding-top: 42px;
  padding-left: 40px;
  h1 {
    color: #212121;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin: 0;
  }
`;

const StatisticsRightBox = styled.div`
  width: 208px;
  height: 83px;
  background: #f5f9ff;
  padding: 8px 16px;
  box-sizing: border-box;
  margin-top: 12px;
  display: table;
  border-radius: 12px;
`;

const StatisticsList = styled.div`
  display: table-row;
  width: 100%;
`;

const StatisticsItemTitle = styled.h2`
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

const StatisticsItemValue = styled.h2`
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

const Stroke = styled.div`
  width: 1px;
  height: 16px;
  background: #e6efff;
  background-blend-mode: multiply;
`;

const StatisticsLeft = styled.div`
  margin-left: 10px;
  margin-top: 18.8px;
`;

const QuestionCircle = styled.div<QuestionCircleProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ isBlue, isPink, isGreen }) =>
    isBlue ? '#3277ED' : isPink ? '#FFD0D4' : isGreen ? '#EAFFBA' : '#ccc'};
`;

const StatisticsQuestionNumContainer = styled.div`
  display: flex;
  width: 157px;
  height: 59px;
  flex-direction: column;
  gap: 8px;
  margin-top: 53px;
`;

const StatisticsQuestionNumList = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  h3 {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;
    margin-left: 10px;
  }

  h4 {
    color: #212121;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;
    margin-left: auto;
  }
`;
