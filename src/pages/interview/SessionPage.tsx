import styled from 'styled-components';
import { SessionTop } from '../../components/session/SessionTop';
import { SessionContent } from '../../components/session/SessionContent';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isRecordingState } from '../../store/Record/Record';

export const SessionPage = () => {
  const [start, setStart] = useState(false);
  const [toast, setToast] = useState(false);
  const isRecording = useRecoilValue(isRecordingState);

  useEffect(() => {
    if (start) {
      setToast(true);
      const timer = setTimeout(() => {
        setToast(false);
      }, 2000);

      // 컴포넌트가 언마운트될 떄 타이머를 클리어하여 메모리 누수 방지
      return () => clearTimeout(timer);
    }
  }, [start]);

  return (
    <SessionWrapper>
      <SessionBody>
        <SessionTop start={start} setStart={setStart} />
        <SessionContent start={start} setStart={setStart} />
      </SessionBody>

      {toast && (
        <InterviewToastWrapper>
          {isRecording && <InterviewToast>화면 녹화가 진행중입니다.</InterviewToast>}
          <InterviewToast>AI가 당신의 대답을 듣고 있습니다.</InterviewToast>
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
  height: 600px;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  box-shadow: 100px 100px 100px 0px rgba(0, 0, 0, 0.02), 2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 100px 0px rgba(0, 80, 216, 0.08);
`;

export const InterviewToastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  position: absolute;
  left: 24px;
  bottom: 24px;
`;

export const InterviewToast = styled.div`
  padding: 12px 20px;

  border-radius: 12px;
  background-color: #323b54;
  box-shadow: 0px 24px 24px 0px rgba(0, 0, 0, 0.04), 0px 0px 100px 0px rgba(0, 80, 216, 0.16);

  color: #fafafa;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.3px;
`;
