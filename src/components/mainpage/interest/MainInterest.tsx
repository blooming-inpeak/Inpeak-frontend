import Lottie from 'lottie-react';
import styled from 'styled-components';
import interestAnmation from '../lottie/interestAnimation.json';

export const MainInterest = () => {
  return (
    <MainInterestWrapper>
      <MainInterestCard>
        <Lottie animationData={interestAnmation} />
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
