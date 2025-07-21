import Lottie from 'lottie-react';

import loadingAnimationData from '../../public/images/loading/loading.json';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Loading() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const DURATION = 13000;
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
    <Container>
      <Lottie
        animationData={loadingAnimationData}
        loop={true}
        autoplay={true}
        style={{ width: '120px', height: '120px', paddingTop: '109px' }}
      />
      <MainText>잠시만 기다려주세요</MainText>
      <SubText>인픽이가 열심히 답변을 분석하고 있어요</SubText>
    </Container>
  );
}
const Container = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainText = styled.div`
  font-size: 20px;
  margin-top: 16px;
  text-align: center;
  font-weight: 600;
  color: #888;
`;

const SubText = styled.div`
  font-size: 14px;
  margin-top: 4px;
  text-align: center;
  color: #888;
`;
export default Loading;
