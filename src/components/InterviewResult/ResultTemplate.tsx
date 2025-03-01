import { useState, useEffect, useRef } from 'react';
import {
  ModalContainer,
  ModalHeader,
  QuestionWrapper,
  FeedbackBox,
  MemoToggle,
  Navigation,
  Button,
  StatusBadge,
  MemoBox,
  MemoWrapper,
} from '../../components/InterviewResult/ModalStyle';

interface ResultTemplateProps {
  status: '정답' | '오답';
}

export const ResultTemplate = ({ status }: ResultTemplateProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    if (isMemoOpen && textareaRef.current) {
      handleResizeHeight();
    }
  }, [isMemoOpen]);

  return (
    <ModalContainer>
      {/* 헤더 */}
      <ModalHeader>
        <span className="date">2025년 2월 13일</span>
        <StatusBadge status={status}>{status === '정답' ? '정답' : '오답'}</StatusBadge>
      </ModalHeader>

      {/* 질문 영역 */}
      <QuestionWrapper>
        <div className="question-content">
          <span className="question-mark">Q</span>
          <p className="question">사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠어요?</p>
        </div>
        <div className="toggle-container">
          <label className="toggle-label">이 질문은 완벽히 이해함</label>
          <div
            className={`toggle-switch ${isChecked ? 'toggle--checked' : ''}`}
            onClick={() => setIsChecked(!isChecked)}
          >
            <div className="slider"></div>
          </div>
        </div>
      </QuestionWrapper>

      {/* 피드백 박스 */}
      <FeedbackBox>
        <span className="feedback-title">이렇게 말해보세요!</span>
        <p className="feedback-content">
          예를 들어, 이전 프로젝트에서는 A라는 문제를 정의하고 사용자 테스트를 통해 B 솔루션을 도출했습니다. 결과적으로
          사용자 만족도가 C% 향상되었습니다. 귀하의 답변은 사용자 중심 디자인에 대한 핵심 원칙과 접근 방식을 잘 설명하고
          있습니다. 그러나 면접 답변으로는 약간 더 구체적이고 차별화된 요소를 포함하면 더 강렬한 인상을 남길 수
          있습니다. 아래는 피드백과 개선 제안입니다.
        </p>
      </FeedbackBox>

      {/* 메모 토글 */}
      <MemoWrapper>
        <MemoToggle onClick={() => setIsMemoOpen(!isMemoOpen)}>
          <span className="memo-text" style={{ color: isMemoOpen ? '#212121' : '#747474' }}>
            {isMemoOpen ? '메모 접기' : '메모 펼치기'}
          </span>
          <img className={`memo-toggle ${isMemoOpen ? 'open' : ''}`} src="/images/memo_toggle.svg" alt="메모 토글" />
        </MemoToggle>
      </MemoWrapper>

      {isMemoOpen && <MemoBox ref={textareaRef} placeholder="메모를 작성하세요..." onInput={handleResizeHeight} />}

      {/* 네비게이션 버튼 */}
      <Navigation>
        <Button className="prev">이전으로</Button>
        <Button className="next">다음으로</Button>
      </Navigation>
    </ModalContainer>
  );
};
