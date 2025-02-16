import { useState } from 'react';
import styled from 'styled-components';

interface RecordCheckToggleProps {
  isRecord: boolean;
}

export const RecordCheck = () => {
  const [isRecord, setIsRecord] = useState<boolean>(false);
  return (
    <RecordCheckWrapper>
      <RecordCheckTitle>모의면접 영상 녹화</RecordCheckTitle>
      <RecordCheckToggle isRecord={isRecord} onClick={() => setIsRecord(!isRecord)}>
        <img src="/images/ToggleButton.svg" alt="toggle Button" />
      </RecordCheckToggle>
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

export const RecordCheckToggle = styled.div<RecordCheckToggleProps>`
  width: 32px;
  height: 18px;
  padding: 2px;
  border-radius: 100px;
  box-shadow: 0px 2px 4px 0px rgba(0, 80, 216, 0.08) inset;

  background-color: ${props => (props.isRecord ? '#72A6FF' : '#e6efff')};
  position: relative;
  transition: all 0.3s ease-out;

  img {
    position: absolute;
    bottom: -4px;

    cursor: pointer;
    ${props => (props.isRecord ? 'right : -1px' : 'left: -1px')}
  }
`;
