import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import styled from 'styled-components';
import interviewAnimation from '../lottie/interviewAnimation.json';
import { useEffect, useRef, useState } from 'react';

export const MainInterview = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [showImage, setShowImage] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5);
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 스클로 진입: 이미지 숨기고 열림 애니메이션 실행
            setShowImage(false);
            setIsClosing(false);

            lottieRef.current?.setDirection(1);
            lottieRef.current?.play();
          } else {
            // 스크롤 아웃: 닫히는 애니메이션 실행
            setIsClosing(true);

            lottieRef.current?.setDirection(-1);
            lottieRef.current?.play();
          }
        });
      },
      {
        threshold: 0.8, // 요소기 50% 보일 때 트리거
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
  }, []);

  const handleComplete = () => {
    if (isClosing) {
      setShowImage(true);
      setIsClosing(false);
    }
  };
  return (
    <MainInterviewWrapper ref={containerRef}>
      {showImage ? (
        <img src="/images/mainpage/MainInterviewImg.svg" alt="mainInterview img" />
      ) : (
        <Lottie animationData={interviewAnimation} lottieRef={lottieRef} loop={false} onComplete={handleComplete} />
      )}

      <MainInterviewContent>
        <MainInterviewTitle>모의면접 연습하기</MainInterviewTitle>
        <MainInterviewSubTitle>
          늘어나는 모의면접 연습 한만큼 <br />
          제대로 익히는 실전 감각
        </MainInterviewSubTitle>
      </MainInterviewContent>
    </MainInterviewWrapper>
  );
};

export const MainInterviewWrapper = styled.div`
  width: 100%;
  height: 800px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;

  margin-bottom: 24px;

  background: linear-gradient(
      180deg,
      var(--sementic-dark-400, rgba(112, 121, 145, 0.3)) 0%,
      rgba(112, 121, 145, 0) 100%
    ),
    var(--sementic-dark-100, #202a43);
  z-index: 1;
`;

export const MainInterviewImage = styled.img`
  width: 400px;
  height: 281px;
`;

export const MainInterviewContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 12px;
`;

export const MainInterviewTitle = styled.div`
  color: #c3daff;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.1px;
  line-height: 200%;
`;

export const MainInterviewSubTitle = styled.div`
  color: #ffffff;
  font-size: 30px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.15px;
`;
