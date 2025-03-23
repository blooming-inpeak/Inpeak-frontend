import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HistoryStatisticsGraph from './HistoryStatisticsGraph';
import StatisticsRightComponent from './StatisticsRightComponent';

export const HistoryStatistics = () => {
  const user = { name: '김인픽' };

  // 환경 변수에서 엑세스 토큰을 가져옴
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  const [stats, setStats] = useState<{
    totalAnswerCount: number;
    correctAnswerCount: number;
    incorrectAnswerCount: number;
    skippedAnswerCount: number;
    totalInterviewCount: number;
    totalRunningTime: number;
  } | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // 프록시 설정에 따라 /answer/summary로 요청이 자동으로 API 서버로 전달됩니다.
        const response = await axios.get('/answer/summary', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data;

        setStats({
          totalAnswerCount: data.totalAnswerCount,
          correctAnswerCount: data.correctAnswerCount,
          incorrectAnswerCount: data.incorrectAnswerCount,
          skippedAnswerCount: data.skippedAnswerCount,
          totalInterviewCount: data.totalInterviewCount,
          totalRunningTime: data.totalRunningTime,
        });
      } catch (error) {
        console.error('히스토리 통계 데이터를 불러오는데 실패했습니다.', error);
      }
    };
    fetchStatistics();
  }, [accessToken]);

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

  const correctPercentage = (correctAnswerCount / totalAnswerCount) * 100;
  const skippedPercentage = (skippedAnswerCount / totalAnswerCount) * 100;
  const incorrectPercentage = (incorrectAnswerCount / totalAnswerCount) * 100;

  return (
    <HistoryStatisticsBox>
      <StatisticsRightComponent
        userName={user?.name || '김인픽'}
        totalPracticeTime={`${totalRunningTime}초`}
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

const HistoryStatisticsBox = styled.div`
  width: 553px;
  height: 321px;
  border-radius: 24px;
  border: 1px solid #e6efff;
  background: #fff;
  box-shadow: 100px 100px 100px 0px rgba(0, 0, 0, 0.02), 2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 100px 0px rgba(0, 80, 216, 0.08);
  display: flex;
  padding: 42px 40px 42px 40px;
  box-sizing: border-box;
  justify-content: space-between;
`;

const StatisticsLeft = styled.div`
  align-items: center;
  display: flex;
`;
