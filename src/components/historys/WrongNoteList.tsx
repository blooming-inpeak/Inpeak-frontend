import styled from 'styled-components';

import { SortDropdown } from '../common/SortDropdown';
import { EmptyState } from './EmptyState';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getIncorrectAnswers } from '../../api/apiService.ts';
import { AnswerResponse } from '../../api/types.ts';
import { InterviewResult } from '../../components/InterviewResult/InterviewResult';
import { BlurBackground } from '../../components/common/background/BlurBackground';
import { useInfiniteScroll } from '../../utils/useInfiniteScroll.ts';

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
    console.log(
      'Fetched notes:',
      notes.map(n => n.answerId),
    );
  }, [notes]);

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
const FiltersContainer = styled.div`
  display: flex;
  gap: 4px;
`;
const SectionContainer = styled.div`
  height: 800px;
  padding: 42px 42px 30px 42px;
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
  height: 100%;
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
      ? 'background: #F8FFEA; color: #85C000; border: 1px solid #85C000; '
      : status === '정답'
        ? 'background: #F5F9FF; color: #0050D8; border: 1px solid #0050D8;'
        : 'background: #FFF3F4; color: #F84883; border: 1px solid #F84883;'}
`;
const LoadingText = styled.div`
  text-align: center;
  margin-top: 10px;
  color: #666;
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
