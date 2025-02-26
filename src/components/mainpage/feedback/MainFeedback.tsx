import styled from 'styled-components';

export const MainFeedback = () => {
  return (
    <FeedbackWrapper>
      <FeedbackContent>
        <FeedbackTitle>AI 피드백</FeedbackTitle>
        <FeedbackSubTitle>
          똑똑한 AI 인삑이에게 피드백 받고 <br /> 나의 면접 실력 수직 상승 시키기
        </FeedbackSubTitle>
      </FeedbackContent>

      <FeedbackImg src="/images/mainpage/MainFeedbackImg.svg" alt="feedback Img" />
      <FeedbackInpeak src="/images/mainpage/MainInpeak.svg" alt="main inpeak" />
    </FeedbackWrapper>
  );
};

export const FeedbackWrapper = styled.div`
  width: 100%;
  height: 800px;

  position: relative;
  margin-bottom: 24px;
  z-index: 1;
  gap: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FeedbackContent = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  align-items: flex-end;
  justify-content: center;
`;

export const FeedbackTitle = styled.div`
  color: #0050db;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.1px;
`;

export const FeedbackSubTitle = styled.div`
  color: #212121;
  font-size: 30px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.15px;

  text-align: right;
`;

export const FeedbackImg = styled.img`
  width: 643px;
  height: 400px;
`;

export const FeedbackInpeak = styled.img`
  position: absolute;
  top: 578px;
  right: 442px;
`;
