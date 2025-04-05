import React from 'react';
import styled from 'styled-components';
import LevelModalClose from '../../../assets/img/LevelModalClose.svg';
import LevelImage from '../../../assets/img/LevelExplanation.svg';

interface Props {
  onClose: () => void;
}

export const LevelModal: React.FC<Props> = ({ onClose }) => {
  return (
    <Overlay>
      <ModalWrapper>
        <CloseButton onClick={onClose}>
          <img src={LevelModalClose} alt="닫기" />
        </CloseButton>
        <Image src={LevelImage} alt="레벨 설명 이미지" />
        <TextBox>
          <ul>
            <li>본 서비스는 0레벨(0 XP)부터 10레벨(1350 XP)까지의 경험치 기반 레벨링 시스템을 적용합니다.</li>
            <li>정답을 맞출 경우 10점 및 해당 점수에 비례한 경험치가 부여됩니다.</li>
            <li>오답을 제출할 경우 5점 및 해당 점수에 비례한 경험치가 부여됩니다.</li>
            <li>포기(답변 미제출) 시 점수 및 경험치가 부여되지 않습니다.</li>
            <li>최대 레벨 10 도달 이후에는 경험치가 누적됩니다.</li>
          </ul>
        </TextBox>
      </ModalWrapper>
    </Overlay>
  );
};

export default LevelModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  display: flex;
  width: 500px;
  height: 340.59px;
  padding: 24px;
  flex-direction: column;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0px 0px 24px 0px rgba(50, 59, 84, 0.24);
  position: relative;
  box-sizing: border-box;
`;

const CloseButton = styled.button`
  cursor: pointer;
`;

const Image = styled.img`
  width: 400px;
  height: 157px;
  align-self: center;
  padding-top: 12px;
  box-sizing: border-box;
`;

const TextBox = styled.div`
  margin-top: 20px;
  ul {
    padding-left: 12px;
    margin: 0;
  }

  li {
    color: var(--text-100, #212121);
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.25px;
  }
`;
