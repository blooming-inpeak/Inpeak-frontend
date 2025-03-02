import styled from 'styled-components';
import { MainIntroTop } from './MainIntroTop';
import { MainIntroBody } from './MainIntroBody';

export const MainIntro = () => {
  return (
    <MainIntroWrapper>
      <MainIntroTop />
      <MainIntroBody />
    </MainIntroWrapper>
  );
};

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
