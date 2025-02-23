import styled from 'styled-components';

interface Props {
  start: boolean;
  startRecording: () => void;
  stopRecording: () => void;
}

export const Buttons = ({ start, startRecording, stopRecording }: Props) => {
  return (
    <>
      {start ? (
        <>
          <StopButton onClick={stopRecording}>답변 끝내기</StopButton>
        </>
      ) : (
        <ButtonsWrapper>
          <SkipButton>잘 모르겠어요</SkipButton>
          <AnswerButton onClick={startRecording}>답변시작</AnswerButton>
        </ButtonsWrapper>
      )}
    </>
  );
};

export const StopButton = styled.div`
  width: 291px;
  height: 44px;
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
`;
