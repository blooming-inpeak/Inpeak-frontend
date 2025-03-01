import { Ref } from 'react';
import styled from 'styled-components';
import { NoRecord } from './NoRecord';

export const RecordTest = ({ isRecord, videoRef }: { isRecord: boolean; videoRef: Ref<HTMLVideoElement | null> }) => {
  return (
    <RecordTestWrapper>
      <RecordTestScreen>
        {isRecord ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            width={'100%'}
            height={'100%'}
            style={{ objectFit: 'cover', transform: 'scaleX(-1)' }}
          />
        ) : (
          <NoRecord />
        )}
      </RecordTestScreen>
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
  overflow: hidden;
`;

export const RecordTestDescription = styled.div`
  color: #afafaf;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.25px;
`;
