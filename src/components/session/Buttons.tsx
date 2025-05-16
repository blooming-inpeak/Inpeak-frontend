import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PassQuestion } from '../../api/question/question';
import { useRecoilState, useRecoilValue } from 'recoil';
import { QuestionsState } from '../../store/question/Question';
import { ResultState } from '../../store/result/ResultState';
import { Dispatch, useState } from 'react';

interface Props {
  start: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  nextPage: () => void;
  currentPage: number;
  lastQuestion: boolean;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<React.SetStateAction<boolean>>;
}

export const Buttons = ({
  start,
  startRecording,
  stopRecording,
  nextPage,
  currentPage,
  lastQuestion,
  isSubmitting,
  setIsSubmitting,
}: Props) => {
  const navigate = useNavigate();
  const [ishover, setIsHover] = useState(false);
  const Question = useRecoilValue(QuestionsState);
  const [result, setResult] = useRecoilState(ResultState);
  const { id } = useParams();

  // 잘 모르겠어요
  const onPassQuestion = async () => {
    if (id) {
      const data = await PassQuestion(String(Question[currentPage - 1].id), id);
      setResult(prev => [
        ...prev,
        { question: Question[currentPage - 1].content, time: 0, isAnswer: false, answerId: data.answerId },
      ]);
      console.log(data);
      if (lastQuestion) {
        localStorage.setItem('result', JSON.stringify(result));
        navigate('/interview/progressresult');
      } else {
        nextPage();
      }
    }
  };

  const handleStopClick = async () => {
    setIsSubmitting(true);
    await stopRecording();
  };

  return (
    <>
      {start || isSubmitting ? (
        <>
          <StopButton onClick={!isSubmitting ? handleStopClick : undefined} disabled={isSubmitting}>
            답변 끝내기
          </StopButton>
        </>
      ) : (
        <ButtonsWrapper>
          {ishover && (
            <SkipButtonModal>
              '잘 모르겠어요' 클릭시 <br />
              포기한 질문으로 표시됩니다.
            </SkipButtonModal>
          )}
          <SkipButton
            onClick={onPassQuestion}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            잘 모르겠어요
          </SkipButton>
          <AnswerButton onClick={startRecording}>답변시작</AnswerButton>
        </ButtonsWrapper>
      )}
    </>
  );
};

export const StopButton = styled.div<{ disabled: boolean }>`
  width: 380px;
  height: 24px;
  padding: 10px 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ disabled }) => (disabled ? 'black' : '#ffffff')};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.4px;

  background-color: ${({ disabled }) => (disabled ? '#E6E6E6' : '#202A43')};
  border-radius: 100px;
  margin-top: 45px;
  cursor: pointer;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '' : '#464f69')};
  }
`;

export const ButtonsWrapper = styled.div`
  width: 432px;
  height: 44px;

  display: flex;
  position: relative;
  cursor: pointer;

  margin-top: 45px;
`;

export const SkipButton = styled.div`
  width: 165px;
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
  height: 24px;
  padding: 10px 26px;

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

export const SkipButtonModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 133px;
  height: 36px;
  padding: 10px 20px;

  border-radius: 12px;
  background-color: #1463e8;

  color: white;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.3px;

  position: absolute;
  top: -75px;
  left: -20px;

  &::after {
    position: absolute;
    content: '';
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 15px 10px 0 10px;
    border-style: solid;
    border-color: #1463e8 transparent transparent transparent;
  }
`;
