// HistoryStatistics.tsx
import { useState, useEffect } from 'react';
import HistoryStatisticsGraph from './HistoryStatisticsGraph';
import StatisticsRightComponent from './StatisticsRightComponent';
import { fetchHistoryStatistics, HistoryStatisticsData } from '../../../api/historyStatistics/statisticsAPI';
import { HistoryStatisticsBox, StatisticsLeft } from './HistoryStatisticsStyles';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/auth/userState';

export const HistoryStatistics = () => {
  const user = useRecoilValue(userState);

  const [stats, setStats] = useState<HistoryStatisticsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHistoryStatistics();
        setStats(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // 에러 처리: 필요 시 추가 로직 작성
      }
    };
    fetchData();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  const {
    totalAnswerCount,
    correctAnswerCount,
    incorrectAnswerCount,
    skippedAnswerCount,
    totalInterviewCount,
    totalRunningTime,
  } = stats;

  // totalRunningTime(초)를 시간과 분으로 변환하는 함수
  const formatTotalTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}시간 ${minutes}분`;
  };

  const correctPercentage = (correctAnswerCount / totalAnswerCount) * 100;
  const skippedPercentage = (skippedAnswerCount / totalAnswerCount) * 100;
  const incorrectPercentage = (incorrectAnswerCount / totalAnswerCount) * 100;

  return (
    <HistoryStatisticsBox>
      <StatisticsRightComponent
        userName={user?.nickname ?? '김인픽'}
        totalPracticeTime={formatTotalTime(totalRunningTime)}
        totalQuestions={totalAnswerCount}
        totalPracticeCount={totalInterviewCount}
        correctCount={correctAnswerCount}
        wrongCount={incorrectAnswerCount}
        giveUpCount={skippedAnswerCount}
      />
      <StatisticsLeft>
        <HistoryStatisticsGraph
          percentage1={correctPercentage}
          percentage2={skippedPercentage}
          percentage3={incorrectPercentage}
        />
      </StatisticsLeft>
    </HistoryStatisticsBox>
  );
};

export default HistoryStatistics;
