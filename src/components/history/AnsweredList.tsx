import styled from 'styled-components';
import { SortDropdown } from '../common/SortDropdown';
import { EmptyState } from './EmptyState';

export const AnsweredList = () => {
  const notes = [
    { date: '2024/02/19', question: 'Styled-components의 장점은?', time: '14:20', status: '오답' },
    {
      date: '2024/02/19',
      question:
        '컴포넌트 재사용성이 중요한 이유는?컴포넌트 재사용성이 중요한 이유는?컴포넌트 재사용성이 중요한 이유는?',
      time: '16:45',
      status: '정답',
    },
  ];

  return (
    <SectionContainer>
      <Header>
        <TitleBox>답변완료</TitleBox>{' '}
        <FiltersContainer>
          <SortDropdown options={['최신순', '오래된 순']} defaultOption="최신순" />
          <SortDropdown options={['전체보기', '정답', '이해완료']} defaultOption="전체보기" />
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
                <StatusBadge status={note.status}>{note.status}</StatusBadge>
              </BottomRow>
            </QuestionCard>
          ))}
        </ListContainer>
      )}
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
