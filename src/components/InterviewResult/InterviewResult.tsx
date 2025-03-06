import { useEffect, useRef, useState } from 'react';

import {
  ModalContainer,
  ModalHeader,
  FeedbackBox,
  MemoToggle,
  Navigation,
  Button,
  StatusBadge,
  MemoBox,
  MemoWrapper,
  ToggleContainer,
  Wrapper,
} from '../../components/InterviewResult/ModalStyle';
import { ToggleSwitch } from '../common/ToggleSwitch';

export const InterviewResult = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [status] = useState('포기');
  const isCorrect = status == '정답';

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이 초기화
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // 스크롤 높이만큼 설정
    }
  };

  useEffect(() => {
    if (isMemoOpen && textareaRef.current) {
      handleResizeHeight(); // 메모가 열릴 때 높이 조정
    }
  }, [isMemoOpen]);

  const handleToggle = () => {
    if (!isCorrect) return;
    setIsChecked(prev => !prev);
  };

  const hasVideo = true;
  return (
    <ModalContainer>
      {/* 헤더: 날짜 및 이미지 */}
      <ModalHeader>
        <span className="date">2025년 2월 13일</span>
        {isCorrect && isChecked && <span className="understood-badge">이해 완료</span>}
        <StatusBadge status={status}>{status}</StatusBadge>
      </ModalHeader>

      {/* 질문,답변 영역 */}
      <Wrapper>
        <div className="question-content">
          <span className="question-mark">Q1</span>
          <p className="question">사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠어요?</p>
        </div>
        {status !== '포기' && (
          <div className="answer-content">
            <span className="answer-mark">A</span>
            <p className="answer">
              사용자 중심 디자인은 사용자의 요구와 목표를 깊이 이해하고 이를 제품에 반영하는 과정입니다. 제 접근 방식은
              다음과 같습니다. 먼저, 사용자 인터뷰와 데이터 분석으로 문제를 정의하고, 페르소나와 공감 지도를 통해 사용자
              관점을 구체화합니다. 이후 와이어프레임과 프로토타입을 제작해 사용자 테스트를 거치며, 피드백을 반영해
              디자인을 개선합니다. 마지막으로 데이터를 지속적으로 모니터링하며 최적화와 반복을 통해 사용자 가치를
              창출합니다. 저는 디자인이 단순히 문제 해결을 넘어, 감정적 연결과 긍정적 경험을 제공해야 한다고 믿습니다.
            </p>
            {hasVideo && (
              <div className="video-container">
                <video width="168" height="95" controls>
                  <source src="video.mp4" type="video/mp4" />
                  브라우저가 동영상을 지원하지 않습니다.
                </video>
                <span className="video-time">03h 45s</span>
              </div>
            )}
          </div>
        )}
      </Wrapper>
      <ToggleContainer>
        <label className="toggle-label" style={{ color: status === '정답' ? '#212121' : '#AFAFAF' }}>
          이 질문은 완벽히 이해함
        </label>
        <ToggleSwitch isChecked={isChecked} onClick={handleToggle} />
      </ToggleContainer>

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
