import styled from 'styled-components';
import { IntroDescription } from '../../components/intro/IntroDescription';

export const IntroPage = () => {
  return (
    <IntroWrapper>
      <IntroBody>
        <IntroDescription />
      </IntroBody>
    </IntroWrapper>
  );
};

export const IntroWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IntroBody = styled.div`
  width: 698px;
  height: 563px;

  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 100px 100px 100px 0px rgba(0, 0, 0, 0.02), 2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 100px 0px rgba(0, 80, 216, 0.08);

  display: flex;
`;
