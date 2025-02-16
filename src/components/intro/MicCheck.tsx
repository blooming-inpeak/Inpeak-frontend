import { useState } from 'react';
import styled from 'styled-components';
import { MicList } from './MicList';
import { BlurBackground } from '../common/background/BlurBackground';
import { MicTest } from './MicTest';

interface Props {
  currentMic: string | null;
  setCurrentMic: (mic: string) => void;
  micList: MediaDeviceInfo[];
}

export const MicCheck = ({ currentMic, micList, setCurrentMic }: Props) => {
  const [isClick, setIsClick] = useState(false);
  const [micTest, setMicTest] = useState(false);
  return (
    <MicCheckWrapper>
      <MicCheckTitle>마이크 설정</MicCheckTitle>
      <MicSelectContent>
        <MicSelect>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: '  4px 6px 4px 10px',
            }}
          >
            <MicName> {currentMic} </MicName>
            <img
              src={isClick ? '/images/chevron/Chevron_up_blue.svg' : '/images/chevron/Chevron_bottom_blue.svg'}
              alt="chevron bottom"
              style={{ cursor: 'pointer', width: '16px', height: '16px' }}
              onClick={() => setIsClick(!isClick)}
            />
          </div>
          <div>
            {isClick &&
              micList.map(mic => (
                <MicList name={mic.label} setCurrentMic={setCurrentMic} isClose={() => setIsClick(false)} />
              ))}
          </div>
        </MicSelect>

        <MicSelectButton onClick={() => setMicTest(true)}>마이크 테스트</MicSelectButton>
        {micTest && (
          <BlurBackground>
            <MicTest />
          </BlurBackground>
        )}
      </MicSelectContent>
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

export const MicSelectContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const MicSelect = styled.div`
  width: 236px;
  height: auto;

  display: flex;
  flex-direction: column;

  border: 1px solid #3277ed;
  border-radius: 4px;
  background-color: #fbfdff;

  overflow: hidden;
`;

export const MicName = styled.div`
  overflow-x: hidden;
  width: 220px;
  color: #3277ed;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.3px;
`;
export const MicSelectButton = styled.div`
  width: 80px;
  height: 24px;
  padding: 2px 10px;

  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3277ed;

  color: white;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.3px;

  cursor: pointer;
`;
