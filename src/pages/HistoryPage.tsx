import styled from 'styled-components';
import { HistoryList } from '../components/history/HistoryList';

export function HistoryPage() {
  return (
    <Container>
      <HistoryList type="answered" />
      <HistoryList type="wrong" />
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
