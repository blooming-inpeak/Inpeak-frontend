import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import styled from 'styled-components';
import interestAnmation from '../lottie/interestAnimation.json';
import { useEffect, useRef } from 'react';

export const MainInterest = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);
  return (
    <MainInterestWrapper ref={containerRef}>
      <MainInterestCard>
        <Lottie animationData={interestAnmation} lottieRef={lottieRef} />
      </MainInterestCard>
    </MainInterestWrapper>
  );
};

export const MainInterestWrapper = styled.div`
  width: 100%;
  height: 800px;

  margin-bottom: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const MainInterestCard = styled.div`
  border-radius: 24px;
  height: 400px;
  background: rgba(255, 255, 255, 0.5);

  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04), 0px 0px 32px 0px rgba(0, 80, 216, 0.04),
    0px 16px 8px 0px rgba(50, 59, 84, 0.08);
  backdrop-filter: blur(10px);

  overflow: hidden;
`;
