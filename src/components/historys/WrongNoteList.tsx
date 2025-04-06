import styled from 'styled-components';

import { SortDropdown } from '../common/SortDropdown';
import { EmptyState } from './EmptyState';
import { useEffect, useState } from 'react';
import { getIncorrectAnswers } from '../../api/apiService.ts';
import { AnswerResponse } from '../../api/types.ts';

export const WrongNoteList = () => {
  const [notes, setNotes] = useState<{ date: string; question: string; time: string; status: string }[]>([]);
  const [sortType, setSortType] = useState<'DESC' | 'ASC'>('DESC');
  const [status, setStatus] = useState<'ALL' | 'INCORRECT' | 'SKIPPED'>('ALL');
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const STATUS_LABELS: Record<string, string> = {
    INCORRECT: '오답',
    SKIPPED: '포기',
  };

  // API 요청 함수
  const fetchNotes = async () => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await getIncorrectAnswers({ sortType, status, page });
      const data = response.data;

      const answerList = data?.AnswerResponseList ?? [];
      if (response.status === 204) {
        setHasNext(false); // 더 이상 불러올 게 없다고 가정
        return;
      }
      setNotes(prevNotes => [
        ...prevNotes,
        ...answerList.map((item: AnswerResponse) => ({
          date: item.dateTime,
          question: item.questionContent,
          time: item.runningTime
            ? `${Math.floor(item.runningTime / 60)}:${String(item.runningTime % 60).padStart(2, '0')}`
            : '--:--',
          status: STATUS_LABELS[item.answerStatus],
        })),
      ]);
      setHasNext(data?.hasNext ?? false);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsFetching(false);
    }
  };

  // `sortType`, `status` 변경 시 새롭게 데이터 로드
  useEffect(() => {
    setNotes([]); // 기존 데이터 초기화
    setPage(0);
    fetchNotes();
  }, [sortType, status]);

  // 페이지 변경될 때마다 새로운 데이터 요청
  useEffect(() => {
    if (page > 0) {
      fetchNotes();
    }
  }, [page]);

  //스크롤 이벤트 리스너 추가
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200 &&
        hasNext &&
        !isFetching
      ) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNext, isFetching]);

  return (
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
            options={['전체보기', '오답', '포기']}
            defaultOption="전체보기"
            onChange={value => setStatus(value === '전체보기' ? 'ALL' : value === '오답' ? 'INCORRECT' : 'SKIPPED')}
          />
        </FiltersContainer>
      </Header>
      {notes.length === 0 ? (
        <EmptyContainer>
          <EmptyState type="wrong" />
        </EmptyContainer>
      ) : (
        <ListContainer>
          {notes.map((note, index) => (
            <QuestionCard key={index}>
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
      {isFetching && <LoadingText>로딩 중...</LoadingText>}
    </SectionContainer>
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
  overflow-y: auto;
  min-height: 400px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  color: #747474;
  font-size: 14px;
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
