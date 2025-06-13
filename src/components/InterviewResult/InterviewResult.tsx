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
  ButtonGroup,
} from '../../components/InterviewResult/ModalStyle';
import { ToggleSwitch } from '../common/ToggleSwitch';
import {
  getAnswerDetail,
  getAnswerDetailById,
  updateAnswerComment,
  updateAnswerUnderstood,
} from '../../api/apiService';
import { GetAnswerDetailResponse, AnswerStatus } from '../../api/types';
import { useRecoilState } from 'recoil';
import { ResultState } from '../../store/result/ResultState';
import { QuestionsState } from '../../store/question/Question';
import { InterviewIdState } from '../../store/Interview/InterviewId';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useOutsideClick } from '../../utils/useOutsideClick';

interface RawResultItem {
  question: string;
  questionId: number;
  interviewId: string;
  time: number;
  isAnswer: boolean;
  answerId: number;
}
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

  isAfterInterview?: boolean; // 면접 직후 단일 조회 (index O, 이전/다음 버튼 O)
  isCalendar?: boolean; // 히스토리 캘린더 모달 (index O, 이전/다음 버튼 X)
  isList?: boolean; // 답변완료 / 오답노트 리스트 모달 (index X, 이전/다음 버튼 X)
}

export const InterviewResult = ({
  answerId,
  interviewId = 0,
  questions = [],
  onClose,
  currentIndex = 0,

  isCalendar,
  isAfterInterview,
}: InterviewResultProps) => {
  const modalRef = useOutsideClick<HTMLDivElement>(() => {
    onClose?.();
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [resultData, setResult] = useRecoilState(ResultState);
  const [questionsState, setQuestions] = useRecoilState(QuestionsState);
  const [interviewIdState, setInterviewId] = useRecoilState(InterviewIdState);

  const [answerData, setAnswerData] = useState<GetAnswerDetailResponse | null>(null);
  const [currentIndexState, setCurrentIndexState] = useState(currentIndex || 0);
  const answerIdForRequest = answerId ?? resultData?.[currentIndexState]?.answerId;
  const interviewIdForRequest = interviewId ?? interviewIdState;
  const questionsForRequest = questions.length > 0 ? questions : questionsState;

  const isShowQuestionIndex = isAfterInterview || isCalendar;

  const isShowNavigation = isAfterInterview;

  const [memo, setMemo] = useState(''); // 메모 상태 추가
  const memoTimeoutRef = useRef<number | null>(null);

  const [memoOpenMap, setMemoOpenMap] = useState<Record<string, boolean>>({});
  const memoKey = answerIdForRequest?.toString() ?? `idx-${currentIndexState}`;
  const isMemoOpenForCurrent = memoOpenMap[memoKey] || false;

  const handleToggleMemo = () => {
    if (!memoKey) return;
    setMemoOpenMap(prev => ({
      ...prev,
      [memoKey]: !prev[memoKey],
    }));
  };

  useEffect(() => {
    if (currentIndex !== undefined) {
      setCurrentIndexState(currentIndex);
    }
  }, [currentIndex]);
  const formatRunningTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const hour = h > 0 ? `${h.toString().padStart(2, '0')}:` : '';
    const minute = `${m.toString().padStart(2, '0')}:`;
    const second = s.toString().padStart(2, '0');

    return `${hour}${minute}${second}`;
  };

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
    const stored = localStorage.getItem('result');
    if (!stored) return;

    try {
      const parsed: RawResultItem[] = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.length === 0) return;

      if (resultData.length === 0) {
        const resultList = parsed.map(({ question, time, isAnswer, answerId }) => ({
          question,
          time,
          isAnswer,
          answerId,
        }));
        setResult(resultList);
      }

      if (questionsState.length === 0) {
        const questionMap = new Map<number, string>();
        parsed.forEach(({ questionId, question }) => {
          if (!questionMap.has(questionId)) questionMap.set(questionId, question);
        });

        const questionsList = Array.from(questionMap.entries()).map(([id, content]) => ({
          id,
          content,
        }));
        setQuestions(questionsList);
      }

      if (!interviewIdState && parsed[0]?.interviewId) {
        setInterviewId(Number(parsed[0].interviewId));
      }
    } catch (err) {
      console.error('❌ 로컬스토리지 result 파싱 실패', err);
    }
  }, [resultData.length, questionsState.length, setResult, setQuestions, setInterviewId, interviewIdState]);

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
  }, [answerIdForRequest, currentIndexState, interviewIdForRequest, questionsForRequest]);

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
    if (isMemoOpenForCurrent && textareaRef.current) {
      handleResizeHeight(); // 메모가 열릴 때 높이 조정
    }
  }, [isMemoOpenForCurrent]);
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

  if (isLoading) {
    return <div></div>; //로딩
  }
  if (!answerData) return null;
  return (
    <>
      <ModalContainer ref={modalRef}>
        <CloseButton
          onClick={() => {
            if (isAfterInterview) {
              navigate('/history');
            } else {
              onClose?.();
            }
          }}
        >
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
            {isShowQuestionIndex ? (
              <span className="question-mark">Q{currentIndexState + 1}</span>
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
          <MemoToggle onClick={handleToggleMemo}>
            <span className="memo-text" style={{ color: isMemoOpenForCurrent ? '#212121' : '#747474' }}>
              {isMemoOpenForCurrent ? '메모 접기' : '메모 펼치기'}
            </span>
            <img
              className={`memo-toggle ${isMemoOpenForCurrent ? 'open' : ''}`}
              src="/images/memo_toggle.svg"
              alt="메모 토글"
            />
          </MemoToggle>
        </MemoWrapper>

        {isMemoOpenForCurrent && (
          <MemoBox
            ref={textareaRef}
            placeholder="피드백을 후 드는 생각을 자유롭게 기록해보세요"
            value={memo}
            onChange={handleMemoChange}
          />
        )}
        {isShowNavigation && (
          <Navigation>
            <ButtonGroup position="left">
              {currentIndexState > 0 && (
                <Button className="prev" onClick={handlePrev}>
                  이전으로
                </Button>
              )}
            </ButtonGroup>

            <ButtonGroup position="right">
              {currentIndexState < questions.length - 1 ? (
                <Button className="next" onClick={handleNext}>
                  다음으로
                </Button>
              ) : (
                <Button className="next" onClick={() => navigate('/history')}>
                  완료
                </Button>
              )}
            </ButtonGroup>
          </Navigation>
        )}
      </ModalContainer>
    </>
  );
};
