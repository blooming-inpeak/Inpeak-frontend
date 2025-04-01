import React, { useEffect, useRef, useState } from 'react';
import { MicCheck } from './MicCheck';
import { MyStack } from './MyStack';
import { RecordCheck } from './RecordCheck';
import { RecordTest } from './RecordTest';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { currentMicState, isRecordingState } from '../../store/record/Record';

export const IntroTestTop = () => {
  const [isRecord, setIsRecord] = useRecoilState(isRecordingState);
  const [currentMic, setCurrentMic] = useRecoilState(currentMicState);
  const [micList, setMicList] = useState<MediaDeviceInfo[]>([]);
  const [volume, setVolume] = useState(1); //볼륨 상태 (0~1)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // 연결된 마이크 장치 리스트
    const getDivices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter((device, index) => index !== 0 && device.kind === 'audioinput');
      setMicList(audioDevices);
    };

    // 웹캠과 마이크 권한 요청
    const getMedia = async () => {
      try {
        const constraints: MediaStreamConstraints = {
          video: isRecord as boolean,
          audio: {
            deviceId: currentMic || undefined,
          },
        };

        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = newStream;

        const audioTracks = newStream.getAudioTracks();

        if (audioTracks.length > 0 && !currentMic) {
          // 사용중인 마이크의 lable 가져오기
          setCurrentMic(audioTracks[0].label);
        }

        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }

        // 기존 오디오 컨텍스트 종료 후 새로 설정
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(newStream);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = volume;
        gainNodeRef.current = gainNode;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 128;
        analyserRef.current = analyser;

        source.connect(gainNode);
        gainNode.connect(analyser);
      } catch (error) {
        console.log(error);
      }
    };

    getDivices();
    getMedia();

    // 컴포넌트가 언마운트될 때 스트림을 종료
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isRecord, currentMic]);

  // 볼륨이 바뀔 때 gainNode에 반영
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  // 볼륨 조절 핸들러
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume;
    }
  };

  return (
    <IntroTestTopWrapper>
      <RecordTest isRecord={isRecord} videoRef={videoRef} />
      <MyStack />
      <RecordCheck Record={isRecord} setIsRecord={setIsRecord} />
      <MicCheck
        currentMic={currentMic}
        micList={micList}
        setCurrentMic={setCurrentMic}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        analyser={analyserRef.current}
        setVolume={setVolume}
      />
    </IntroTestTopWrapper>
  );
};

export const IntroTestTopWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
