import styled from 'styled-components';
import { CorrectAnswer } from '../components/interview/CorrectAnswer';

export const InterviewPage = () => {
  return (
    <InterviewWrapper>
      <InterviewTop>
        <CorrectAnswer />
      </InterviewTop>
    </InterviewWrapper>
  );
};

export const InterviewWrapper = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 544px;

    background-image: url('/images/Background.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const InterviewTop = styled.div`
  width: 1128px;
  display: flex;
  flex-direction: column;

  gap: 48px;
  margin-top: 102px;
`;
