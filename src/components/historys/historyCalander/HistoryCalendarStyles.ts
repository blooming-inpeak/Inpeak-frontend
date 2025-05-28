import styled from 'styled-components';

export const Container = styled.div`
  width: 553px;
  height: 321px;
  border-radius: 24px;
  background: #fff;
  overflow: hidden;
  box-shadow: 100px 100px 100px 0px rgba(0, 0, 0, 0.02), 2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 100px 0px rgba(0, 80, 216, 0.08);
  display: flex;
  box-sizing: border-box;
`;

export const LeftSection = styled.div`
  flex: 1;
  width: 242px;
  height: 321px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e6efff;
  box-sizing: border-box;
`;

// [Left Section: Date & Question List]
export const DateInfo = styled.div`
  display: flex;
  width: 100%;
  height: 68px;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px 15px 30px;
  background: #fbfdff;
  border-bottom: 1px solid #e6efff;
  box-sizing: border-box;
`;

export const DateText = styled.div`
  color: #747474;
  font-size: 15px;
  font-weight: 600;
  line-height: 150%;
`;

export const TimeText = styled.div`
  color: #747474;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.3px;
  box-sizing: border-box;
`;

export const QuestionList = styled.div`
  flex: 1;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-sizing: border-box;
`;

export const QuestionItem = styled.div`
  width: 245px;
  min-height: 108px;
  border-bottom: 1px solid #e6efff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 30px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: var(--sementic-standard-400, #fbfdff);
  }

  &:active {
    background: var(--sementic-standard-200, #eff5ff);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const QuestionTitle = styled.div`
  display: flex;
  gap: 8px;
  color: #212121;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
`;

export const QuestionText = styled.div`
  width: 150px;
  overflow: hidden;
  color: #212121;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.3px;
`;

export const QuestionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`;

export const QuestionTime = styled.div`
  color: #afafaf;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.3px;
`;

export const CaptionBox = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const NoResultMessage = styled.div`
  padding-top: 90.5px;
  text-align: center;
  color: #747474;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.35px;
`;

// [Right Section: Calendar Header & Body]
export const RightSection = styled.div`
  width: 311px;
  height: 321px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 34px 24px 0px 36px;
  box-sizing: border-box;
  span {
    color: #202a43;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
  }
  #button-container {
    display: flex;
    gap: 24px;
  }
`;

export const CalendarStroke = styled.div`
  width: 260px;
  height: 0.8px;
  background: #e6efff;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const NavButton = styled.button`
  cursor: pointer;
`;

// [Calendar Days Header]
export const DaysRow = styled.div`
  display: flex;
  padding: 0px 24px;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  align-self: stretch;
  box-sizing: border-box;
`;

export const Day = styled.div<{ isSunday?: boolean; isSaturday?: boolean }>`
  width: 24px;
  height: 28px;
  font-size: 13px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.325px;
  color: ${({ isSaturday, isSunday }) => (isSaturday ? '#3277ED' : isSunday ? '#FF6B6B' : '#747474')};
`;

// [Calendar Body: Dates]
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const Row = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const DateCell = styled.div<{ isToday?: boolean; isSelected?: boolean; isSameMonth?: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 50%;
  background: ${({ isToday, isSelected }) => (isToday ? '#3277ED' : isSelected ? '#C3DAFF' : 'none')};
  color: ${({ isToday, isSelected }) => (isToday ? '#fff' : isSelected ? '#0050D8' : '#747474')};
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background: ${({ isToday }) => (isToday ? '#3277ED' : '#e6efff')};
    color: ${({ isToday, isSelected }) => (isToday ? '#fff' : isSelected ? '#fff' : '#0050d8')};
  }
`;

export const DateContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InterviewDot = styled.div`
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #85b2ff;
`;
