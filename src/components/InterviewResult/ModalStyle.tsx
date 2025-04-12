import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 40px 60px 60px 60px;
  box-sizing: border-box;
  margin: auto;
  max-width: 829px;
  min-height: 300px;
  height: auto;
  max-height: 80vh;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;

  .date {
    color: #afafaf;
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
    border: 1px solid var(--text-500, #747474);
    background: var(--sementic-light-400, #fafafa);
    color: var(--text-500, #747474);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.3px;
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 21px;
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

  ${({ status }) =>
    status === 'SKIPPED'
      ? `color: #85C000; border-color: #85C000; background: #F8FFEA;`
      : status === 'CORRECT'
        ? `color: #0050D8; border-color: #0050D8; background: #F5F9FF;`
        : `color: #F84883; border-color: #F84883; background: #FFF3F4;`}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .question-content {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .question-mark {
    width: 42px;
    font-weight: bold;
    font-size: 28px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.14px;
  }

  .question {
    flex: 1;
    font-size: 20px;
    font-weight: 600;
    line-height: 150%;
    margin: 0;
  }
  .answer-content {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
  }

  .answer-mark {
    width: 42px;
    font-weight: bold;
    font-size: 28px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.14px;
  }

  .answer {
    flex: 1;
    margin: 0;
    color: var(--text-000, #000);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.4px;
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
    color: var(--text-500, #747474);
    font-family: 'Pretendard Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.3px;
  }

  .toggle-container {
    display: flex;
    align-items: center;
    gap: 7px;
    justify-content: flex-end;
  }

  .toggle-label {
    font-size: 12px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.3px;
  }
`;
export const ToggleContainer = styled.div`
  display: flex;
  gap: 7px;
  justify-content: flex-end;
`;
export const FeedbackBox = styled.div`
  padding: 30px 20px;
  border: 1px solid #e6efff;
  border-radius: 12px;
  margin-bottom: 20px;
  margin-left: 41px;
  margin-top: 16px;
  .feedback-title {
    color: #0050d8;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

export const MemoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const MemoToggle = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  margin-bottom: 20px;

  .memo-text {
    font-size: 14px;
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
`;

export const MemoBox = styled.textarea`
  width: calc(100% - 41px);
  min-height: 83px;
  height: auto;
  padding: 15px 20px;
  border-radius: 12px;
  border: 1px solid #e6efff;
  box-sizing: border-box;
  margin-top: 8px;
  margin-left: 41px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  resize: none;
  overflow-y: hidden;
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Button = styled.button`
  width: 100px;
  height: 36px;
  border: none;
  border-radius: 100px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
  &.prev {
    background: #c3daff;
    color: #0050d8;
  }

  &.next {
    background: #3277ed;
    color: #ffffff;
  }
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
