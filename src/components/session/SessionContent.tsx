import styled from 'styled-components';
import { BeforeVideo } from './BeforeVideo';
import { Buttons } from './Buttons';
import { currentMicState, isRecordingState } from '../../store/Record/Record';
import { useRecoilValue } from 'recoil';
import { useRef, useState } from 'react';
import { AnswerVideo } from './AnswerVideo';
import { useNavigate } from 'react-router-dom';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(3);
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

export const SessionContentWrapper = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 0 0 24px 24px;
  display: flex;
  flex-direction: column;
`;

export const SessionContentTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-top: 19.74px;
  padding: 0 16.13px;
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
`;

export const Record = styled.div<{ $isRecord: boolean }>`
  width: 22px;
  height: 18px;
  padding: 5px 3px;
  border-radius: 5px;
  background-color: ${({ $isRecord }) => ($isRecord ? '#f84883' : '#888')};
`;

export const RecordContent = styled.div<{ $isRecord: boolean }>`
  width: 22px;
  height: 18px;
  border: 1.7px solid #ffffff;
  box-sizing: border-box;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #ffffff;
  font-size: ${({ $isRecord }) => ($isRecord ? '11px' : '9px')};
  font-weight: 700;
  letter-spacing: ${({ $isRecord }) => ($isRecord ? '-0.275px' : '-0.225px')};
`;

export const SessionContentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 31px;
  width: 100%;
`;

export const QuestionBox = styled.div`
  width: 445px;
  min-height: 119px;
  padding: 24px 24px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ededed;
  border-radius: 20px;

  color: #212121;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.4px;
  text-align: center;

  position: relative;
`;

export const QuestionTail = styled.img`
  position: absolute;
  bottom: -35px;
  right: 100px;
`;
