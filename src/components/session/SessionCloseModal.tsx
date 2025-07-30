import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useOutsideClick } from '../../utils/useOutsideClick';
import { BlurBackground } from '../common/background/BlurBackground';
import { CommonButton } from '../common/button/CommonButton';

interface Props {
  onClose: () => void;
}

export const SessionCloseModal: React.FC<Props> = ({ onClose }) => {
  const modalRef = useOutsideClick<HTMLDivElement>(() => onClose?.());
  const navigate = useNavigate();
  const handleConfirm = () => {
    onClose();
    navigate('/history');
  };

  return (
    <BlurBackground>
      <ModalContainer ref={modalRef}>
        <ModalContent>
          <Title>히스토리 페이지에서 다시 확인할 수 있어요</Title>
          <Description>
            진행한 면접 내역은 히스토리 페이지에서, 피드백 받은 형태로
            <br />
            확인할 수 있어요.
          </Description>
        </ModalContent>
        <CommonButton width={76} height={36} onClick={handleConfirm}>
          확인
        </CommonButton>
      </ModalContainer>
    </BlurBackground>
  );
};

const ModalContainer = styled.div`
  width: 450px;
  height: 218px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 24px;
  text-align: left;
`;

const ModalContent = styled.div`
  width: 320px;
  height: 70px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.title3}
  color: ${({ theme }) => theme.colors.text100};
  margin-bottom: 4px;
`;

const Description = styled.div`
  ${({ theme }) => theme.typography.body3R}
  color: ${({ theme }) => theme.colors.text100};
  margin-bottom: 20px;
`;
