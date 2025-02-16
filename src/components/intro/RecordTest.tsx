import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const RecordTest = ({ isRecord }: { isRecord: boolean }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null); // 스트림 상태 추가

  useEffect(() => {
    // 웹캠과 마이크 권한 요청
    const getMedia = async () => {
      try {
        let constraints: MediaStreamConstraints;

        if (isRecord) {
          // isRecord가 true일 때 비디오와 오디오 모두 활성화
          constraints = {
            video: true,
            audio: true,
          };
        } else {
          // isRecord가 false일 때 비디오를 비활성화하고 오디오만 활성화
          constraints = {
            video: false,
            audio: true,
          };
        }

        const newStream = await navigator.mediaDevices.getUserMedia(constraints);

        // 기존 스트림이 있으면 중지하고 새로운 스트림 설정
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }

        setStream(newStream);
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMedia();

    // 컴포넌트가 언마운트될 때 스트림을 종료
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isRecord]);
  return (
    <RecordTestWrapper>
      <RecordTestScreen>
        {isRecord && (
          <video
            ref={videoRef}
            autoPlay
            muted
            width={'100%'}
            height={'100%'}
            style={{ objectFit: 'cover', transform: 'scaleX(-1)' }}
          />
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
