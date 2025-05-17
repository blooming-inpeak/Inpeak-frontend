import styled from 'styled-components';

export const SessionContentWrapper = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 0 0 24px 24px;
  display: flex;
  flex-direction: column;
`;

export const SessionContentTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-top: 19.74px;
  padding: 0 16.13px;
`;

export const SessionContentNumber = styled.div`
  width: 32.3px;
  height: 32.3px;

  border-radius: 8px;
  border: 1px solid #e6e6e6;
  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #707991;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.35px;
`;

export const Record = styled.div<{ $isRecord: boolean }>`
  width: 28px;
  height: 28px;
  box-sizing: border-box;
  padding: 5px 3px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isRecord }) => ($isRecord ? '#f84883' : '#888')};
`;

export const RecordContent = styled.div<{ $isRecord: boolean }>`
  width: 22px;
  height: 18px;
  box-sizing: border-box;
  border: 2px solid #ffffff;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #ffffff;
  font-size: ${({ $isRecord }) => ($isRecord ? '11px' : '9px')};
  font-weight: 700;
  letter-spacing: ${({ $isRecord }) => ($isRecord ? '-0.275px' : '-0.225px')};
  line-height: 18px;
`;

export const SessionContentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 31px;
  width: 100%;
`;

export const QuestionBox = styled.div`
  width: 445px;
  min-height: 119px;
  padding: 24px 24px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ededed;
  border-radius: 20px;

  color: #212121;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.4px;
  text-align: center;

  position: relative;
`;

export const QuestionTail = styled.img`
  position: absolute;
  bottom: -35px;
  right: 100px;
`;
