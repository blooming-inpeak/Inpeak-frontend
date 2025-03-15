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
          <LevelText>Lv.</LevelText>
          <LevelNumber data-content={String(level)}>{level}</LevelNumber>
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
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 40px 40px 40px 30px;
  border-radius: 0px 24px 24px 0px;
  background: rgba(133, 178, 255, 0.4);
  backdrop-filter: blur(40px);
`;

export const LevelContent = styled.div`
  width: 62px;
  height: 60px;
  display: flex;
  gap: 6px;
  align-items: flex-end;
  align-self: flex-end;
`;

export const LevelNumber = styled.div`
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

export const LevelNextNum = styled.div`
  display: flex;
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
  margin-top: 12px;
`;

export const ProgressBarFill = styled.div<ProgressBarFillProps>`
  width: ${props => props.width};
  height: 100%;
  background: var(--brand-darker, #c4f752);
  border-radius: 4px;
`;
