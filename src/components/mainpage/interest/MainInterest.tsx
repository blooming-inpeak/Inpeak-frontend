import styled from 'styled-components';

export const MainInterest = () => {
  return (
    <MainInterestWrapper>
      <MainInterestCard>
        <MainInterestTitle>관심분야 선택</MainInterestTitle>
        <MainInterestSubTitle>
          나의 관심분야에 맞는
          <br />
          맞춤형 질문으로 효율적이게
        </MainInterestSubTitle>

        <MainInterestImage src="/images/mainpage/MainInterest.svg" />
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
  width: 620px;
  height: 352px;
  padding: 24px 40px;

  border-radius: 24px;
  background: rgba(255, 255, 255, 0.5);

  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04), 0px 0px 32px 0px rgba(0, 80, 216, 0.04),
    0px 16px 8px 0px rgba(50, 59, 84, 0.08);
  backdrop-filter: blur(10px);

  overflow: hidden;
  position: relative;
`;

export const MainInterestTitle = styled.div`
  color: #0050d8;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.1px;

  margin-bottom: 4px;
`;

export const MainInterestSubTitle = styled.div`
  color: #212121;
  font-size: 30px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.15px;
`;

export const MainInterestImage = styled.img`
  position: absolute;
  top: 56px;
  left: 181.85px;
`;
