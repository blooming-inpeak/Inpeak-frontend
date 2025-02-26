import { useState } from 'react';
import styled from 'styled-components';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
} from 'date-fns';
import LeftArrow from '../../assets/img/LeftArrow.svg';
import RightArrow from '../../assets/img/RightArrow.svg';

interface Question {
  id: number;
  question: string;
  time: string;
  status: '정답' | '오답';
}

const sampleQuestions: Question[] = [
  { id: 1, question: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠어요?', time: '01:25', status: '정답' },
  { id: 2, question: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠어요?', time: '01:25', status: '정답' },
  { id: 3, question: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠어요?', time: '01:25', status: '오답' },
];

export const HistoryCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getTotalTime = () => {
    const totalMinutes = sampleQuestions.reduce((acc, q) => {
      const [hours, minutes] = q.time.split(':').map(Number);
      return acc + hours * 60 + minutes;
    }, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return `${totalHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const renderHeader = () => (
    <>
      <CalendarHeader>
        <span>{format(currentDate, 'yyyy. MM')}</span>
        <NavButton onClick={prevMonth}>
          <img src={LeftArrow} alt="전월로 돌아가기" />
        </NavButton>
        <NavButton onClick={nextMonth}>
          <img src={RightArrow} alt="다음 월로 넘어가기" />
        </NavButton>
      </CalendarHeader>
      <CalendarStroke />
    </>
  );

  const renderDays = () => {
    // 요일 배열: 인덱스 0: 일요일, 인덱스 6: 토요일
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
      <DaysRow>
        {days.map((day, index) => {
          const isSunday = index === 0;
          const isSaturday = index === 6;
          return (
            <Day key={index} isSunday={isSunday} isSaturday={isSaturday}>
              {day}
            </Day>
          );
        })}
      </DaysRow>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        days.push(
          <DateCell
            key={day.toString()}
            isToday={isSameDay(day, new Date())}
            isSelected={isSameDay(day, selectedDate)}
            isSameMonth={isSameMonth(day, monthStart)}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span>{formattedDate}</span>
          </DateCell>,
        );
        day = addDays(day, 1);
      }
      rows.push(<Row key={day.toString()}>{days}</Row>);
      days = [];
    }
    return <Body>{rows}</Body>;
  };

  return (
    <Container>
      <LeftSection>
        <DateInfo>
          <DateText>{format(selectedDate, 'yyyy / MM / dd')}</DateText>
          <TimeText>{getTotalTime()}</TimeText>
        </DateInfo>
        <QuestionList>
          {sampleQuestions.map(q => (
            <QuestionItem key={q.id}>
              <QuestionTitle>
                <div>Q{q.id}.</div>
                <QuestionText>{q.question}</QuestionText>
              </QuestionTitle>
              <QuestionFooter>
                <QuestionTime>{q.time}</QuestionTime>
                <QuestionStatus status={q.status}>{q.status}</QuestionStatus>
              </QuestionFooter>
            </QuestionItem>
          ))}
        </QuestionList>
      </LeftSection>
      <RightSection>
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </RightSection>
    </Container>
  );
};

const Container = styled.div`
  width: 553px;
  height: 321px;
  border-radius: 24px;
  background: #fff;
  overflow: hidden;
  box-shadow: 100px 100px 100px 0px rgba(0, 0, 0, 0.02), 2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 100px 0px rgba(0, 80, 216, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid #e6efff;
  box-sizing: border-box;
`;

const DateInfo = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30px 30px 15px 30px;
  border-bottom: 1px solid #e6efff;
`;

const DateText = styled.div`
  color: #747474;
  font-size: 15px;
  font-weight: 600;
  line-height: 150%;
`;

const TimeText = styled.div`
  color: #747474;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.3px;
`;

const QuestionList = styled.div`
  flex: 1;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const QuestionItem = styled.div`
  width: 245px;
  height: 108px;
  border-bottom: 1px solid #e6efff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 16px 30px;
  &:last-child {
    border-bottom: none;
  }
`;

const QuestionTitle = styled.div`
  display: flex;
  gap: 8px;
  color: #212121;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
`;

const QuestionText = styled.div`
  overflow: hidden;
  color: #212121;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.3px;
`;

const QuestionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`;

const QuestionTime = styled.div`
  color: #afafaf;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.3px;
`;

const QuestionStatus = styled.div<{ status: string }>`
  color: ${({ status }) => (status === '정답' ? '#0050d8' : '#FF6B6B')};
  width: 26px;
  height: 17px;
  display: flex;
  padding: 1px 4px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${({ status }) => (status === '정답' ? '#F5F9FF' : '#FFF3F4')};
  font-size: 10px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.25px;
`;

const RightSection = styled.div`
  width: 308px;
  height: 321px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30.32px 24px 12.68px 24px;
  span {
    color: #202a43;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
  }
`;

const CalendarStroke = styled.div`
  width: 251px;
  height: 0.8px;
  background: #747474;
  margin: 0 auto;
  margin-bottom: 10px;
`;

const NavButton = styled.button`
  cursor: pointer;
`;

const DaysRow = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 0px 24px;
  gap: 6px;
`;

const Day = styled.div<{ isSunday?: boolean; isSaturday?: boolean }>`
  width: 32px;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.325px;
  color: ${({ isSaturday, isSunday }) => (isSaturday ? '#3277ED' : isSunday ? '#FF6B6B' : '#747474')};
`;

const Body = styled.div`
  width: 308px;
  height: 184px;
  padding: 8px 24px 24px 24px;
`;

const Row = styled.div`
  display: flex;
  box-sizing: border-box;
  gap: 14px;
  padding: 6px;
`;

const DateCell = styled.div<{
  isToday?: boolean;
  isSelected?: boolean;
  isSameMonth?: boolean;
}>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-style: normal;
  border-radius: 50%;
  background: ${({ isSelected }) => (isSelected ? '#3277ED' : 'none')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#747474')};
  font-weight: ${({ isSelected }) => (isSelected ? '500' : '400')};
  cursor: pointer;
  &:hover {
    background: #e6efff;
    color: #0050d8;
  }
`;

export default HistoryCalendar;
