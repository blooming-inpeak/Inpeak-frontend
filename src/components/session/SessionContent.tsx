import { BeforeVideo } from './BeforeVideo';
import { Buttons } from './Buttons';
import { currentMicState, isRecordingState } from '../../store/Record/Record';
import { useRecoilValue } from 'recoil';
import { useRef, useState } from 'react';
import { AnswerVideo } from './AnswerVideo';
import { useNavigate } from 'react-router-dom';
import {
  QuestionBox,
  QuestionTail,
  Record,
  RecordContent,
  SessionContentBody,
  SessionContentNumber,
  SessionContentTop,
  SessionContentWrapper,
} from './SessionContentStyle';

interface Props {
  start: boolean;
  setStart: (check: boolean) => void;
}

export const SessionContent = ({ start, setStart }: Props) => {
  const isRecording = useRecoilValue(isRecordingState);
  const currentMic = useRecoilValue(currentMicState);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null); //녹화된 Blob 저장
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // 녹음된 Blob 저장
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(10);
  const lastQuestion = page === currentPage;

  const navigate = useNavigate();

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

      const videoChunks: Blob[] = []; // 녹화된 데이터 저장할 배열
      const audioChunks: Blob[] = []; // 녹음 데이터 저장할 배열

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          videoChunks.push(event.data); // 영상 데이터
          if (event.data.type.startsWith('audio')) {
            audioChunks.push(event.data); // 오디오 데이터
          }
        }
      };

      mediaRecorder.onstop = async () => {
        // Blob 형식으로 백엔드로 전송
        const webmBlob = new Blob(videoChunks, { type: 'video/webm' }); //WebM 형식으로 저장
        setVideoBlob(webmBlob);

        // Blob을 Base64로 변환
        const wavBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(wavBlob);

        if (wavBlob) {
          const audioBase64 = await ConvertBlobToBase64(wavBlob);
          console.log(audioBase64);
        }
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

    if (lastQuestion) {
      navigate('/interview/result');
    } else {
      setCurrentPage(currentPage + 1);
      setStart(false);
    }
  };

  // Blob을 Base64 문자열로 변환
  const ConvertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        if (reader.result) resolve(reader.result.toString().split(',')[1]);
        else reject('Failed to convert Blob to Base64');
      };
    });
  };

  return (
    <SessionContentWrapper>
      <SessionContentTop>
        <SessionContentNumber>
          {currentPage}/{page}
        </SessionContentNumber>

        {start && (
          <Record $isRecord={isRecording}>
            <RecordContent $isRecord={isRecording}>{isRecording ? 'ON' : 'OFF'}</RecordContent>
          </Record>
        )}
      </SessionContentTop>

      <SessionContentBody>
        <QuestionBox>
          사용자 중심 디자인에 대한 김인픽님의 접근 방식을 설명해 주시겠어요?
          <QuestionTail src="/images/QuestionTail.svg" alt="questionTail" />
        </QuestionBox>

        {start ? <AnswerVideo /> : <BeforeVideo />}

        <Buttons
          start={start}
          startRecording={startRecording}
          stopRecording={stopRecording}
          nextPage={() => setCurrentPage(currentPage + 1)}
          lastQuestion={lastQuestion}
        />
      </SessionContentBody>
    </SessionContentWrapper>
  );
};
