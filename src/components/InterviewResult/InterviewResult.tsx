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
  CloseButton,
} from '../../components/InterviewResult/ModalStyle';
import { ToggleSwitch } from '../common/ToggleSwitch';
import {
  getAnswerDetail,
  getAnswerDetailById,
  updateAnswerComment,
  updateAnswerUnderstood,
} from '../../api/apiService';
import { GetAnswerDetailResponse, AnswerStatus } from '../../api/types';
import { useRecoilValue } from 'recoil';
import { ResultState } from '../../store/result/ResultState';
import { QuestionsState } from '../../store/question/Question';
import { InterviewIdState } from '../../store/Interview/InterviewId';

import dayjs from 'dayjs';

interface InterviewResultProps {
  // 히스토리 모달 전용
  answerId?: number;
  initialAnswerData?: GetAnswerDetailResponse;
  // 면접 직후 전용
  interviewId?: number | null;
  questions?: { id: number }[];
  showQuestionIndex?: boolean;
  currentIndex?: number;
  onClose?: () => void;
}

export const InterviewResult = ({
  answerId,
  interviewId = 0,
  questions = [],
  onClose,

  showQuestionIndex,
  currentIndex = 0,
}: InterviewResultProps) => {
  const [, setIsLoading] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [memo, setMemo] = useState(''); // 메모 상태 추가
  const memoTimeoutRef = useRef<number | null>(null);

  const resultData = useRecoilValue(ResultState);
  const interviewIdState = useRecoilValue(InterviewIdState);
  const questionsState = useRecoilValue(QuestionsState);
  const [currentIndexState, setCurrentIndexState] = useState(currentIndex);

  const [answerData, setAnswerData] = useState<GetAnswerDetailResponse | null>(null);
  const answerIdForRequest = answerId ?? resultData?.[currentIndexState]?.answerId;
  const interviewIdForRequest = interviewId ?? interviewIdState;
  const questionsForRequest = questions.length > 0 ? questions : questionsState;

  const formatRunningTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const hour = h > 0 ? `${h.toString().padStart(2, '0')}:` : '';
    const minute = `${m.toString().padStart(2, '0')}:`;
    const second = s.toString().padStart(2, '0');

    return `${hour}${minute}${second}`;
  };

  useEffect(() => {
    if (showQuestionIndex) {
      setCurrentIndexState(currentIndex);
    }
  }, [currentIndex, showQuestionIndex]);

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
  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMemo(value);
    handleResizeHeight();

    if (memoTimeoutRef.current) clearTimeout(memoTimeoutRef.current);

    memoTimeoutRef.current = window.setTimeout(() => {
      if (answerIdForRequest) {
        updateAnswerComment(Number(answerIdForRequest), value)
          .then(() => console.log('메모 저장 성공'))
          .catch(err => console.error('메모 저장 실패', err));
      }
    }, 5000);
  };

  useEffect(() => {
    const fetchAnswer = async () => {
      setIsLoading(true);
      try {
        if (answerIdForRequest) {
          // 히스토리 모달
          const data = await getAnswerDetailById(answerIdForRequest);
          setAnswerData(data);
        } else if (interviewIdForRequest && questionsForRequest.length) {
          // 면접 직후
          const questionId = questionsForRequest[currentIndexState].id;
          const data = await getAnswerDetail({ interviewId: interviewIdForRequest, questionId });
          setAnswerData(data);
        }
      } catch (err) {
        console.error('답변 조회 실패', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnswer();
  }, [answerIdForRequest, currentIndexState]);

  const handleNext = () => {
    if (currentIndexState < questions.length - 1) {
      setCurrentIndexState(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndexState > 0) {
      setCurrentIndexState(prev => prev - 1);
    }
  };
  useEffect(() => {
    if (answerData) {
      setIsChecked(answerData.isUnderstood); // 이해완료면 true, 아니면 false 초기값 셋팅
    }
  }, [answerData]);

  useEffect(() => {
    if (isMemoOpen && textareaRef.current) {
      handleResizeHeight(); // 메모가 열릴 때 높이 조정
    }
  }, [isMemoOpen]);
  // 메모 초기값 세팅
  useEffect(() => {
    if (answerData) {
      setIsChecked(answerData.isUnderstood); // 이해완료 상태 초기화
      setMemo(answerData.comment || '');
      // 메모 초기화
    }
  }, [answerData]);

  const handleToggle = () => {
    if (!isCorrect) return;

    const nextChecked = !isChecked;
    setIsChecked(nextChecked);

    if (answerData) {
      setAnswerData({
        ...answerData,
        isUnderstood: nextChecked,
      });
    }

    if (answerIdForRequest) {
      updateAnswerUnderstood(Number(answerIdForRequest), nextChecked)
        .then(() => console.log('이해완료 상태 업데이트 성공'))
        .catch(err => console.error('이해완료 상태 업데이트 실패', err));
    }
  };

  if (!answerData) {
    return <div>로딩 중...</div>;
  }
  return (
    <ModalContainer>
      <CloseButton onClick={onClose}>
        <img src="/images/Close.svg" alt="close" />
      </CloseButton>
      {/* 헤더: 날짜 및 이미지 */}
      <ModalHeader>
        <span className="date">{formatKoreanDate(answerData.dateTime)}</span>
        {(answerData.isUnderstood || isChecked) && <span className="understood-badge">이해 완료</span>}

        <StatusBadge status={answerData.answerStatus}>{getStatusLabel(answerData.answerStatus)}</StatusBadge>
      </ModalHeader>

      {/* 질문,답변 영역 */}
      <Wrapper>
        <div className="question-content">
          {showQuestionIndex ? (
            <span className="question-mark">Q{currentIndexState !== undefined ? currentIndexState + 1 : ''}</span>
          ) : (
            <span className="question-mark">Q</span>
          )}
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
                <span className="video-time">{formatRunningTime(answerData.runningTime)}</span>
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
        <span className="feedback-title">이렇게 말해보세요!</span>
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

      {isMemoOpen && (
        <MemoBox ref={textareaRef} placeholder="메모를 작성하세요..." value={memo} onChange={handleMemoChange} />
      )}

      {/* 네비게이션 버튼 */}
      <Navigation>
        {questions.length > 0 && (
          <>
            <Button className="prev" onClick={handlePrev} disabled={currentIndex === 0}>
              이전으로
            </Button>
            <Button className="next" onClick={handleNext} disabled={currentIndex === questions.length - 1}>
              다음으로
            </Button>
          </>
        )}
      </Navigation>
    </ModalContainer>
  );
};
