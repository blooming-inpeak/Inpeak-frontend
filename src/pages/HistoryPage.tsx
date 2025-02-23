import styled from 'styled-components';
import { HistoryStatistics } from '../components/History/HistoryStatistics';

export const HistoryPage = () => {
  return (
    <HistoryWrapper>
      <HistoryTop>
        <HistoryStatistics />
        <HistoryCalander></HistoryCalander>
      </HistoryTop>
      <HistoryBackground>
        <HistoryBody>
          <HistoryResponse></HistoryResponse>
          <HistoryIncorrect></HistoryIncorrect>
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

const HistoryCalander = styled.div`
  width: 553px;
  height: 321px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 100px 100px 100px 0px rgba(0, 0, 0, 0.02), 2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 100px 0px rgba(0, 80, 216, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
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

const HistoryResponse = styled.div`
  display: flex;
  width: 348px;
  height: 800px;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid #fff;
  background: #f5f9ff;
`;

const HistoryIncorrect = styled.div`
  display: flex;
  width: 636px;
  height: 800px;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid #fff;
  background: #f5f9ff;
`;
