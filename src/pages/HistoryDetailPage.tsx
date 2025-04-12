import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { InterviewResult } from '../components/InterviewResult/InterviewResult';

export const HistoryDetailPage = () => {
  const { answerId } = useParams();

  return (
    <HistoryWrapper>
      <InterviewResult answerId={Number(answerId)} isInterviewPage />
    </HistoryWrapper>
  );
};
const HistoryWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
