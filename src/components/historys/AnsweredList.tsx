import styled from 'styled-components';
import { SortDropdown } from '../common/SortDropdown';
import { EmptyState } from './EmptyState';
import { useEffect, useState } from 'react';
import { getAnsweredList } from '../../api/apiService';
import { AnswerResponse } from '../../api/types';

export const AnsweredList = () => {
  const [notes, setNotes] = useState<{ date: string; question: string; time: string; badges: string[] }[]>([]);

  const [sortType, setSortType] = useState<'DESC' | 'ASC'>('DESC');
  const [isUnderstood, setIsUnderstood] = useState<boolean | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchAnswers = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const res = await getAnsweredList({ sortType, isUnderstood, page });
      const data = res.data;

      const list = data?.AnswerResponseList ?? [];
      if (res.status === 204) {
        setHasNext(false); // 더 이상 불러올 게 없다고 가정
        return;
      }
      setNotes(prev => [
        ...prev,
        ...list.map((item: AnswerResponse) => {
          const badges = [];

          if (item.answerStatus === 'CORRECT') {
            badges.push('정답');
            if (item.isUnderstood) badges.unshift('이해완료'); // 이해완료를 앞에
          }

          return {
            date: item.dateTime,
            question: item.questionContent,
            time: item.runningTime
              ? `${Math.floor(item.runningTime / 60)}:${String(item.runningTime % 60).padStart(2, '0')}`
              : '--:--',
            badges,
          };
        }),
      ]);

      setHasNext(data?.hasNext ?? false);
    } catch (err) {
      console.error('답변완료 리스트 가져오기 실패', err);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    setNotes([]);
    setPage(0);
    fetchAnswers();
  }, [sortType, isUnderstood]);

  useEffect(() => {
    if (page > 0) fetchAnswers();
  }, [page]);
  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;

      if (bottom && hasNext && !isFetching) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNext, isFetching]);
  return (
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
            options={['전체보기', '정답', '이해완료']}
            defaultOption="전체보기"
            onChange={value => {
              if (value === '전체보기') setIsUnderstood(undefined);
              else if (value === '이해완료') setIsUnderstood(true);
              else setIsUnderstood(false);
            }}
          />
        </FiltersContainer>
      </Header>{' '}
      {notes.length === 0 ? (
        <EmptyContainer>
          {' '}
          <EmptyState type="answered" />
        </EmptyContainer>
      ) : (
        <ListContainer>
          {notes.map((note, index) => (
            <QuestionCard key={index}>
              <Date>{note.date}</Date>
              <Question>{note.question}</Question>
              <BottomRow>
                <Time>{note.time}</Time>
                <BadgeContainer>
                  {note.badges.map((badge, i) => (
                    <StatusBadge key={i} status={badge}>
                      {badge}
                    </StatusBadge>
                  ))}
                </BadgeContainer>
              </BottomRow>
            </QuestionCard>
          ))}
        </ListContainer>
      )}
      {isFetching && <LoadingText>로딩 중...</LoadingText>}
    </SectionContainer>
  );
};
const EmptyContainer = styled.div`
  width: 264px;
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
