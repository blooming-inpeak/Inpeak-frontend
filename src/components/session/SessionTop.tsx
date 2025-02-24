import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BlurBackground } from '../common/background/BlurBackground';
import { ExitInterview } from './ExitInterview';

interface Props {
  start: boolean;
  setStart: (check: boolean) => void;
}

export const SessionTop = ({ start, setStart }: Props) => {
  const [time, setTime] = useState(300);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (start) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(interval); // 타이머 종료
            setStart(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      setTime(300);
    }

    // 클린업 함수로 interval 해제
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [start]);

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
        <PassingTime style={{ width: `${((300 - time) / 300) * 100}%` }} />
      </SessionTimer>
      <SessionTime>{formatTime(time)}</SessionTime>
      {isClick && (
        <BlurBackground>
          <ExitInterview close={() => setIsClick(false)} />
        </BlurBackground>
      )}
    </SessionTopWrapper>
  );
};

export const SessionTopWrapper = styled.div`
  width: 578px;
  height: 24px;
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
