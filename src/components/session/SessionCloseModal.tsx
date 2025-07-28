import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useOutsideClick } from '../../utils/useOutsideClick';

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
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <Title>히스토리 페이지에서 다시 확인할 수 있어요</Title>
        <Description>
          진행한 면접 내역은 히스토리 페이지에서, 피드백 받은 형태로
          <br />
          확인할 수 있어요.
        </Description>
        <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 52px 65px;
  text-align: left;
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

const ConfirmButton = styled.button`
  width: 76px;
  height: 36px;
  border-radius: 100px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.brand.main};
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    background-color: ${({ theme }) => theme.colors.blue800};
  }
  margin: 0 auto;
  display: block;
  ${({ theme }) => theme.typography.button2}
`;
