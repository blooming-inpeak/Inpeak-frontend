import { useState } from 'react';
import styled from 'styled-components';
import { FilterDropdown } from '../common/Filter/FilterDropdown';

interface HistoryListProps {
  type: 'wrong' | 'answered';
}

const Filters = ({
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
}: {
  filter: 'ALL' | 'INCORRECT' | 'SKIPPED';
  setFilter: (value: 'ALL' | 'INCORRECT' | 'SKIPPED') => void;
  sortOrder: 'DESC' | 'ASC';
  setSortOrder: (value: 'DESC' | 'ASC') => void;
}) => {
  return (
    <FiltersContainer>
      <FilterDropdown
        options={['최신순', '오래된 순']}
        value={sortOrder === 'DESC' ? '최신순' : '오래된 순'}
        onChange={value => setSortOrder(value === '최신순' ? 'DESC' : 'ASC')}
        label="최신순"
      />
      <FilterDropdown
        options={['전체보기', '오답', '포기']}
        value={filter === 'ALL' ? '전체보기' : filter === 'INCORRECT' ? '오답' : '포기'}
        onChange={value => setFilter(value === '전체보기' ? 'ALL' : value === '오답' ? 'INCORRECT' : 'SKIPPED')}
        label="전체보기"
      />
    </FiltersContainer>
  );
};

const FiltersContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const HistoryList = ({ type }: HistoryListProps) => {
  const [sortOrder, setSortOrder] = useState<'DESC' | 'ASC'>('DESC');
  const [filter, setFilter] = useState<'ALL' | 'INCORRECT' | 'SKIPPED'>('ALL');

  const wrongNotes = [
    { date: '2024 / 02 / 19', question: 'Styled-components의 장점은?', time: '14:20', status: '포기' },
    { date: '2024 / 02 / 19', question: 'React의 상태관리는 어떻게 동작하나요?', time: '15:30', status: '정답' },
    { date: '2024 / 02 / 19', question: '컴포넌트 재사용성이 중요한 이유는?', time: '16:45', status: '오답' },
    { date: '2024 / 02 / 19', question: 'Vue와 React의 차이점은?', time: '17:10', status: '포기' },
    { date: '2024 / 02 / 19', question: 'Next.js의 장점은?', time: '18:00', status: '정답' },
    { date: '2024 / 02 / 19', question: '리액트에서 useEffect의 역할은?', time: '19:30', status: '오답' },
    { date: '2024 / 02 / 19', question: 'CSS-in-JS 방식의 장단점은?', time: '20:15', status: '포기' },
    { date: '2024 / 02 / 19', question: 'Vue와 React의 차이점은?', time: '17:10', status: '포기' },
    { date: '2024 / 02 / 19', question: 'Next.js의 장점은?', time: '18:00', status: '정답' },
    { date: '2024 / 02 / 19', question: '리액트에서 useEffect의 역할은?', time: '19:30', status: '오답' },
    { date: '2024 / 02 / 19', question: 'CSS-in-JS 방식의 장단점은?', time: '20:15', status: '포기' },
  ];
  let filteredNotes = [...wrongNotes];

  if (type === 'wrong' && filter !== 'ALL') {
    filteredNotes = filteredNotes.filter(note =>
      filter === 'INCORRECT' ? note.status === '오답' : note.status === '포기',
    );
  }

  const sortedNotes = filteredNotes.sort((a, b) => {
    return sortOrder === 'DESC' ? b.time.localeCompare(a.time) : a.time.localeCompare(b.time);
  });

  return (
    <Container type={type}>
      <Header>
        <TitleBox type={type}>{type === 'wrong' ? '오답노트' : '답변완료'}</TitleBox>
        <Filters filter={filter} setFilter={setFilter} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </Header>
      <ListContainer type={type}>
        {sortedNotes.map((note, index) => (
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
    </Container>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div<{ type: 'wrong' | 'answered' }>`
  height: 800px;
  padding: 42px;
  background-color: #f5f9ff;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const TitleBox = styled.div<{ type: 'wrong' | 'answered' }>`
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

const ListContainer = styled.div<{ type: 'wrong' | 'answered' }>`
  flex: 1;
  display: grid;
  grid-template-columns: ${({ type }) => (type === 'wrong' ? 'repeat(2, 1fr)' : '1fr')};
  row-gap: 12px;
  column-gap: 24px;
  grid-auto-rows: min-content;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const QuestionCard = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 264px;
  height: 154px;
  padding: 20px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 8px;
  background-color: white;
`;

const Date = styled.span`
  color: #747474;
  font-size: 15px;
  font-weight: 600;
  line-height: 150%;
`;

const Question = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 150%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Time = styled.span`
  color: #747474;
  font-size: 14px;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 29px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid;
  font-size: 12px;
  font-weight: 500;
  text-align: center;

  ${({ status }) =>
    status === '포기'
      ? `color: #85C000; border-color: #85C000; background: #F8FFEA;`
      : status === '정답'
      ? `color: #0050D8; border-color: #0050D8; background: #F5F9FF;`
      : status === '이해완료'
      ? `color: #747474; border-color: #747474; background: #FAFAFA;`
      : status === '오답'
      ? `color: #F84883; border-color: #F84883; background: #FFF3F4;`
      : ''}
`;
