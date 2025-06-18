import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  close: () => void;
  title: string;
  content: string;
  buttonConent: string;
}

export const ExitInterview = ({ close, title, content, buttonConent }: Props) => {
  const navigate = useNavigate();
  const stopInterview = () => {
    navigate('/interview');
  };

  return (
    <ExitInterviewWrapper>
      <CloseIcon src="/images/Close.svg" alt="close" onClick={close} />

      <ExitInterviewBody>
        <ExitInterviewDescription>
          <ExitInterviewTitle>{title}</ExitInterviewTitle>
          <ExitInterviewSubTitle>{content}</ExitInterviewSubTitle>
        </ExitInterviewDescription>

        <ExitInterviewButtons>
          <StopButton onClick={stopInterview}>{buttonConent}</StopButton>
          <ContinueButton onClick={close}>계속 연습하기</ContinueButton>
        </ExitInterviewButtons>
      </ExitInterviewBody>
    </ExitInterviewWrapper>
  );
};

export const ExitInterviewWrapper = styled.div`
  width: 402px;
  height: 139px;

  display: flex;
  flex-direction: column;

  padding: 24px 24px 40px 24px;
  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0px 0px 24px 0px rgba(50, 59, 84, 0.24);
`;

export const CloseIcon = styled.img`
  width: 24px;
  cursor: pointer;
  margin-bottom: 4px;
`;

export const ExitInterviewBody = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
`;

export const ExitInterviewDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ExitInterviewTitle = styled.div`
  color: #212121;

  font-size: 16px;
  font-weight: 600;
`;

export const ExitInterviewSubTitle = styled.div`
  color: #212121;

  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.35px;
`;

export const ExitInterviewButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const StopButton = styled.div`
  width: 100px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100px;
  background-color: #c3daff;

  color: #0050d8;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.35px;

  &:hover {
    background-color: #e6efff;
  }
  cursor: pointer;
`;

export const ContinueButton = styled.div`
  width: 126px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100px;
  background-color: #3277ed;

  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.35px;

  &:hover {
    background-color: #72a6ff;
  }

  cursor: pointer;
`;
