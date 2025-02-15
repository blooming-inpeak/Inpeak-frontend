import styled from 'styled-components';

export const RecordCheck = () => {
  return (
    <RecordCheckWrapper>
      <RecordCheckTitle>모의면접 영상 녹화</RecordCheckTitle>
    </RecordCheckWrapper>
  );
};

export const RecordCheckWrapper = styled.div`
  width: 100%;
  padding: 12px 0;

  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ededed;
`;

export const RecordCheckTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.35px;
`;
