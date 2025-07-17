import { useEffect, useMemo, useRef, useState } from 'react';
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
import { getAnswerDetailById, getTaskStatus, updateAnswerComment, updateAnswerUnderstood } from '../../api/apiService';
import { AnswerStatus, GetAnswerDetailResponse } from '../../api/types';
import { useSetRecoilState } from 'recoil';

import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useOutsideClick } from '../../utils/useOutsideClick';
import { UnderstoodState } from '../../store/Interview/UnderstoodState';
import { formatSecondsToTime } from '../../utils/format';
import { BlurBackground } from '../common/background/BlurBackground';

interface RawResultItem {
  question: string;
  questionId: number;
  time: number;
  isAnswer: boolean;
  answerId?: number;
  taskId?: number;
}
interface InterviewResultProps {
  result: RawResultItem[];
  showQuestionIndex?: boolean;
  currentIndex?: number;
  onClose?: () => void;
  isAfterInterview?: boolean;
  isCalendar?: boolean;
  isList?: boolean;
}

export const InterviewResult = ({
  result,
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

  useEffect(() => {
    storedResult.current = result;
  }, [result]);

  const answerIdForRequest = useMemo(() => {
    return storedResult.current[currentIndexState]?.answerId ?? null;
  }, [currentIndexState]);

  const memoKey = answerIdForRequest?.toString() ?? `idx-${currentIndexState}`;
  const isMemoOpenForCurrent = memoOpenMap[memoKey] || false;

  const fetchWithTaskId = async (taskId: number, index: number) => {
    setTaskLoadingMap(prev => ({ ...prev, [index]: true }));
    for (let i = 0; i < 13; i++) {
      const statusRes = await getTaskStatus(taskId);
      if (statusRes.status === 'SUCCESS' && statusRes.answerId) {
        storedResult.current[index].answerId = statusRes.answerId;
        const detail = await getAnswerDetailById(statusRes.answerId);
        setAnswerData(detail);
        setTaskStatusMap(prev => ({ ...prev, [index]: 'SUCCESS' }));
        break;
      } else if (statusRes.status === 'FAILED') {
        setTaskStatusMap(prev => ({ ...prev, [index]: 'FAILED' }));
        break;
      }
      await new Promise(r => setTimeout(r, 1000));
    }
    setTaskLoadingMap(prev => ({ ...prev, [index]: false }));
  };

  useEffect(() => {
    const loadAnswer = async () => {
      const item = storedResult.current[currentIndexState];
      const { answerId, taskId } = item;
      const status = taskStatusMap[currentIndexState];

      setIsLoading(true);

      try {
        if (answerId) {
          const detail = await getAnswerDetailById(answerId);
          setAnswerData(detail);
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
  }, [currentIndexState]);

  useEffect(() => {
    if (answerData) setMemo(answerData.comment || '');
  }, [answerData]);

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMemo(value);
    textareaRef.current!.style.height = 'auto';
    textareaRef.current!.style.height = textareaRef.current!.scrollHeight + 'px';
    if (memoTimeoutRef.current) clearTimeout(memoTimeoutRef.current);
    memoTimeoutRef.current = window.setTimeout(() => {
      if (answerIdForRequest) updateAnswerComment(Number(answerIdForRequest), value);
    }, 5000);
  };

  const handleToggle = () => {
    if (!answerData?.isUnderstood || !answerIdForRequest) return;
    const nextChecked = !answerData.isUnderstood;
    setAnswerData(prev => prev && { ...prev, isUnderstood: nextChecked });
    setUnderstoodMap(prev => ({ ...prev, [String(answerIdForRequest)]: nextChecked }));
    updateAnswerUnderstood(Number(answerIdForRequest), nextChecked);
  };

  if (!result || result.length === 0) return <div>질문 정보가 없습니다.</div>;
  if (taskStatusMap[currentIndexState] === 'FAILED') return <div>AI 피드백 생성에 실패했습니다.</div>;
  if (isLoading || taskLoadingMap[currentIndexState]) return <div></div>;
  if (!answerData) return null;

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

  return (
    <BlurBackground>
      <ModalContainer ref={modalRef}>
        <CloseButton onClick={() => (isAfterInterview ? navigate('/history') : onClose?.())}>
          <img src="/images/Close.svg" alt="close" />
        </CloseButton>
        <ModalHeader>
          <span className="date">{dayjs(answerData.dateTime).format('YYYY년 MM월 DD일')}</span>
          {answerData.isUnderstood && <span className="understood-badge">이해 완료</span>}
          <StatusBadge status={answerData.answerStatus}>{getStatusLabel(answerData.answerStatus)}</StatusBadge>
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
          <label className="toggle-label" style={{ color: '#212121' }}>
            이 질문은 완벽히 이해함
          </label>
          <ToggleSwitch
            isChecked={answerData.isUnderstood}
            onClick={handleToggle}
            disabled={!answerData.isUnderstood}
          />
        </ToggleContainer>
        <FeedbackBox>
          <span className="feedback-title">이렇게 말해보세요!</span>
          <p className="feedback-content">{answerData.AIAnswer}</p>
        </FeedbackBox>
        <MemoWrapper>
          <MemoToggle onClick={() => setMemoOpenMap(prev => ({ ...prev, [memoKey]: !prev[memoKey] }))}>
            <span className="memo-text">{isMemoOpenForCurrent ? '메모 접기' : '메모 펼치기'}</span>
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
                <Button className="prev" onClick={() => setCurrentIndexState(prev => prev - 1)}>
                  이전으로
                </Button>
              )}
            </ButtonGroup>
            <ButtonGroup position="right">
              {currentIndexState < storedResult.current.length - 1 ? (
                <Button className="next" onClick={() => setCurrentIndexState(prev => prev + 1)}>
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
    </BlurBackground>
  );
};
