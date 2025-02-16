import styled from 'styled-components';

export const EmptyAskHistory = () => {
  return (
    <EmptyAskHistoryWrapper>
      <EmptyAskHistoryTitle>아직 진행된 면접이 없어요</EmptyAskHistoryTitle>
      <EmptyAskHistorySubTitle>모의면접 연습하고 히스토리를 쌓아나가 보세요!</EmptyAskHistorySubTitle>
    </EmptyAskHistoryWrapper>
  );
};

export const EmptyAskHistoryWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyAskHistoryTitle = styled.div`
  color: #9a9a9a;
  text-align: center;

  font-size: 20px;
  font-weight: 600;
`;

export const EmptyAskHistorySubTitle = styled.div`
  color: #9a9a9a;

  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.35px;
`;
