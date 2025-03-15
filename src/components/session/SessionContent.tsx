import styled from 'styled-components';
import { BeforeVideo } from './BeforeVideo';
import { Buttons } from './Buttons';
import { currentMicState, isRecordingState } from '../../store/Record/Record';
import { useRecoilValue } from 'recoil';
import { useRef, useState } from 'react';
import { AnswerVideo } from './AnswerVideo';

interface Props {
  start: boolean;
  setStart: (check: boolean) => void;
}

export const SessionContent = ({ start, setStart }: Props) => {
  const isRecording = useRecoilValue(isRecordingState);
  const currentMic = useRecoilValue(currentMicState);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>(''); //녹화된 영상 URL 저장
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null); //녹화된 Blob 저장

  // 녹화 시작
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isRecording,
        audio: {
          deviceId: currentMic,
        },
      });

      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setStart(true);

      const chunks: Blob[] = []; // 녹화된 데이터 저장할 배열

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' }); //WebM 형식으로 저장
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setVideoBlob(blob);
        console.log(url);
      };

      mediaRecorder.start();
    } catch (error) {
      console.log(error);
    }
  };

  // 녹화 중지
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setStart(false);

    console.log(videoUrl);
    console.log(videoBlob);
  };

  return (
    <SessionContentWrapper>
      <SessionContentNumber>1/3</SessionContentNumber>
      <SessionContentBody>
        <SessionContentAsk>
          <BackgroundImage src="/images/Comment.svg" alt="comment" />
          <SessionQuestion>사용자 중심 디자인에 대한 김인픽님의 접근 방식을 설명해 주시겠어요?</SessionQuestion>
        </SessionContentAsk>

        {start ? <AnswerVideo /> : <BeforeVideo />}

        <Buttons start={start} startRecording={startRecording} stopRecording={stopRecording} />
      </SessionContentBody>
    </SessionContentWrapper>
  );
};

export const SessionContentWrapper = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 0 0 24px 24px;
  display: flex;
  flex-direction: column;
`;

export const SessionContentNumber = styled.div`
  width: 32.3px;
  height: 32.3px;

  border-radius: 8px;
  border: 1px solid #e6e6e6;
  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #707991;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.35px;

  margin-top: 19.74px;
  margin-left: 16.13px;
`;

export const SessionContentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 31px;
  width: 100%;
`;

export const SessionContentAsk = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* 내부 요소 배치용 */
`;

export const BackgroundImage = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* 배경처럼 뒤로 보내기 */
`;

export const SessionQuestion = styled.p`
  padding: 24px;
  text-align: center;
  position: relative; /* 텍스트가 이미지 위에 오도록 설정 */
`;
