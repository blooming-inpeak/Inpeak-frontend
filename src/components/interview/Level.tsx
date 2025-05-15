/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InterviewStatistics from './InterviewStatistics';
import { fetchHistoryStatistics } from '../../api/historyStatistics/statisticsAPI';
import InfoIcon from '../../assets/img/LevelIcon.svg';
import SpeechBubbleImg from '../../assets/img/LevelMark.svg';
import LevelModal from '../common/levelModal/LevelModal';
import Grade0 from '../../assets/img/level/grade0.svg';
import Grade1 from '../../assets/img/level/grade1.png';
import Grade2 from '../../assets/img/level/grade2.png';
import Grade3 from '../../assets/img/level/grade3.png';
import Grade4 from '../../assets/img/level/grade4.png';

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
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const getGradeImage = (level: number) => {
    if (level === 0) return Grade0;
    if (level <= 2) return Grade1;
    if (level <= 4) return Grade2;
    if (level <= 7) return Grade3;
    return Grade4;
  };

  return (
    <>
      {showModal && <LevelModal onClose={() => setShowModal(false)} />}
      {isMobile ? (
        <MobileWrapper>
          <MobileHeader>
            <div id="levelContentLeft">
              <LevelText>Lv.</LevelText>
              <LevelNumber data-content={String(level)}>{level}</LevelNumber>
            </div>
            <div id="levelContentRight">
              <NextLevelText>다음 레벨까지 {maxProgress - progress}경험치</NextLevelText>
              <ProgressBar>
                <ProgressBarFill width={progressPercentage} />
              </ProgressBar>
            </div>
          </MobileHeader>
          <MobileStatistics>
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
          </MobileStatistics>
        </MobileWrapper>
      ) : (
        <LevelWrapper>
          <SpeechBubble src={SpeechBubbleImg} alt="레벨링 설명 보기" />
          <LevelLeft>
            <img src={getGradeImage(level)} alt="레벨 이미지" style={{ width: '200px', height: '200px' }} />
          </LevelLeft>
          <LevelRight>
            <InfoIconImg src={InfoIcon} alt="info" onClick={() => setShowModal(true)} />
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
      )}
    </>
  );
};

export default Level;

const MobileWrapper = styled.div`
  width: 304px;
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  box-shadow: 100px 100px 100px 0px rgba(0, 0, 0, 0.02), 0px 0px 100px 0px rgba(0, 80, 216, 0.08);
  backdrop-filter: blur(10px);
`;

const MobileHeader = styled.div`
  display: flex;
  height: 120px;
  background: rgba(133, 178, 255, 0.4);
  backdrop-filter: blur(40px);
  display: flex;
  padding: 40px 30px 20px 30px;
  align-items: flex-end;
  gap: 12px;
  align-self: stretch;
  box-sizing: border-box;
  border-radius: 24px 24px 0px 0px;

  #levelContentLeft {
    display: flex;
    gap: 6px;
    align-items: flex-end;
    align-self: flex-end;
  }
  #levelContentRight {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const NextLevelText = styled.div`
  color: #0050d8;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.35px;
`;

const MobileStatistics = styled.div`
  display: flex;
  flex-direction: column;
`;

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

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 16px;
    gap: 12px;
  }
`;

export const LevelLeft = styled.div`
  width: 256px;
  height: 224px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    background: transparent;
    padding: 0;
    border-radius: 0;
  }
`;

export const InfoIconImg = styled.img`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
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

  @media (max-width: 768px) {
    align-items: stretch;
  }
`;

export const ProgressBar = styled.div`
  width: 150px;
  height: 10px;
  background: #eff5ff;
  border-radius: 4px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 170px;
  }
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
