import React, { Dispatch, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BlurBackground } from '../common/background/BlurBackground';
import { ExitInterview } from './ExitInterview';
import { useRecoilState } from 'recoil';
import { TimeState } from '../../store/time/Time';

interface Props {
  start: boolean;
  setStart: (check: boolean) => void;
  stopRecording: (time?: number) => Promise<void>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<React.SetStateAction<boolean>>;
}

export const SessionTop = ({ start, setStart, stopRecording, isSubmitting, setIsSubmitting }: Props) => {
  const [time, setTime] = useRecoilState(TimeState);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (start && !isSubmitting) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(interval); // 타이머 종료
            setIsSubmitting(true);
            setStart(false);
            (async () => {
              await stopRecording(180);
            })();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // 클린업 함수로 interval 해제
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [start, isSubmitting]);

  // 시간 포맷팅 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <SessionTopWrapper>
      <img
        src="/images/Close_white.svg"
        alt="Close white"
        style={{ cursor: 'pointer' }}
        onClick={() => setIsClick(true)}
      />
      <SessionTimer>
        <PassingTime style={{ width: `${((180 - time) / 180) * 100}%` }} />
      </SessionTimer>
      <SessionTime>{formatTime(time)}</SessionTime>
      {isClick && (
        <BlurBackground>
          <ExitInterview
            close={() => setIsClick(false)}
            title="정말 모의면접 연습을 중단하실 건가요?"
            content="중단시 사용한 면접 기회는 복구되지 않습니다."
            buttonConent="중단하기"
          />
        </BlurBackground>
      )}
    </SessionTopWrapper>
  );
};

export const SessionTopWrapper = styled.div`
  width: 600px;
  height: 48px;
  padding: 12px 10px 12px 12px;

  border-radius: 24px 24px 0 0;
  background-color: #323b54;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
`;

export const SessionTimer = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 100px;
  background-color: #202a43;

  overflow: hidden;
`;

export const PassingTime = styled.div`
  height: 100%;
  background-color: #85b2ff;
`;

export const SessionTime = styled.div`
  width: 80px;
  display: flex;
  align-content: center;
  justify-content: center;

  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.4px;
`;
