import styled from 'styled-components';

export const WrongNoteList = () => {
  const wrongNotes = [
    { date: '2024 / 02 / 19', question: 'React의 상태 관리는 어떻게 할까요?', time: '10:30', status: '오답' },
    { date: '2024 / 02 / 19', question: 'Styled-components의 장점은?', time: '14:20', status: '포기' },
    { date: '2024 / 02 / 19', question: 'Styled-components의 장점은?', time: '14:20', status: '포기' },
    { date: '2024 / 02 / 19', question: 'Styled-components의 장점은?', time: '14:20', status: '포기' },
    { date: '2024 / 02 / 19', question: 'Styled-components의 장점은?', time: '14:20', status: '포기' },
    { date: '2024 / 02 / 19', question: 'Styled-components의 장점은?', time: '14:20', status: '포기' },
    { date: '2024 / 02 / 19', question: 'Styled-components의 장점은?', time: '14:20', status: '포기' },
    { date: '2024 / 02 / 19', question: 'Styled-components의 장점은?', time: '14:20', status: '포기' },
    { date: '2024 / 02 / 19', question: 'Styled-components의 장점은?', time: '14:20', status: '포기' },
  ];

  return (
    <ListContainer>
      {wrongNotes.map((note, index) => (
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
  );
};

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
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
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-style: normal;
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
  width: 21px;
  height: 18px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  margin-left: 6px;
  padding: 0 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.3px;

  ${({ status }) =>
    status === '포기'
      ? `color: #85C000; border-color: #85C000; background: #F8FFEA;`
      : status === '정답'
      ? `color: #0050D8; border-color: #0050D8; background: #F5F9FF;`
      : `color: #F84883; border-color: #F84883; background: #FFF3F4;`}
`;
