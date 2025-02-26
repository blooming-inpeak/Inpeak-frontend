import styled from 'styled-components';
import { CorrectAnswer } from '../components/interview/CorrectAnswer';
import { InterviewChance } from '../components/interview/InterviewChance';
import { Strict } from '../components/interview/Strict';
import { AskHistory } from '../components/interview/AskHistory';
import { useNavigate } from 'react-router-dom';

export const InterviewPage = () => {
  const naviagte = useNavigate();
  const onClickInterview = () => {
    naviagte('/interview/intro');
  };
  return (
    <InterviewWrapper>
      <InterviewTop>
        <CorrectAnswer />
        <InterviewTopContent>
          <InterviewChance />
          <InterviewButton>
            <div></div>
            <InterviewButtonTitle onClick={onClickInterview}>모의면접 연습하기</InterviewButtonTitle>
            <img src="/images/chevron/Chevron_right_white.svg" alt="chevron right" />
          </InterviewButton>
        </InterviewTopContent>
      </InterviewTop>

      <InterviewBottom>
        <InterviewBottomLeft>
          <Strict />
          <InterviewBottomAd></InterviewBottomAd>
        </InterviewBottomLeft>

        <AskHistory />
      </InterviewBottom>
    </InterviewWrapper>
  );
};

export const InterviewWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 1178px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 544px;
    z-index: -1;

    background-image: url('/images/Background.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const InterviewTop = styled.div`
  width: 1128px;
  display: flex;
  flex-direction: column;

  gap: 48px;
  margin-top: 40px;
`;

export const InterviewTopContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  gap: 12px;
`;

export const InterviewButton = styled.div`
  width: 200px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  border-radius: 100px;
  background-color: #327eed;
  cursor: pointer;
`;

export const InterviewButtonTitle = styled.div`
  color: #ffffff;

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
`;

export const InterviewBottomLeft = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
`;

export const InterviewBottomAd = styled.div`
  width: 456px;
  height: 258px;

  border-radius: 24px;
  border: 1px solid #ffffff;
  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04);
  backdrop-filter: blur(10px);

  background-color: yellow;
`;
