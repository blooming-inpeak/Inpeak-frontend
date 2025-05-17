import Lottie from 'lottie-react';
import loadingAnimationData from '../../../../public/images/loading/loading.json';
import styled from 'styled-components';

export const LoadingModal = () => {
  return (
    <Overlay>
      <Lottie
        animationData={loadingAnimationData}
        loop={true}
        autoplay={true}
        style={{ width: '203px', height: '200px' }}
      />
      <ProgressBarContainer>
        <ProgressBar />
      </ProgressBarContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 999;
  gap: 42.5px;
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
  animation: progressAnimation 10s linear forwards;

  @keyframes progressAnimation {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
`;
