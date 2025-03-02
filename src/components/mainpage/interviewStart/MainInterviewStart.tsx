import styled from 'styled-components';

export const MainInterviewStart = () => {
  return (
    <MainInterviewStartWrapper>
      <MainInterviewStartContainer>
        <MainInterviewStartContent>
          기술면접 AI통해 피드백 받고
          <br />
          취업까지 10발자국 다가가자
        </MainInterviewStartContent>

        <StartButton>
          <StartButtonText>모의면접 바로시작</StartButtonText>
          <StartButtonImg src="/images/chevron/Chevron_right_white.svg" alt="chevron right" />
        </StartButton>
      </MainInterviewStartContainer>
    </MainInterviewStartWrapper>
  );
};

export const MainInterviewStartWrapper = styled.div`
  width: 100%;
  height: 200px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffffff;

  gap: 67.5px;
`;

export const MainInterviewStartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 1080px;
  padding: 0 24px;
`;

export const MainInterviewStartContent = styled.div`
  color: #212121;
  text-align: right;

  font-size: 24px;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.12px;
`;

export const StartButton = styled.div`
  width: 352px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #3277ed;
  border-radius: 100px;

  gap: 4px;
  cursor: pointer;
`;

export const StartButtonText = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.4px;
`;

export const StartButtonImg = styled.img``;
