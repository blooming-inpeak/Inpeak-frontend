import styled from 'styled-components';
import { SortDropdown } from '../common/SortDropdown';
import { EmptyState } from './EmptyState';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAnsweredList } from '../../api/apiService';

import { InterviewResult } from '../../components/InterviewResult/InterviewResult';
import { useInfiniteScroll } from '../../utils/useInfiniteScroll.ts';
import { UnderstoodState } from '../../store/Interview/UnderstoodState.ts';
import { useRecoilValue } from 'recoil';
import { AnswerStatus } from '../../api/types.ts';
import {
  BottomRow,
  Date,
  FiltersContainer,
  Header,
  LoadingText,
  Question,
  QuestionCard,
  ScrollWrapper,
  SectionContainer,
  StatusBadge,
  Time,
  TitleBox,
} from './NoteListStyle.tsx';

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
        <InterviewResult answerId={selectedAnswerId} showQuestionIndex={false} onClose={() => setIsModalOpen(false)} />
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
        </Header>
        <ScrollWrapper ref={scrollContainerRef}>
          {notes.length === 0 ? (
            <EmptyContainer>
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

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 12px;
  width: 100%;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 4px;
`;
