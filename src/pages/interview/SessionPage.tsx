import styled from 'styled-components';
import { SessionTop } from '../../components/session/SessionTop';
import { SessionContent } from '../../components/session/SessionContent';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentMicState, isRecordingState } from '../../store/record/Record';
import { Toast } from '../../components/session/Toast';
import { QuestionsState } from '../../store/question/Question';
import { TimeState } from '../../store/time/Time';
import { useNavigate, useParams } from 'react-router-dom';
import { getFormattedDate } from '../../components/common/\bgetFormattedDate';
import { AnswerQuestion, getVideoUrl, uploadVideoToS3 } from '../../api/question/question';

export const SessionPage = () => {
  const [start, setStart] = useState(false);
  const [toasts, setToasts] = useState<string[]>([]);
  const isRecording = useRecoilValue(isRecordingState);
  const currentMic = useRecoilValue(currentMicState);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null); //녹화된 Blob 저장
  const [audioBase64, setAudioBase64] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const Questions = useRecoilValue(QuestionsState);
  const time = useRecoilValue(TimeState);
  const page = Questions.length;
  const { id } = useParams();
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
        // setAudioBlob(wavBlob);

        if (wavBlob) {
          const audioBase64 = await ConvertBlobToBase64(wavBlob);
          setAudioBase64(audioBase64);
          console.log(audioBase64);
        }
      };

      mediaRecorder.start();
    } catch (error) {
      console.log(error);
    }
  };

  // 답변 끝내기
  const stopRecording = async () => {
    console.log(300 - time);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (videoBlob && id) {
      const startDate = getFormattedDate();
      // presigned url 발급
      const presignedUrl = await getVideoUrl(startDate);
      // S3로 영상 올리기
      await uploadVideoToS3(videoBlob, presignedUrl);
      // 답변 완료 api
      const data = await AnswerQuestion(
        audioBase64,
        300 - time,
        Questions[currentPage - 1].id,
        parseInt(id),
        presignedUrl,
      );
      console.log(data);
    }
    console.log('스탑');

    if (lastQuestion) {
      navigate('/interview/result');
    } else {
      setCurrentPage(prev => prev + 1);
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

  useEffect(() => {
    if (start) {
      if (isRecording) {
        setToasts(['화면 녹화가 진행중입니다.', 'AI가 당신의 대답을 듣고 있습니다.']);
      } else {
        setToasts(['AI가 당신의 대답을 듣고 있습니다.']);
      }
    }
    return () => {
      setToasts([]);
    };
  }, [isRecording, start]);

  return (
    <SessionWrapper>
      <SessionBody>
        <SessionTop start={start} setStart={setStart} stopRecording={stopRecording} />
        <SessionContent
          start={start}
          currentPage={currentPage}
          page={page}
          startRecording={startRecording}
          stopRecording={stopRecording}
          nextPage={() => setCurrentPage(prev => prev + 1)}
        />
      </SessionBody>

      {toasts && (
        <InterviewToastWrapper>
          {toasts.map((message, index) => (
            <Toast key={index} index={index} message={message} moveUp={index === 0 && toasts.length === 2} />
          ))}
        </InterviewToastWrapper>
      )}
    </SessionWrapper>
  );
};

export const SessionWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SessionBody = styled.div`
  width: 600px;
  min-height: 600px;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  box-shadow: 100px 100px 100px 0px rgba(0, 0, 0, 0.02), 2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 100px 0px rgba(0, 80, 216, 0.08);
`;

export const InterviewToastWrapper = styled.div``;
