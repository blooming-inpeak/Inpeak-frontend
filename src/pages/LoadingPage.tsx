import Lottie from 'lottie-react';
import styled from 'styled-components';
import loadingAnimationData from '../../public/images/loading/loading.json';
import { useEffect, useState } from 'react';

function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const DURATION = 500;
    const INTERVAL = 10;
    const STEP = 100 / (DURATION / INTERVAL);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + STEP;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!isVisible) return null;

  return (
    <Overlay style={{ opacity: progress >= 100 ? 0 : 1 }}>
      <Lottie
        animationData={loadingAnimationData}
        loop={true}
        autoplay={true}
        style={{ width: '203px', height: '200px' }}
      />
      <ProgressBarContainer>
        <ProgressBar style={{ width: `${progress}%` }} />
      </ProgressBarContainer>
    </Overlay>
  );
}

export default LoadingPage;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  justify-content: center;
  align-items: center;
  z-index: 999;
  gap: 42.5px;
  transition: opacity 0.5s ease-in-out;
`;

const ProgressBarContainer = styled.div`
  width: 470px;
  height: 10px;
  background: #ccc;
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  background: #85b2ff;
  height: 100%;
  transition: width 0.1s linear;
`;
