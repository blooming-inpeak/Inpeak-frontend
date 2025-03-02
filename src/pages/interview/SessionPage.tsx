import styled from 'styled-components';
import { SessionTop } from '../../components/session/SessionTop';
import { SessionContent } from '../../components/session/SessionContent';
import { useState } from 'react';

export const SessionPage = () => {
  const [start, setStart] = useState(false);
  return (
    <SessionWrapper>
      <SessionBody>
        <SessionTop start={start} setStart={setStart} />
        <SessionContent start={start} setStart={setStart} />
      </SessionBody>
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
