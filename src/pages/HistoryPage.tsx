import styled from 'styled-components';
import { AnsweredList } from '../components/history/AnsweredList';
import { WrongNoteList } from '../components/history/WrongNoteList';

export function HistoryPage() {
  return (
    <Container>
      <AnsweredList />
      <WrongNoteList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 42px;
  width: 1086px;
  height: 800px;
  margin: 0 auto;
`;
