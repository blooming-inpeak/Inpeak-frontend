import styled from 'styled-components';

export const MicCheck = () => {
  return (
    <MicCheckWrapper>
      <MicCheckTitle>마이크 설정</MicCheckTitle>
    </MicCheckWrapper>
  );
};

export const MicCheckWrapper = styled.div`
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MicCheckTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.35px;
`;
