import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useToast } from './useToast';

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <ToastWrapper>
      {toasts.map(toast => (
        <ToastItem key={toast.id} $isLeaving={toast.isLeaving}>
          <ErrorIcon src={toast.icon} alt="에러" />
          <TextBox>
            <ToastTitle>{toast.title}</ToastTitle>
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </TextBox>
        </ToastItem>
      ))}
    </ToastWrapper>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0);}
  to { opacity: 0; transform: translateY(20px);}
`;

const ToastWrapper = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ToastItem = styled.div<{ $isLeaving?: boolean }>`
  ${({ theme }) => theme.typography.body3M};
  min-width: 276px;
  height: 83px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.sementic.dark200};
  color: ${({ theme }) => theme.colors.white};
  animation: ${({ $isLeaving }) => ($isLeaving ? fadeOut : fadeIn)} 0.35s ease-in-out;
  animation-fill-mode: forwards;
  box-shadow:
    0px 24px 24px rgba(0, 0, 0, 0.04),
    0px 0px 100px rgba(0, 80, 216, 0.16);
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 12px 20px 12px 14px;
`;
const ErrorIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  flex-shrink: 0;
`;

const TextBox = styled.div`
  min-height: 59px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
`;

const ToastTitle = styled.div`
  ${({ theme }) => theme.typography.body2M};
  color: ${({ theme }) => theme.colors.sementic.light400};
`;

const ToastDescription = styled.div`
  ${({ theme }) => theme.typography.body4R};
  color: ${({ theme }) => theme.colors.sementic.light400};
`;
