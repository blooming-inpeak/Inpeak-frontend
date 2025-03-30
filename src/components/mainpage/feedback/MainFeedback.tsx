import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import styled from 'styled-components';
import AIFeedbackAnimation from '../lottie/AIFeedbackAnimation.json';
import { useEffect, useRef } from 'react';

export const MainFeedback = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.3);
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            lottieRef.current?.play();
          } else {
            lottieRef.current?.stop();
          }
        });
      },
      {
        threshold: 0.6,
      },
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  });
  return (
    <FeedbackWrapper ref={containerRef}>
      <FeedbackContainer>
        <FeedbackContent>
          <FeedbackTitle>AI 피드백</FeedbackTitle>
          <FeedbackSubTitle>
            똑똑한 AI 면접관 인삑이에게 <br />
            피드백 받고 면접 실력 수직 상승 시키기
          </FeedbackSubTitle>
        </FeedbackContent>
        <FeedbackImg>
          <Lottie animationData={AIFeedbackAnimation} lottieRef={lottieRef} />
        </FeedbackImg>

        <FeedbackInpeak src="/images/mainpage/MainInpeak.svg" alt="main inpeak" />
      </FeedbackContainer>
    </FeedbackWrapper>
  );
};

export const FeedbackWrapper = styled.div`
  width: 100%;
  height: 800px;

  margin-bottom: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FeedbackContainer = styled.div`
  display: flex;
  position: relative;
  gap: 30px;
  z-index: 1;
`;

export const FeedbackContent = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  align-items: flex-end;
  justify-content: center;
`;

export const FeedbackTitle = styled.div`
  color: #0050d8;
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

export const FeedbackImg = styled.div`
  width: 643px;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
`;

export const FeedbackInpeak = styled.img`
  position: absolute;
  top: 378px;
  right: 46px;
`;
