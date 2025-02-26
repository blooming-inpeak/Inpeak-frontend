import styled from 'styled-components';

export const NoRecord = () => {
  return <NoRecordWrapper>모의면접 영상녹화가 비활성화 되어있습니다.</NoRecordWrapper>;
};

export const NoRecordWrapper = styled.div`
  width: 300px;
  height: 169.055px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;

  color: #747474;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.3px;
`;
