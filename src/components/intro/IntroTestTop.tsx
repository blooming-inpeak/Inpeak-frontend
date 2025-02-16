import { useEffect, useRef, useState } from 'react';
import { MicCheck } from './MicCheck';
import { MyStack } from './MyStack';
import { RecordCheck } from './RecordCheck';
import { RecordTest } from './RecordTest';
import styled from 'styled-components';

export const IntroTestTop = () => {
  const [isRecord, setIsRecord] = useState<boolean>(true);
  const [currentMic, setCurrentMic] = useState<string>('');
  const [micList, setMicList] = useState<MediaDeviceInfo[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null); // 스트림 상태 추가

  useEffect(() => {
    // 웹캠과 마이크 권한 요청
    const getDivices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log(devices);
      const audioDevices = devices.filter((device, index) => index !== 0 && device.kind === 'audioinput');
      setMicList(audioDevices);
    };

    const getMedia = async () => {
      try {
        let constraints: MediaStreamConstraints;

        if (isRecord) {
          // isRecord가 true일 때 비디오와 오디오 모두 활성화
          constraints = {
            video: true,
            audio: {
              deviceId: currentMic,
            },
          };
        } else {
          // isRecord가 false일 때 비디오를 비활성화하고 오디오만 활성화
          constraints = {
            video: false,
            audio: {
              deviceId: currentMic,
            },
          };
        }

        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        const audioTracks = newStream.getAudioTracks();
        console.log(audioTracks);

        if (audioTracks.length > 0) {
          // 사용중인 마이크의 lable 가져오기
          setCurrentMic(audioTracks[0].label);
        }

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

    getDivices();
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
    <IntroTestTopWrapper>
      <RecordTest isRecord={isRecord} videoRef={videoRef} />
      <MyStack />
      <RecordCheck Record={isRecord} setIsRecord={setIsRecord} />
      <MicCheck currentMic={currentMic} micList={micList} setCurrentMic={setCurrentMic} />
    </IntroTestTopWrapper>
  );
};

export const IntroTestTopWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
