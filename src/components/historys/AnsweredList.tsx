import styled from 'styled-components';
import { SortDropdown } from '../common/SortDropdown';
import { EmptyState } from './EmptyState';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAnsweredList } from '../../api/apiService';

import { InterviewResult } from '../../components/InterviewResult/InterviewResult';
import { BlurBackground } from '../../components/common/background/BlurBackground';
import { useInfiniteScroll } from '../../utils/useInfiniteScroll.ts';
import { UnderstoodState } from '../../store/Interview/UnderstoodState.ts';
import { useRecoilValue } from 'recoil';
import { AnswerStatus } from '../../api/types.ts';

export const AnsweredList = () => {
  const [notes, setNotes] = useState<
    {
      answerId: number;
      date: string;
      question: string;
      time: string;
      answerStatus: AnswerStatus;
      isUnderstood: boolean;
    }[]
  >([]);

  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortType, setSortType] = useState<'DESC' | 'ASC'>('DESC');
  const [isUnderstood, setIsUnderstood] = useState<boolean | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const [isFetching, setIsFetching] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const requestedPageRef = useRef<Set<number>>(new Set());

  const understoodMap = useRecoilValue(UnderstoodState);

  const fetchAnswers = useCallback(
    async (targetPage: number) => {
      if (requestedPageRef.current.has(targetPage)) return;
      requestedPageRef.current.add(targetPage);

      setIsFetching(true);
      try {
        const res = await getAnsweredList({ sortType, isUnderstood, page: targetPage });
        const data = res.data;
        const list = data?.AnswerResponseList ?? [];

        const mapped = list.map(item => ({
          answerId: item.answerId,
          date: item.dateTime,
          question: item.questionContent,
          time: item.runningTime
            ? `${String(Math.floor(item.runningTime / 60)).padStart(2, '0')}:${String(item.runningTime % 60).padStart(2, '0')}`
            : '00:00',
          answerStatus: item.answerStatus,
          isUnderstood: item.isUnderstood,
        }));

        setNotes(prev => [...prev, ...mapped]);
        setHasNext(data?.hasNext ?? false);
      } catch (e) {
        console.error('불러오기 실패', e);
      } finally {
        setIsFetching(false);
      }
    },
    [sortType, isUnderstood],
  );

  useInfiniteScroll({
    containerRef: scrollContainerRef,
    shouldFetch: hasNext && !isFetching,
    onScrollEnd: () => {
      setPage(prev => prev + 1);
    },
  });

  useEffect(() => {
    if (hasNext) fetchAnswers(page);
  }, [page, fetchAnswers, hasNext]);

  useEffect(() => {
    setNotes([]);
    setPage(0);
    setHasNext(true);
    requestedPageRef.current.clear();
  }, [sortType, isUnderstood]);

  const handleItemClick = (answerId: number) => {
    setSelectedAnswerId(answerId);
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && selectedAnswerId && (
        <BlurBackground>
          <InterviewResult
            answerId={selectedAnswerId}
            showQuestionIndex={false}
            onClose={() => setIsModalOpen(false)}
          />
        </BlurBackground>
      )}

      <SectionContainer>
        <Header>
          <TitleBox>답변완료</TitleBox>{' '}
          <FiltersContainer>
            <SortDropdown
              options={['최신순', '오래된 순']}
              defaultOption="최신순"
              onChange={value => setSortType(value === '최신순' ? 'DESC' : 'ASC')}
            />
            <SortDropdown
              options={['전체보기', '정답만 보기', '이해완료만 보기']}
              displayMap={{
                '정답만 보기': '정답',
                '이해완료만 보기': '이해완료',
              }}
              defaultOption="전체보기"
              onChange={value => {
                if (value === '전체보기') setIsUnderstood(undefined);
                else if (value === '이해완료만 보기') setIsUnderstood(true);
                else setIsUnderstood(false);
              }}
            />
          </FiltersContainer>
        </Header>{' '}
        <ScrollWrapper ref={scrollContainerRef}>
          {notes.length === 0 ? (
            <EmptyContainer>
              {' '}
              <EmptyState type="answered" />
            </EmptyContainer>
          ) : (
            <ListContainer>
              {notes.map(note => {
                const isUnderstoodGlobal = understoodMap[String(note.answerId)];
                const showUnderstood = isUnderstoodGlobal ?? note.isUnderstood;
                const badges =
                  note.answerStatus === 'CORRECT' ? (showUnderstood ? ['이해완료', '정답'] : ['정답']) : [];

                return (
                  <QuestionCard key={note.answerId} onClick={() => handleItemClick(note.answerId)}>
                    <Date>{note.date}</Date>
                    <Question>{note.question}</Question>
                    <BottomRow>
                      <Time>{note.time}</Time>
                      <BadgeContainer>
                        {badges.map((badge, i) => (
                          <StatusBadge key={i} status={badge}>
                            {badge}
                          </StatusBadge>
                        ))}
                      </BadgeContainer>
                    </BottomRow>
                  </QuestionCard>
                );
              })}
            </ListContainer>
          )}
          {isFetching && <LoadingText></LoadingText>}
        </ScrollWrapper>
      </SectionContainer>
    </>
  );
};
const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FiltersContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const SectionContainer = styled.div`
  height: 800px;
  padding: 42px;
  background-color: #f5f9ff;
  border-radius: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleBox = styled.div`
  width: 83px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.12px;
  color: #212121;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 12px;
  width: 100%;
`;

const QuestionCard = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 264px;
  height: 154px;
  padding: 20px;
  border-radius: 16px;
  background: var(--text-1700, #fff);

  overflow: hidden;
  color: var(--text-000, #000);
  text-overflow: ellipsis;
  cursor: pointer;
`;

const Date = styled.span`
  color: #747474;
  font-size: 15px;
  font-weight: 600;
  line-height: 150%;
`;

const Question = styled.p`
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 8px;

  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Time = styled.span`
  color: var(--text-800, #afafaf);
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: flex;
  padding: 0px 4px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;

  ${({ status }) =>
    status === '포기'
      ? 'background: #F8FFEA; color: #85C000; border: 1px solid #85C000;'
      : status === '정답'
        ? 'background: #F5F9FF; color: #0050D8; border: 1px solid #0050D8;'
        : status === '이해완료'
          ? 'background: var(--sementic-light-400, #FAFAFA); color: var(--text-500, #747474); border: 1px solid var(--text-500, #747474);'
          : 'background: #FFF3F4; color: #F84883; border: 1px solid #F84883;'}
`;
const LoadingText = styled.div`
  text-align: center;
  margin-top: 10px;
  color: #666;
`;
const BadgeContainer = styled.div`
  display: flex;
  gap: 4px;
`;
const ScrollWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
