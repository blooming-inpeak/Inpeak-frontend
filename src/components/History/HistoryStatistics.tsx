import styled from 'styled-components';
import HistoryStatisticsGraph from './HistoryStatisticsGraph';
import StatisticsRightComponent from './StatisticsRightComponent';

export const HistoryStatistics = () => {
  const userName = '김인픽';
  const totalPracticeTime = '01시간 35분';
  const totalQuestions = 30;
  const totalPracticeCount = '10번';

  const correctCount = 21;
  const wrongCount = 3;
  const giveUpCount = 6;

  const correctPercentage = (correctCount / totalQuestions) * 100;
  const giveUpPercentage = (giveUpCount / totalQuestions) * 100;
  const wrongPercentage = (wrongCount / totalQuestions) * 100;

  return (
    <HistoryStatisticsBox>
      <StatisticsRightComponent
        userName={userName}
        totalPracticeTime={totalPracticeTime}
        totalQuestions={totalQuestions}
        totalPracticeCount={totalPracticeCount}
        correctCount={correctCount}
        wrongCount={wrongCount}
        giveUpCount={giveUpCount}
      />
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

const StatisticsLeft = styled.div`
  margin-left: 10px;
  margin-top: 18.8px;
`;
