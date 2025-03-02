import styled from 'styled-components';

export const MainHistory = () => {
  return (
    <MainHistoryWrapper>
      <MainHistoryImg src="/images/mainpage/MainHistoryImg.svg" alt="main History" />

      <MainHistoryContent>
        <MainHistoryTitle>히스토리 모아보기</MainHistoryTitle>
        <MainHistorySubTitle>
          지난 모의면접 결과를 모아
          <br />
          보고 분석까지 한번에
        </MainHistorySubTitle>
      </MainHistoryContent>
    </MainHistoryWrapper>
  );
};

export const MainHistoryWrapper = styled.div`
  width: 100%;
  height: 800px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 30px;
  z-index: 1;

  margin-bottom: 100px;
`;

export const MainHistoryImg = styled.img`
  width: 780px;
  height: 461px;
`;

export const MainHistoryContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 12px;
`;

export const MainHistoryTitle = styled.div`
  color: #0050d8;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.1px;
`;

export const MainHistorySubTitle = styled.div`
  color: #212121;
  font-size: 30px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.15px;
`;
