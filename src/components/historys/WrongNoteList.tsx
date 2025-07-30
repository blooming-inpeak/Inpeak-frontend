import styled from 'styled-components';

import { SortDropdown } from '../common/SortDropdown';
import { EmptyState } from './EmptyState';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getIncorrectAnswers } from '../../api/apiService.ts';
import { AnswerResponse } from '../../api/types.ts';
import { InterviewResult } from '../../components/InterviewResult/InterviewResult';
import { useInfiniteScroll } from '../../utils/useInfiniteScroll.ts';
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

const STATUS_LABELS: Record<string, string> = {
  INCORRECT: '오답',
  SKIPPED: '포기',
};

export const WrongNoteList = () => {
  const [notes, setNotes] = useState<
    { answerId: number; date: string; question: string; time: string; status: string }[]
  >([]);
  const [sortType, setSortType] = useState<'DESC' | 'ASC'>('DESC');
  const [status, setStatus] = useState<'ALL' | 'INCORRECT' | 'SKIPPED'>('ALL');
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const requestedPages = useRef(new Set<number>());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const handleItemClick = (answerId: number) => {
    setSelectedAnswerId(answerId);
    setIsModalOpen(true);
  };

  const fetchNotes = useCallback(
    async (targetPage: number) => {
      if (isFetching || requestedPages.current.has(targetPage)) return;
      requestedPages.current.add(targetPage);
      setIsFetching(true);

      try {
        const response = await getIncorrectAnswers({ sortType, status, page: targetPage });
        const data = response.data;
        const answerList: AnswerResponse[] = data?.AnswerResponseList ?? [];

        const mapped = answerList.map(item => ({
          answerId: item.answerId,
          date: item.dateTime,
          question: item.questionContent,
          time: item.runningTime
            ? `${Math.floor(item.runningTime / 60)}:${String(item.runningTime % 60).padStart(2, '0')}`
            : '00:00',
          status: STATUS_LABELS[item.answerStatus] ?? '기타',
        }));

        setNotes(prev => [...prev, ...mapped]);
        setHasNext(data?.hasNext ?? false);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setIsFetching(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortType, status],
  );

  useEffect(() => {
    if (hasNext) fetchNotes(page);
  }, [page, fetchNotes, hasNext]);

  useEffect(() => {
    setNotes([]);
    setPage(0);
    setHasNext(true);
    requestedPages.current.clear();
  }, [sortType, status]);

  useInfiniteScroll({
    containerRef: scrollContainerRef,
    shouldFetch: hasNext && !isFetching,
    onScrollEnd: () => {
      setPage(prev => prev + 1);
    },
  });

  return (
    <>
      {isModalOpen && selectedAnswerId && (
        <InterviewResult answerId={selectedAnswerId} showQuestionIndex={false} onClose={() => setIsModalOpen(false)} />
      )}
      <SectionContainer>
        <Header>
          <TitleBox>오답노트</TitleBox>
          <FiltersContainer>
            <SortDropdown
              options={['최신순', '오래된 순']}
              defaultOption="최신순"
              onChange={value => setSortType(value === '최신순' ? 'DESC' : 'ASC')}
            />
            <SortDropdown
              options={['전체보기', '오답만 보기', '포기만 보기']}
              defaultOption="전체보기"
              displayMap={{
                '오답만 보기': '오답',
                '포기만 보기': '포기',
              }}
              onChange={value =>
                setStatus(value === '전체보기' ? 'ALL' : value === '오답만 보기' ? 'INCORRECT' : 'SKIPPED')
              }
            />
          </FiltersContainer>
        </Header>
        <ScrollWrapper ref={scrollContainerRef}>
          {notes.length === 0 ? (
            <EmptyContainer>
              <EmptyState type="wrong" />
            </EmptyContainer>
          ) : (
            <ListContainer>
              {notes.map(note => (
                <QuestionCard key={note.answerId} onClick={() => handleItemClick(note.answerId)}>
                  <Date>{note.date}</Date>
                  <Question>{note.question}</Question>
                  <BottomRow>
                    <Time>{note.time}</Time>
                    <StatusBadge status={note.status}>{note.status}</StatusBadge>
                  </BottomRow>
                </QuestionCard>
              ))}
            </ListContainer>
          )}{' '}
          {isFetching && <LoadingText></LoadingText>}
        </ScrollWrapper>
      </SectionContainer>
    </>
  );
};
const EmptyContainer = styled.div`
  box-sizing: border-box;
  width: 552px;
  height: 674px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
  align-items: start;
  place-items: start;
`;
