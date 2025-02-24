import styled from 'styled-components';
import { IntroDescription } from '../../components/intro/IntroDescription';
import { IntroTestTop } from '../../components/intro/IntroTestTop';
import { useNavigate } from 'react-router-dom';

export const IntroPage = () => {
  const navigate = useNavigate();
  const onClickStart = () => {
    navigate('/interview/session');
  };
  return (
    <IntroWrapper>
      <IntroBody>
        <IntroDescription />

        <IntroTest>
          <IntroTestTop />
          <IntroTestBottom>
            <IntroStartButton onClick={onClickStart}>시작하기</IntroStartButton>
          </IntroTestBottom>
        </IntroTest>
      </IntroBody>
    </IntroWrapper>
  );
};

export const IntroWrapper = styled.div`
  width: 100%;
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

export const IntroTest = styled.div`
  width: 100%;
  height: 484px;
  padding: 40px 45px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const IntroTestBottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const IntroStartButton = styled.div`
  width: 71px;
  height: 24px;
  cursor: pointer;

  padding: 10px 26px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #202a43;

  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.4px;
`;
