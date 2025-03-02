import styled from 'styled-components';
import { HistoryStatistics } from '../components/History/HistoryStatistics';
import HistoryCalender from '../components/History/HistoryCalender';
import AnswerList from '../components/History/HistoryInterviewList';
import HistoryIncorrect from '../components/History/HistoryIncorrect';

export const HistoryPage = () => {
  return (
    <HistoryWrapper>
      <HistoryTop>
        <HistoryStatistics />
        <HistoryCalender />
      </HistoryTop>
      <HistoryBackground>
        <HistoryBody>
          <AnswerList />
          <HistoryIncorrect />
        </HistoryBody>
      </HistoryBackground>
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

const HistoryTop = styled.div`
  width: 1129px;
  height: 321px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 23px;
  position: relative;
  z-index: 2;
  margin-top: 58px;
`;

const HistoryBackground = styled.div`
  background: #e6efff;
  width: 100%;
  height: 1474px;
  position: relative;
  z-index: 1;
  margin-top: -48px;
  padding-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HistoryBody = styled.div`
  width: 1007px;
  height: 800px;
  display: flex;
  gap: 23px;
  margin-top: 32px;
`;
