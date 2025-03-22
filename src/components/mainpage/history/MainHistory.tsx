import styled from 'styled-components';
import historyAnimation from '../lottie/historyAnimation.json';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef } from 'react';

export const MainHistory = () => {
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
    <MainHistoryWrapper ref={containerRef}>
      <MainHistoryImg>
        <Lottie animationData={historyAnimation} lottieRef={lottieRef} />
      </MainHistoryImg>

      <MainHistoryContent>
        <MainHistoryTitle>히스토리 모아보기</MainHistoryTitle>
        <MainHistorySubTitle>
          지난 모의면접 결과를 모아
          <br />
          보고 분석까지 한번에
        </MainHistorySubTitle>
      </MainHistoryContent>
    </MainHistoryWrapper>
  );
};

export const MainHistoryWrapper = styled.div`
  width: 100%;
  height: 800px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 30px;
  z-index: 1;

  margin-bottom: 100px;
`;

export const MainHistoryImg = styled.div`
  width: 780px;
  height: 461px;

  border-radius: 12px;
  box-shadow: 0px 0px 32px 0px rgba(0, 80, 216, 0.04), 0px 16px 8px 0px rgba(50, 59, 84, 0.08);

  overflow: hidden;
`;

export const MainHistoryContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 12px;
`;

export const MainHistoryTitle = styled.div`
  color: #0050d8;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.1px;
`;

export const MainHistorySubTitle = styled.div`
  color: #212121;
  font-size: 30px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.15px;
`;
