import React from 'react';
import styled from 'styled-components';
import InterviewStatistics from './InterviewStatistics';

interface LevelProps {
  level: number;
  progress: number;
  remainingCount: number;
}

interface ProgressBarFillProps {
  width: string;
}

const totalPracticeTime = '01시간 35분';
const totalQuestions = 30;
const totalPracticeCount = '10번';
const correctCount = 21;
const wrongCount = 3;
const giveUpCount = 6;

export const Level: React.FC<LevelProps> = ({ level, progress, remainingCount }) => {
  return (
    <LevelWrapper>
      <LevelLeft>
        <LevelStatisticsBox>
          <InterviewStatistics
            totalPracticeTime={totalPracticeTime}
            totalQuestions={totalQuestions}
            totalPracticeCount={totalPracticeCount}
            correctCount={correctCount}
            wrongCount={wrongCount}
            giveUpCount={giveUpCount}
          />
        </LevelStatisticsBox>
      </LevelLeft>
      <LevelRight>
        <LevelContent>
          <LevelNumber data-content={String(level)}>{level}</LevelNumber>
          <LevelText>Lv.</LevelText>
        </LevelContent>
        <ProgressBar>
          <ProgressBarFill width={`${progress}%`} />
        </ProgressBar>
        <LevelNextNum>다음 레벨까지 {remainingCount}문항</LevelNextNum>
      </LevelRight>
    </LevelWrapper>
  );
};

export const LevelWrapper = styled.div`
  width: 456px;
  height: 224px;
  display: flex;
  align-items: center;
  border-radius: 24px;
  background: rgba(251, 253, 255, 0.8);
  box-shadow: 100px 100px 100px 0px rgba(0, 0, 0, 0.02), 0px 0px 100px 0px rgba(0, 80, 216, 0.08);
  backdrop-filter: blur(10px);
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
  width: 200px;
  height: 224px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding-left: 30px;
  border-radius: 24px;
  background: rgba(133, 178, 255, 0.4);
  backdrop-filter: blur(40px);
`;

export const LevelContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

export const LevelNumber = styled.div`
  color: #ffffff;
  font-size: 60px;
  font-weight: 900;
  line-height: 100%;
  letter-spacing: -2.4px;
  position: relative;
  z-index: 1;

  &::before {
    content: attr(data-content);
    position: absolute;
    z-index: -1;
    -webkit-text-stroke: 13px #3277ed;
  }
`;

export const LevelText = styled.div`
  color: var(--text-1700, #fff);
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
`;

export const LevelNextNum = styled.div`
  width: 131px;
  height: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: var(--brand-subtle, #c3daff);
  color: var(--brand-darker, #0050d8);
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.35px;
  margin-top: 8px;
`;

export const ProgressBar = styled.div`
  width: 130px;
  height: 10px;
  background: var(--brand-subtle, #c3daff);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 24px;
`;

export const ProgressBarFill = styled.div<ProgressBarFillProps>`
  width: ${props => props.width};
  height: 100%;
  background: var(--brand-darker, #c4f752);
  border-radius: 4px;
`;
