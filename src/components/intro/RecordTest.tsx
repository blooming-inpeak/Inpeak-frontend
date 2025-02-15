import styled from 'styled-components';

export const RecordTest = () => {
  return (
    <RecordTestWrapper>
      <RecordTestScreen></RecordTestScreen>
      <RecordTestDescription>녹화화면 미리보기</RecordTestDescription>
    </RecordTestWrapper>
  );
};

export const RecordTestWrapper = styled.div`
  width: 100%;
  height: 188px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  margin-bottom: 20px;
`;

export const RecordTestScreen = styled.div`
  width: 300px;
  height: 100%;
  border-radius: 12px;
  background-color: lightblue;
`;

export const RecordTestDescription = styled.div`
  color: #afafaf;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.25px;
`;
