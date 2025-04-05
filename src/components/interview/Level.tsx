/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InterviewStatistics from './InterviewStatistics';
import { fetchHistoryStatistics } from '../../api/historyStatistics/statisticsAPI';
import InfoIcon from '../../assets/img/LevelIcon.svg';
import SpeechBubbleImg from '../../assets/img/LevelMark.svg';

interface LevelProps {
  level: number;
  progress: number;
  maxProgress: number;
}

interface ProgressBarFillProps {
  width: number;
}

export const Level: React.FC<LevelProps> = ({ level, progress, maxProgress }) => {
  const [stats, setStats] = useState<any | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await fetchHistoryStatistics();
        const totalMinutes = Math.floor(data.totalRunningTime / 60);
        const totalSeconds = data.totalRunningTime % 60;
        const formattedTime = `${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;

        setStats({
          totalPracticeTime: formattedTime,
          totalQuestions: data.totalAnswerCount,
          totalPracticeCount: data.totalInterviewCount,
          correctCount: data.correctAnswerCount,
          wrongCount: data.incorrectAnswerCount,
          giveUpCount: data.skippedAnswerCount,
        });
      } catch (error) {
        console.error('히스토리 통계 데이터를 불러오는데 실패했습니다.', error);
      }
    };

    fetchStats();
  }, []);

  const progressPercentage = (progress / maxProgress) * 100;

  return (
    <LevelWrapper>
      <SpeechBubble src={SpeechBubbleImg} alt="레벨링 설명 보기" />
      <LevelLeft>
        <LevelStatisticsBox>
          {stats && (
            <InterviewStatistics
              totalPracticeTime={stats.totalPracticeTime}
              totalQuestions={stats.totalQuestions}
              totalPracticeCount={stats.totalPracticeCount}
              correctCount={stats.correctCount}
              wrongCount={stats.wrongCount}
              giveUpCount={stats.giveUpCount}
            />
          )}
        </LevelStatisticsBox>
      </LevelLeft>
      <LevelRight>
        <InfoIconImg src={InfoIcon} alt="info" />
        <LevelRightBox>
          <LevelContent>
            <LevelText>Lv.</LevelText>
            <LevelNumber data-content={String(level)}>{level}</LevelNumber>
          </LevelContent>
          <ProgressBarContainer>
            <ProgressBar>
              <ProgressBarFill width={progressPercentage} />
            </ProgressBar>
            <ProgressLabel>
              {progress}/{maxProgress}
            </ProgressLabel>
          </ProgressBarContainer>
        </LevelRightBox>
      </LevelRight>
    </LevelWrapper>
  );
};

export default Level;

export const LevelWrapper = styled.div`
  width: 456px;
  height: 224px;
  display: flex;
  align-items: center;
  border-radius: 24px;
  background: rgba(251, 253, 255, 0.8);
  box-shadow: 100px 100px 100px 0px rgba(0, 0, 0, 0.02), 0px 0px 100px 0px rgba(0, 80, 216, 0.08);
  backdrop-filter: blur(10px);
  position: relative;
`;

export const LevelLeft = styled.div`
  width: 256px;
  height: 224px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LevelStatisticsBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const LevelRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 200px;
  height: 224px;
  padding: 16px 16px 30px 20px;
  border-radius: 0px 24px 24px 0px;
  background: rgba(133, 178, 255, 0.4);
  backdrop-filter: blur(40px);
  box-sizing: border-box;
  position: relative;
`;

export const InfoIconImg = styled.img`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
`;

const SpeechBubble = styled.img`
  position: absolute;
  top: -40px;
  right: 0;
  width: 200px;
  height: auto;
  z-index: 10;
`;

export const LevelRightBox = styled.div`
  display: flex;
  width: 150px;
  flex-direction: column;
  align-items: flex-start;
`;

export const LevelContent = styled.div`
  display: flex;
  width: 150x;
  height: 60px;
  gap: 6px;
  align-items: flex-end;
  align-self: flex-end;
`;

export const LevelNumber = styled.div`
  padding-right: 6px;
  color: #ffffff;
  font-size: 60px;
  line-height: 100%;
  position: relative;
  z-index: 1;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.3px;

  &::before {
    content: attr(data-content);
    position: absolute;
    z-index: -1;
    -webkit-text-stroke: 16px #3277ed;
  }
`;

export const LevelText = styled.div`
  color: #3277ed;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-top: 12px;
  gap: 4px;
`;

export const ProgressBar = styled.div`
  width: 150px;
  height: 10px;
  background: #eff5ff;
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<ProgressBarFillProps>`
  width: ${props => `${props.width}%`};
  height: 100%;
  background: #c4f752;
  border-radius: 4px;
`;

export const ProgressLabel = styled.div`
  color: #0050d8;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.3px;
`;
