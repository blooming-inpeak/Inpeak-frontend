import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CorrectAnswer } from '../components/interview/CorrectAnswer';
import { InterviewChance } from '../components/interview/InterviewChance';
import { Level } from '../components/interview/Level';
import { AskHistory } from '../components/interview/AskHistory';
import BackgroundImage from '../assets/img/banner/footprint_1280.png';
import ResponsiveBackgroundImage from '../assets/img/banner/footprint_1024.png';
import AdImage from '../assets/img/LevelCharacter.svg';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer/Footer';
import GrayArrow from '../assets/img/RightArrowGray.svg';

import { fetchTodayInterviewSummary, InterviewSummaryResponse } from '../api/interview/interviewAPI';

export const InterviewPage = () => {
  const [summary, setSummary] = useState<InterviewSummaryResponse | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const data = await fetchTodayInterviewSummary(today);
        setSummary(data);
      } catch (error) {
        console.error('면접 요약 불러오기 실패:', error);
      }
    };

    loadData();
  }, []);

  const chance = summary?.remainingInterviews.count ?? 0;

  return (
    <>
      <InterviewWrapper>
        <InterviewTop>
          <div id="bannerTop">
            <CorrectAnswer
              cumulative={summary?.successRate.userSuccessRate ?? 0}
              average={summary?.successRate.averageSuccessRate ?? 0}
            />
            <InterviewChance chance={chance} />
          </div>
          <div id="bannerBottom">
            <div id="bannerBottomtext">
              <h2>기술면접 AI통해 피드백 받고</h2>
              <h1>취업까지 10발자국 다가가자</h1>
            </div>
            <InterviewButton to="/interview/intro" disabled={chance === 0}>
              <InterviewButtonTitle disabled={chance === 0}>모의면접 연습하기</InterviewButtonTitle>
              <img src={chance === 0 ? GrayArrow : '/images/chevron/Chevron_right_white.svg'} alt="chevron right" />
            </InterviewButton>
          </div>
        </InterviewTop>

        <InterviewBottom>
          <InterviewBottomLeft>
            <Level
              level={summary?.levelInfo.level ?? 1}
              progress={summary?.levelInfo.currentExp ?? 0}
              maxProgress={summary?.levelInfo.nextExp ?? 100}
            />
            <InterviewBottomAd>
              <InterviewBottomAdImage src={AdImage} alt="광고 이미지" />
            </InterviewBottomAd>
          </InterviewBottomLeft>
          <AskHistory />
        </InterviewBottom>
      </InterviewWrapper>
      <Footer />
    </>
  );
};

export const InterviewWrapper = styled.div`
  width: 100%;
  min-height: 1178px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 16px 0 16px;
  margin-top: -80px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
    height: calc(544px + 80px);
    z-index: -1;
    background-image: url(${BackgroundImage});
    background-position: center;
    background-size: cover;
  }

  @media (max-width: 768px) {
    &::before {
      background-image: url(${ResponsiveBackgroundImage});
    }
  }
`;

export const InterviewTop = styled.div`
  width: 100%;
  max-width: 1128px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  #bannerTop {
    display: flex;
    justify-content: space-between;

    width: 100%;
  }

  #bannerBottom {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 48px;
  }

  #bannerBottomtext {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  #bannerBottomtext h1,
  #bannerBottomtext h2 {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 40px;
    letter-spacing: -0.2px;
  }

  h2 {
    font-size: 24px;
    letter-spacing: -0.12px;
  }
`;

export const InterviewButton = styled(Link)<{ disabled?: boolean }>`
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  width: 352px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 100px;
  background-color: ${({ disabled }) => (disabled ? '#E6E6E6' : '#3277ed')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin-top: 12px;
  margin-bottom: 60px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#E6E6E6' : '#286fce')};
  }
`;

export const InterviewButtonTitle = styled.div<{ disabled?: boolean }>`
  color: ${({ disabled }) => (disabled ? '#707991' : '#ffffff')};
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.4px;
`;

export const InterviewBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 23px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const InterviewBottomLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const InterviewBottomAd = styled.div`
  width: 456px;
  height: 258px;
  border-radius: 24px;
  border: 1px solid #ffffff;
  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04);
  backdrop-filter: blur(10px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

export const InterviewBottomAdImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 24px;
  display: block;
  z-index: -1;
`;
