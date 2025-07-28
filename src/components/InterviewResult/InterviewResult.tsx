import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ModalContainer,
  ModalHeader,
  FeedbackBox,
  MemoToggle,
  Navigation,
  MemoBox,
  MemoWrapper,
  ToggleContainer,
  Wrapper,
  CloseButton,
  ButtonGroup,
} from '../../components/InterviewResult/ModalStyle';
import { ToggleSwitch } from '../common/ToggleSwitch';
import { getAnswerDetailById, getTaskStatus, updateAnswerComment, updateAnswerUnderstood } from '../../api/apiService';
import { AnswerStatus, GetAnswerDetailResponse } from '../../api/types';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useOutsideClick } from '../../utils/useOutsideClick';
import { UnderstoodState } from '../../store/Interview/UnderstoodState';
import { formatSecondsToTime } from '../../utils/format';
import { BlurBackground } from '../common/background/BlurBackground';
import Loading from '../../pages/Loading';
import { Fail } from '../../pages/Fail';
import { useAnswerCache } from '../../hooks/interview/useAnswerCache';
import { CommonButton } from '../common/button/CommonButton';
import { StatusBadge } from '../historys/NoteListStyle';

type RawResultItem = {
  answerId?: number;
  taskId?: number;
  isAnswer?: boolean;
  question?: string;
  questionId?: number;
  time?: number;
};

interface InterviewResultProps {
  result?: RawResultItem[]; // 여러 질문용
  answerId?: number; // 단일 질문용
  currentIndex?: number;
  onClose?: () => void;
  showQuestionIndex?: boolean;
  isAfterInterview?: boolean;
  isCalendar?: boolean;
  isList?: boolean;
}

export const InterviewResult = ({
  result,
  answerId,
  onClose,
  currentIndex = 0,
  isCalendar,
  isAfterInterview,
}: InterviewResultProps) => {
  const modalRef = useOutsideClick<HTMLDivElement>(() => onClose?.());
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [answerData, setAnswerData] = useState<GetAnswerDetailResponse | null>(null);
  const [currentIndexState, setCurrentIndexState] = useState(currentIndex);
  const isShowQuestionIndex = isAfterInterview || isCalendar;
  const isShowNavigation = isAfterInterview;
  const [memo, setMemo] = useState('');
  const memoTimeoutRef = useRef<number | null>(null);
  const [memoOpenMap, setMemoOpenMap] = useState<Record<string, boolean>>({});
  const storedResult = useRef<RawResultItem[]>([]);
  const setUnderstoodMap = useSetRecoilState(UnderstoodState);
  const [taskStatusMap, setTaskStatusMap] = useState<Record<string, 'WAITING' | 'SUCCESS' | 'FAILED'>>({});
  const [taskLoadingMap, setTaskLoadingMap] = useState<Record<string, boolean>>({});

  const isTaskFailed = taskStatusMap[currentIndexState] === 'FAILED';
  const taskStatus = taskStatusMap[currentIndexState];

  const [isUserToggled, setIsUserToggled] = useState(false);

  const { get: getCachedAnswer, set: setCachedAnswer } = useAnswerCache();

  useEffect(() => {
    if (result && result.length > 0) {
      storedResult.current = result;
    } else if (answerId) {
      storedResult.current = [
        {
          answerId,
          isAnswer: true,
        },
      ];
    } else {
      storedResult.current = [];
    }
  }, [result, answerId]);

  const answerIdForRequest = storedResult.current[currentIndexState]?.answerId ?? null;

  const memoKey = answerIdForRequest?.toString() ?? `idx-${currentIndexState}`;
  const isMemoOpenForCurrent = useMemo(() => {
    return memoOpenMap[memoKey] || false;
  }, [memoOpenMap, memoKey]);

  const MAX_RETRY_COUNT = 13;
  const fetchWithTaskId = async (taskId: number, index: number) => {
    let isAborted = false;
    setTaskLoadingMap(prev => {
      if (prev[index]) {
        isAborted = true;
        return prev;
      }
      return { ...prev, [index]: true };
    });

    if (isAborted) return;

    let success = false;
    for (let i = 0; i < MAX_RETRY_COUNT; i++) {
      const statusRes = await getTaskStatus(taskId);

      if (i === 0 && statusRes.status === 'WAITING') {
        setTaskStatusMap(prev => ({ ...prev, [index]: 'WAITING' }));
        setAnswerData(null); // answerData 초기화해서 빈 화면 보이게
      }

      if (taskLoadingMap[index]) return;

      if (statusRes.status === 'SUCCESS' && statusRes.answerId) {
        storedResult.current[index].answerId = statusRes.answerId;
        const detail = await getAnswerDetailById(statusRes.answerId);
        setAnswerData(detail);
        setCachedAnswer(statusRes.answerId, detail);
        setTaskStatusMap(prev => ({ ...prev, [index]: 'SUCCESS' }));
        success = true;
        break;
      } else if (statusRes.status === 'FAILED') {
        setTaskStatusMap(prev => ({ ...prev, [index]: 'FAILED' }));
        success = true;
        break;
      }

      await new Promise(r => setTimeout(r, 1000));
    }

    if (!success) {
      setTaskStatusMap(prev => ({ ...prev, [index]: 'FAILED' }));
    }

    setTaskLoadingMap(prev => ({ ...prev, [index]: false }));
  };

  useEffect(() => {
    if (typeof answerId === 'number' && !result) {
      const cached = getCachedAnswer(answerId);
      if (cached) {
        setAnswerData(cached);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      getAnswerDetailById(answerId)
        .then(detail => {
          setAnswerData(detail);
          setCachedAnswer(answerId, detail);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [answerId, result, getCachedAnswer, setCachedAnswer]);

  const getCurrentAnswerId = () => {
    return storedResult.current[currentIndexState]?.answerId;
  };

  useEffect(() => {
    if (!result) return;

    const item = storedResult.current[currentIndexState];
    if (!item) return;

    const { answerId, taskId } = item;
    const status = taskStatusMap[currentIndexState];

    const loadAnswer = async () => {
      const key = getCurrentAnswerId();
      if (!answerId && taskId && (!status || status === 'WAITING')) {
        setAnswerData(null);
      }

      setIsLoading(true);
      try {
        if (answerId) {
          if (typeof key === 'number') {
            const cached = getCachedAnswer(key);
            if (cached) {
              setAnswerData(cached);
              return;
            }

            const detail = await getAnswerDetailById(key);
            setAnswerData(detail);
            setCachedAnswer(key, detail);
          }
        } else if (taskId) {
          if (!status || status === 'WAITING') {
            await fetchWithTaskId(taskId, currentIndexState);
          } else if (status === 'SUCCESS') {
            const id = storedResult.current[currentIndexState].answerId;
            if (id) {
              const detail = await getAnswerDetailById(id);
              setAnswerData(detail);
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, currentIndexState]);

  useEffect(() => {
    if (answerData) setMemo(answerData.comment || '');
  }, [answerData]);

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const key = getCurrentAnswerId();
    const value = e.target.value;
    setMemo(value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
    if (memoTimeoutRef.current) clearTimeout(memoTimeoutRef.current);
    memoTimeoutRef.current = window.setTimeout(() => {
      if (answerIdForRequest && typeof key === 'number') {
        updateAnswerComment(Number(answerIdForRequest), value);
        const updated = {
          ...getCachedAnswer(key),
          comment: value,
        };
        setCachedAnswer(key, updated);
      }
    }, 1000);
  };

  const handleToggle = () => {
    const key = getCurrentAnswerId();
    if (!isCorrect || !answerIdForRequest) return;
    const nextChecked = !answerData.isUnderstood;
    setIsUserToggled(true);
    setAnswerData(prev => {
      const updated = { ...prev!, isUnderstood: nextChecked };
      if (typeof key === 'number') {
        setCachedAnswer(key, updated);
      }
      return updated;
    });
    setUnderstoodMap(prev => ({ ...prev, [String(answerIdForRequest)]: nextChecked }));
    updateAnswerUnderstood(Number(answerIdForRequest), nextChecked);
  };
  useEffect(() => {
    setIsUserToggled(false);
  }, [currentIndexState]);

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
  if (typeof answerId === 'number' && !result && (isLoading || !answerData)) {
    return null;
  }
  return (
    <BlurBackground>
      <ModalContainer ref={modalRef}>
        <CloseButton onClick={() => onClose?.()}>
          <img src="/images/Close.svg" alt="close" />
        </CloseButton>
        {(() => {
          if (taskStatus === 'WAITING') {
            return <Loading />;
          }

          if (isTaskFailed) {
            return <Fail index={currentIndexState} />;
          }

          if (isLoading || !answerData) {
            return <div style={{ minHeight: '500px' }} />;
          }
          return (
            <>
              <ModalHeader>
                <span className="date">{dayjs(answerData.dateTime).format('YYYY년 MM월 DD일')}</span>
                {answerData.isUnderstood && <span className="understood-badge">이해 완료</span>}
                <StatusBadge status={getStatusLabel(answerData.answerStatus)}>
                  {getStatusLabel(answerData.answerStatus)}
                </StatusBadge>
              </ModalHeader>
              <Wrapper>
                <div className="question-content">
                  <span className="question-mark">Q{isShowQuestionIndex ? currentIndexState + 1 : ''}</span>
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
                        <span className="video-time">{formatSecondsToTime(answerData.runningTime)}</span>
                      </div>
                    )}
                  </div>
                )}
              </Wrapper>
              <ToggleContainer>
                <label className="toggle-label">이 질문은 완벽히 이해함</label>
                <ToggleSwitch
                  isChecked={answerData.isUnderstood}
                  onClick={handleToggle}
                  disabled={!isCorrect}
                  shouldAnimate={isUserToggled}
                />
              </ToggleContainer>
              <FeedbackBox>
                <span className="feedback-title">이렇게 말해보세요!</span>
                <p className="feedback-content">{answerData.AIAnswer}</p>
              </FeedbackBox>
              <MemoWrapper isOpen={isMemoOpenForCurrent ?? false} $isAfterInterview={isAfterInterview}>
                <MemoToggle onClick={() => setMemoOpenMap(prev => ({ ...prev, [memoKey]: !prev[memoKey] }))}>
                  <span className="memo-text">{isMemoOpenForCurrent ? '메모 접기' : '메모 펼치기'}</span>
                  <img
                    className={`memo-toggle ${isMemoOpenForCurrent ? 'open' : ''}`}
                    src="/images/memo_toggle.svg"
                    alt="메모 토글"
                  />
                </MemoToggle>
                {isMemoOpenForCurrent && (
                  <MemoBox
                    ref={textareaRef}
                    placeholder="피드백을 후 드는 생각을 자유롭게 기록해보세요"
                    value={memo}
                    onChange={handleMemoChange}
                  />
                )}
              </MemoWrapper>
            </>
          );
        })()}

        {isShowNavigation && (
          <Navigation>
            <ButtonGroup position="left">
              {currentIndexState > 0 && (
                <CommonButton width={100} height={36} onClick={() => setCurrentIndexState(prev => prev - 1)}>
                  이전으로
                </CommonButton>
              )}
            </ButtonGroup>
            <div className="question-index">
              <div className="current">{currentIndexState + 1}</div>/{storedResult.current.length}
            </div>
            <ButtonGroup position="right">
              {currentIndexState < storedResult.current.length - 1 ? (
                <CommonButton width={100} height={36} onClick={() => setCurrentIndexState(prev => prev + 1)}>
                  다음으로
                </CommonButton>
              ) : (
                <CommonButton width={100} height={36} className="next" onClick={() => navigate('/history')}>
                  완료
                </CommonButton>
              )}
            </ButtonGroup>
          </Navigation>
        )}
      </ModalContainer>
    </BlurBackground>
  );
};
