import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface Props {
  onPassQuestion: () => void;
  setIsPassModal: Dispatch<SetStateAction<boolean>>;
}

export const PassModal = ({ onPassQuestion, setIsPassModal }: Props) => {
  return (
    <PassModalWrapper>
      <PassModalTop src={'/images/Close.svg'} alt="close 버튼" onClick={() => setIsPassModal(false)} />

      <PassModalBody>
        <PassModalTitle>정말 모의면접 연습을 중단하실 건가요?</PassModalTitle>
        <PassModalSubTitle>중단시 사용한 면접 기회는 복구되지 않습니다.</PassModalSubTitle>

        <PassModalButtons>
          <StopButton onClick={onPassQuestion}>중단하기</StopButton>
          <ContinueButton onClick={() => setIsPassModal(false)}>계속 연습하기</ContinueButton>
        </PassModalButtons>
      </PassModalBody>
    </PassModalWrapper>
  );
};

const PassModalWrapper = styled.div`
  width: 402px;
  height: 139px;
  padding: 24px 24px 40px 24px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  border-radius: 24px;
  background-color: white;
`;

const PassModalTop = styled.img`
  width: 24px;
  cursor: pointer;
`;

const PassModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PassModalTitle = styled.div`
  color: #212121;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const PassModalSubTitle = styled.div`
  color: #212121;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;
`;

const PassModalButtons = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const StopButton = styled.div`
  width: 100px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100px;
  background-color: #c3daff;

  color: #0050db;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.35px;

  cursor: pointer;
`;

const ContinueButton = styled.div`
  width: 126px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 100px;
  background-color: #3277ed;

  color: white;

  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.35px;

  cursor: pointer;
`;
