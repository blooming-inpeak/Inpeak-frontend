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
import { getAnswerDetail } from '../../api/apiService';
import { InterviewIdState } from '../../store/Interview/InterviewId';
import { QuestionsState } from '../../store/question/Question';
import { GetAnswerDetailResponse, AnswerStatus } from '../../api/types';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';

export const InterviewResult = () => {
  const interviewId = useRecoilValue(InterviewIdState);
  const questions = useRecoilValue(QuestionsState);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerData, setAnswerData] = useState<GetAnswerDetailResponse | null>(null);
  const [, setIsLoading] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const formatKoreanDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return dayjs(dateStr).format('YYYY년 MM월 DD일');
  };

  const isCorrect = answerData?.answerStatus === 'CORRECT';
  const getStatusLabel = (status: AnswerStatus): string => {
    switch (status) {
      case 'CORRECT':
        return '정답';
      case 'SKIPPED':
        return '포기';
      case 'INCORRECT':
        return '오답';
      default:
        return '';
    }
  };

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이 초기화
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // 스크롤 높이만큼 설정
    }
  };
  useEffect(() => {
    const fetchAnswer = async () => {
      if (!interviewId || !questions.length) return;

      setIsLoading(true);
      try {
        const questionId = questions[currentIndex].id;
        const data = await getAnswerDetail({ interviewId, questionId });
        setAnswerData(data);
      } catch (err) {
        console.error('답변 요청 실패', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnswer();
  }, [interviewId, questions, currentIndex]);
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
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
  if (!answerData) {
    return <div>로딩 중...</div>;
  }
  return (
    <ModalContainer>
      {/* 헤더: 날짜 및 이미지 */}
      <ModalHeader>
        <span className="date">{formatKoreanDate(answerData.dateTime)}</span>
        {isCorrect && isChecked && <span className="understood-badge">이해 완료</span>}

        <StatusBadge status={answerData.answerStatus}>{getStatusLabel(answerData.answerStatus)}</StatusBadge>
      </ModalHeader>

      {/* 질문,답변 영역 */}
      <Wrapper>
        <div className="question-content">
          <span className="question-mark">Q{currentIndex + 1}</span>
          <p className="question">{answerData.questionContent}</p>
        </div>
        {answerData.answerStatus !== 'SKIPPED' && (
          <div className="answer-content">
            <span className="answer-mark">A</span>
            <p className="answer">{answerData.userAnswer}</p>
            {answerData.videoUrl && (
              <div className="video-container">
                <video width="168" height="95" controls>
                  <source src={answerData.videoUrl} type="video/mp4" />
                </video>
                <span className="video-time">{answerData.runningTime}s</span>
              </div>
            )}
          </div>
        )}
      </Wrapper>
      <ToggleContainer>
        <label className="toggle-label" style={{ color: isCorrect ? '#212121' : '#AFAFAF' }}>
          이 질문은 완벽히 이해함
        </label>
        <ToggleSwitch isChecked={isChecked} onClick={handleToggle} disabled={!isCorrect} />
      </ToggleContainer>

      {/* 피드백 박스 */}
      <FeedbackBox>
        <span className="feedback-title">{answerData.comment}</span>
        <p className="feedback-content">{answerData.AIAnswer}</p>
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
        <Button className="prev" onClick={handlePrev} disabled={currentIndex === 0}>
          이전으로
        </Button>
        <Button className="next" onClick={handleNext} disabled={currentIndex === questions.length - 1}>
          다음으로
        </Button>
      </Navigation>
    </ModalContainer>
  );
};
