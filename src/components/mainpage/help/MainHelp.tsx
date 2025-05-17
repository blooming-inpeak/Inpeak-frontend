import styled from 'styled-components';

export const MainHelp = () => {
  return (
    <MainHelpWrapper>
      <MainHelpImg src="/images/mainpage/HelpImg.svg" alt="help image" />

      <MainHelpContent>
        <MainHelpTitle>사용중 불편함을 느끼셨나요?</MainHelpTitle>
        <MainHelpSubTitle>
          인픽은 언제나 더 나은 서비스를 위해 노력합니다. <br /> 서비스 개선을 위해 고객의 목소리를 들려주세요.
        </MainHelpSubTitle>
        <MainHelpButton onClick={() => (window.location.href = '/contact')}>접수하기</MainHelpButton>
      </MainHelpContent>
    </MainHelpWrapper>
  );
};

export const MainHelpWrapper = styled.div`
  width: 100%;
  height: 380px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #e6efff;
  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04);
  backdrop-filter: blur(10px);

  gap: 40px;
`;

export const MainHelpContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainHelpTitle = styled.div`
  color: #212121;

  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.12px;
  margin-bottom: 12px;
`;

export const MainHelpSubTitle = styled.div`
  color: #212121;

  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.45px;
  margin-bottom: 46px;
`;

export const MainHelpButton = styled.div`
  width: 123px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #c3daff;
  border-radius: 100px;

  color: #0050d8;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.4px;

  cursor: pointer;
`;

export const MainHelpImg = styled.img`
  width: 300px;
  height: 300px;
`;
