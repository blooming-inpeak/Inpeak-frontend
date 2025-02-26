import { useState } from 'react';
import styled from 'styled-components';
import { BlurBackground } from '../common/background/BlurBackground';
import { ExitInterview } from './ExitInterview';

export const SessionTop = () => {
  const [isClick, setIsClick] = useState(false);
  return (
    <SessionTopWrapper>
      <img
        src="/images/Close_white.svg"
        alt="Close white"
        style={{ cursor: 'pointer' }}
        onClick={() => setIsClick(true)}
      />
      <SessionTimer />
      <SessionTime>5m 00s</SessionTime>
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
