import styled from 'styled-components';
import { MainIntroTop } from './MainIntroTop';
import { MainIntroBody } from './MainIntroBody';

import mainTopAnimation from '../lottie/mainTopAnimation.json';
import { useEffect, useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

export const MainIntro = () => {
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
        threshold: 0.5,
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
    <MainIntroWrapper ref={containerRef}>
      <MainIntroTop />
      <MainIntroBody />
      <MainTopLottie>
        <Lottie animationData={mainTopAnimation} lottieRef={lottieRef} />
      </MainTopLottie>
    </MainIntroWrapper>
  );
};
// vanilla extract
// emotion css prop
export const MainIntroWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-bottom: 40px;
  gap: 300px;

  z-index: 1;

  background: radial-gradient(
    46.88% 18.3% at 50% 31.71%,
    rgba(133, 178, 255, 0.8) 0%,
    rgba(183, 209, 253, 0.03) 93.5%,
    rgba(195, 218, 255, 0) 100%
  );
`;
export const MainTopLottie = styled.div`
  position: absolute;
  top: 15px;
`;
