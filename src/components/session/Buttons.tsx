import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PassQuestion } from '../../api/question/question';

interface Props {
  start: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  nextPage: () => void;
  currentPage: number;
  lastQuestion: boolean;
}

export const Buttons = ({ start, startRecording, stopRecording, nextPage, currentPage, lastQuestion }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const onPassQuestion = async () => {
    if (id) {
      const data = await PassQuestion(String(currentPage), id);
      console.log(data);
      if (lastQuestion) {
        navigate('/interview/result');
      } else {
        nextPage();
      }
    }
  };
  return (
    <>
      {start ? (
        <>
          <StopButton onClick={stopRecording}>답변 끝내기</StopButton>
        </>
      ) : (
        <ButtonsWrapper>
          <SkipButton onClick={onPassQuestion}>잘 모르겠어요</SkipButton>
          <AnswerButton onClick={startRecording}>답변시작</AnswerButton>
        </ButtonsWrapper>
      )}
    </>
  );
};

export const StopButton = styled.div`
  width: 380px;
  height: 24px;
  padding: 10px 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.4px;

  background-color: #202a43;
  border-radius: 100px;
  margin-top: 45px;
  cursor: pointer;

  &:hover {
    background-color: #464f69;
  }
`;

export const ButtonsWrapper = styled.div`
  width: 432px;
  height: 44px;

  display: flex;
  cursor: pointer;

  margin-top: 45px;
`;

export const SkipButton = styled.div`
  width: 163px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100px 0 0 100px;
  border: 1px solid #202a43;
  background-color: #ffffff;

  color: #202a43;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.4px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const AnswerButton = styled.div`
  width: 267px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0 100px 100px 0;
  background-color: #202a43;

  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.4px;

  &:hover {
    background-color: #464f69;
  }
`;
