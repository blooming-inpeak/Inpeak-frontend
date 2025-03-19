import { useState, useEffect } from 'react';
// import { useRecoilValue } from 'recoil';
// import { userState } from '../../store/User/User';
import axios from 'axios';
import styled from 'styled-components';
import HistoryStatisticsGraph from './HistoryStatisticsGraph';
import StatisticsRightComponent from './StatisticsRightComponent';

export const HistoryStatistics = () => {
  // 현재 recoil 기능이 구현되지 않아 임시 user 객체 사용
  const user = { name: '김인픽' };

  // JSON 파일에서 불러올 통계 데이터 (username 제외)
  const [stats, setStats] = useState<{
    totalPracticeTime: string;
    totalQuestions: number;
    totalPracticeCount: string;
    correctCount: number;
    wrongCount: number;
    giveUpCount: number;
  } | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // public/sampledata/historyStatistics.json 파일에서 데이터를 불러옴.
        const response = await axios.get('/public/sampledata/historyStatistics.json', {
          // headers: { Authorization: `Bearer ${accessToken}` },
        });
        setStats(response.data);
      } catch (error) {
        console.error('히스토리 통계 데이터를 불러오는데 실패했습니다.', error);
      }
    };
    fetchStatistics();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  const totalQuestions = stats.totalQuestions;
  const correctCount = stats.correctCount;
  const wrongCount = stats.wrongCount;
  const giveUpCount = stats.giveUpCount;

  const correctPercentage = (correctCount / totalQuestions) * 100;
  const giveUpPercentage = (giveUpCount / totalQuestions) * 100;
  const wrongPercentage = (wrongCount / totalQuestions) * 100;

  return (
    <HistoryStatisticsBox>
      <StatisticsRightComponent
        // 추후 recoil에서 가져온 user.name 사용. 현재는 임시값 '김인픽' 사용
        userName={user?.name || '김인픽'}
        totalPracticeTime={stats.totalPracticeTime}
        totalQuestions={totalQuestions}
        totalPracticeCount={stats.totalPracticeCount}
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
  padding: 42px 40px 42px 40px;
  box-sizing: border-box;
  justify-content: space-between;
`;

const StatisticsLeft = styled.div`
  align-items: center;
  display: flex;
`;
