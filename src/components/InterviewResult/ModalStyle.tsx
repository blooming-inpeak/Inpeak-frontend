import styled from 'styled-components';

export const ModalContainer = styled.div<{ isInterviewPage?: boolean }>`
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 40px 60px 60px 60px;
  box-sizing: border-box;
  margin: auto;
  max-width: 829px;
  min-height: 300px;
  height: auto;
  max-height: 85vh;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ isInterviewPage }) =>
    isInterviewPage &&
    `box-shadow: 
      100px 100px 100px 0px rgba(0, 0, 0, 0.02),
      2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
      0px 0px 100px 0px rgba(0, 80, 216, 0.08);`}
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  gap: 6px;

  .date {
    color: ${({ theme }) => theme.colors.text800};
    font-size: 14px;
    font-weight: 600;
    line-height: 150%;
  }

  img {
    width: 40px;
    height: 40px;
  }
  .understood-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    height: 18px;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    margin-left: 6px;
    padding: 0 4px;
    font-size: 12px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.3px;
    border: 1px solid ${({ theme }) => theme.colors.text500};
    background: ${({ theme }) => theme.colors.sementic.light400};
    color: ${({ theme }) => theme.colors.text500};
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.3px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .question-content {
    display: flex;

    gap: 10px;
    margin-bottom: 20px;
  }

  .question-mark {
    min-width: 42px;
    ${({ theme }) => theme.typography.head4}
  }

  .question {
    flex: 1;
    margin: 0;
    display: flex;
    align-items: center;
    ${({ theme }) => theme.typography.title1}
  }
  .answer-content {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
  }

  .answer-mark {
    width: 42px;
    ${({ theme }) => theme.typography.head4}
  }

  .answer {
    flex: 1;
    margin: 0;
    color: ${({ theme }) => theme.colors.text000};
    ${({ theme }) => theme.typography.body2R}
  }
  .video-container {
    width: 168px;
    height: auto;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 8px;
  }
  .video-container video {
    border-radius: 4px;
  }
  .video-time {
    width: 100%;
    text-align: right; /* 맨 오른쪽 정렬 */
    color: ${({ theme }) => theme.colors.text500};
    ${({ theme }) => theme.typography.body4R}
  }
`;
export const ToggleContainer = styled.div`
  display: flex;
  gap: 7px;
  justify-content: flex-end;
  align-items: center;
  .toggle-label {
    ${({ theme }) => theme.typography.body4M}
    color: ${({ theme }) => theme.colors.text100};
  }
`;
export const FeedbackBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px 20px;
  border: 1px solid ${({ theme }) => theme.colors.blue1400};
  border-radius: 12px;
  margin-bottom: 16px;
  margin-left: 41px;
  margin-top: 16px;
  .feedback-title {
    color: ${({ theme }) => theme.colors.brand.darker};
    ${({ theme }) => theme.typography.title2}
  }
  .feedback-content {
    ${({ theme }) => theme.typography.body2R}
  }
`;

export const MemoWrapper = styled.div<{
  isOpen: boolean;
  $isAfterInterview?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${({ isOpen, $isAfterInterview }) => {
    if (isOpen) return $isAfterInterview ? '40px' : '0px';
    return $isAfterInterview ? '84px' : '44px';
  }};
`;

export const MemoToggle = styled.div`
  display: flex;
  width: 76px;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  align-self: flex-end;
  .memo-text {
    color: ${({ theme }) => theme.colors.text500};
    ${({ theme }) => theme.typography.caption1}
    transition: color 0.3s ease;
  }

  .memo-toggle {
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  .memo-toggle.open {
    transform: rotate(-180deg);
  }
  img {
    width: 18px;
    height: 18px;
  }
`;

export const MemoBox = styled.textarea`
  width: calc(100% - 41px);
  min-height: 83px;
  height: auto;
  padding: 15px 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.blue1400};
  box-sizing: border-box;
  margin-top: 8px;
  margin-left: 41px;
  resize: none;
  overflow-y: hidden;
  color: ${({ theme }) => theme.colors.text000};
  ${({ theme }) => theme.typography.body3R}
  &::placeholder {
    color: ${({ theme }) => theme.colors.text800};
  }
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  .question-index {
    display: flex;
    flex: 1;
    text-align: center;
    ${({ theme }) => theme.typography.body3R}
    color: ${({ theme }) => theme.colors.text800};
    .current {
      color: ${({ theme }) => theme.colors.blue300};
    }
  }
`;

export const ButtonGroup = styled.div<{ position: 'left' | 'right' }>`
  display: flex;
  ${({ position }) => (position === 'left' ? 'justify-content: flex-start;' : 'justify-content: flex-end;')}
  width: 100%;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;
export const BackButton = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;
