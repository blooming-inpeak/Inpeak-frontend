import styled from 'styled-components';
import { SessionTop } from '../../components/session/SessionTop';
import { SessionContent } from '../../components/session/SessionContent';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isRecordingState } from '../../store/Record/Record';
import { Toast } from '../../components/session/Toast';

export const SessionPage = () => {
  const [start, setStart] = useState(false);
  // const [toast, setToast] = useState(false);
  const [toasts, setToasts] = useState<string[]>([]);
  const isRecording = useRecoilValue(isRecordingState);

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
        <SessionTop start={start} setStart={setStart} />
        <SessionContent start={start} setStart={setStart} />
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
