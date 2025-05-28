import styled from 'styled-components';
import { SessionTop } from '../../components/session/SessionTop';
import { SessionContent } from '../../components/session/SessionContent';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentMicState, isRecordingState } from '../../store/record/Record';
import { Toast } from '../../components/session/Toast';
import { QuestionsState } from '../../store/question/Question';
import { TimeState } from '../../store/time/Time';
import { useNavigate, useParams } from 'react-router-dom';
import { AnswerQuestion, getVideoUrl, uploadVideoToS3 } from '../../api/question/question';
import { ResultState } from '../../store/result/ResultState';
import { getFormattedDate } from '../../components/common/getFormattedDate';
import { LoadingModal } from '../../components/common/loading/LoadingModal';

export const SessionPage = () => {
  const [start, setStart] = useState(false);
  const [toasts, setToasts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRecording = useRecoilValue(isRecordingState);
  const currentMic = useRecoilValue(currentMicState);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const Questions = useRecoilValue(QuestionsState);
  const [time, setTime] = useRecoilState(TimeState);
  const setResult = useSetRecoilState(ResultState);
  const page = Questions.length;
  const { id } = useParams();
  const lastQuestion = page === currentPage;
  const navigate = useNavigate();

  // audioBlob 반환용 Promise
  const recordingPromiseRef = useRef<Promise<{ videoBlob: Blob; audioBlob: Blob }>>(null);
  let resolveRecordingPromise: (value: { videoBlob: Blob; audioBlob: Blob }) => void;

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

      const videoChunks: Blob[] = []; // 영상 데이터 저장 배열
      const audioChunks: Blob[] = []; // 오디오 데이터 저장 배열

      // 새로운 Promise 생성 후 Ref에 할당
      recordingPromiseRef.current = new Promise(resolve => {
        resolveRecordingPromise = resolve;
      });

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          videoChunks.push(event.data);
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // 영상, 오디오 Blob 생성 및 상태 업데이트
        const webmBlob = new Blob(videoChunks, { type: 'video/webm' });
        const webmAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });

        const wavBlob = await convertWebMBlobToWav(webmAudioBlob);
        // Promise resolve: 녹화 데이터 처리 완료
        resolveRecordingPromise({ videoBlob: webmBlob, audioBlob: wavBlob });
      };

      mediaRecorder.start();
    } catch (error) {
      console.log(error);
    }
  };

  // 녹화 종료 및 API 요청
  const stopRecording = async (elapsedTime?: number) => {
    const currentTime = elapsedTime ?? 180 - time;
    console.log('time: ', currentTime);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    // onstop 이벤트에서 데이터 처리가 완료될 때까지 대기
    const { videoBlob, audioBlob } = await recordingPromiseRef.current!;

    if (id) {
      let presignedUrl;
      if (videoBlob && isRecording) {
        const startDate = getFormattedDate();
        // presigned URL 발급
        presignedUrl = await getVideoUrl(startDate);
        // S3로 영상 업로드
        await uploadVideoToS3(videoBlob, presignedUrl.url);
      }

      // multipart/form-data 구성 및 전송
      console.log(currentTime, Questions[currentPage - 1].id, parseInt(id), presignedUrl);
      const formData = new FormData();
      formData.append('audioFile', audioBlob, 'audio.wav');
      formData.append('time', String(currentTime));
      formData.append('questionId', String(Questions[currentPage - 1].id));
      formData.append('interviewId', id);
      formData.append('videoURL', presignedUrl ? presignedUrl.url : presignedUrl);

      console.log(formData);

      const data = await AnswerQuestion(formData);
      console.log(data);

      const answerResult = {
        question: Questions[currentPage - 1].content,
        questionId: Questions[currentPage - 1].id,
        time: currentTime,
        interviewId: id,
        isAnswer: true,
        answerId: data.answerId,
      };

      setResult(prev => [...prev, answerResult]);

      // localStorage에 저장
      const prevStored = JSON.parse(localStorage.getItem('result') || '[]');
      const updatedStored = [...prevStored, answerResult];
      localStorage.setItem('result', JSON.stringify(updatedStored));
    }

    setTime(180);
    setIsSubmitting(false);

    if (lastQuestion) {
      navigate('/interview/progressresult');
    } else {
      setCurrentPage(prev => prev + 1);
      setStart(false);
    }
  };

  /**
   * AudioBuffer의 데이터를 WAV 파일 형식의 ArrayBuffer로 인코딩하는 함수
   */
  function encodeWAV(audioBuffer: AudioBuffer): ArrayBuffer {
    const channelData = audioBuffer.getChannelData(0); // 모노 채널 사용 (스테레오일 경우 병합 필요)
    const sampleRate = audioBuffer.sampleRate;
    const bufferLength = channelData.length * 2; // 16비트 PCM이므로 각 샘플마다 2바이트
    const buffer = new ArrayBuffer(44 + bufferLength); // WAV 헤더는 44바이트
    const view = new DataView(buffer);

    // 문자열을 DataView에 기록하는 헬퍼 함수
    function writeString(view: DataView, offset: number, str: string) {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    }

    let offset = 0;
    writeString(view, offset, 'RIFF');
    offset += 4;
    view.setUint32(offset, 36 + bufferLength, true);
    offset += 4;
    writeString(view, offset, 'WAVE');
    offset += 4;
    writeString(view, offset, 'fmt ');
    offset += 4;
    view.setUint32(offset, 16, true);
    offset += 4; // PCM 서브청크 크기
    view.setUint16(offset, 1, true);
    offset += 2; // 오디오 포맷 (1 = PCM)
    view.setUint16(offset, 1, true);
    offset += 2; // 채널 수 (모노)
    view.setUint32(offset, sampleRate, true);
    offset += 4;
    view.setUint32(offset, sampleRate * 2, true);
    offset += 4; // ByteRate = sampleRate * channels * bitsPerSample/8
    view.setUint16(offset, 2, true);
    offset += 2; // BlockAlign = channels * bitsPerSample/8
    view.setUint16(offset, 16, true);
    offset += 2; // Bits per sample
    writeString(view, offset, 'data');
    offset += 4;
    view.setUint32(offset, bufferLength, true);
    offset += 4;

    // PCM 샘플을 16비트 정수로 변환하여 기록
    for (let i = 0; i < channelData.length; i++) {
      let sample = channelData[i];
      // 샘플값을 -1 ~ 1 사이로 제한
      sample = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
    return buffer;
  }

  /**
   * WebM Blob(예: audio/webm; codecs=opus)을 받아서 WAV Blob으로 변환하는 함수
   */
  async function convertWebMBlobToWav(webmBlob: Blob): Promise<Blob> {
    // 1. Blob을 ArrayBuffer로 변환
    const arrayBuffer = await webmBlob.arrayBuffer();

    // 2. AudioContext 생성 및 ArrayBuffer 디코딩
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // 3. AudioBuffer를 WAV 형식의 ArrayBuffer로 인코딩
    const wavArrayBuffer = encodeWAV(audioBuffer);

    // 4. WAV ArrayBuffer를 Blob으로 변환
    return new Blob([wavArrayBuffer], { type: 'audio/wav' });
  }

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
    <>
      <SessionWrapper>
        <SessionBody>
          <SessionTop
            start={start}
            setStart={setStart}
            stopRecording={stopRecording}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
          <SessionContent
            start={start}
            currentPage={currentPage}
            page={page}
            startRecording={startRecording}
            stopRecording={stopRecording}
            nextPage={() => setCurrentPage(prev => prev + 1)}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
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

      {isSubmitting && <LoadingModal />}
    </>
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
