import { useState, useEffect } from 'react';
import axios from 'axios';
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
import { MultiCaption } from '../common/caption/Caption';

interface Question {
  id: number;
  question: string;
  time: string;
  status: '정답' | '오답' | '포기';
}

interface InterviewData {
  date: string;
  interviewId: number;
  questions: Question[];
}

export const HistoryCalendar = () => {
  const initialDate = new Date();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [interviewData, setInterviewData] = useState<InterviewData[]>([]);

  useEffect(() => {
    const fetchInterviewData = async () => {
      const month = format(currentDate, 'M');
      const year = format(currentDate, 'yyyy');
      try {
        const response = await axios.get<InterviewData[]>('public/sampledata/sampleInterviewData.json', {
          params: { month, year },
          // headers: { Authorization: `Bearer ${accessToken}` }
        });
        setInterviewData(response.data);
      } catch (error) {
        console.error('인터뷰 캘린더 데이터를 불러오는데 실패했습니다.', error);
        setInterviewData([]);
      }
    };
    fetchInterviewData();
  }, [currentDate]);

  const getInterviewByDate = (date: Date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    return interviewData.find(item => item.date === formatted);
  };

  const overallHasData = interviewData.length > 0;

  const getTotalTime = (questions: Question[]) => {
    const totalMinutes = questions.reduce((acc, q) => {
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
        <div id="button-container">
          <NavButton onClick={prevMonth}>
            <img src={LeftArrow} alt="전월로 돌아가기" />
          </NavButton>
          <NavButton onClick={nextMonth}>
            <img src={RightArrow} alt="다음 월로 넘어가기" />
          </NavButton>
        </div>
      </CalendarHeader>
      <CalendarStroke />
    </>
  );

  const renderDays = () => {
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
        const interviewForDate = getInterviewByDate(cloneDay);

        days.push(
          <DateCell
            key={day.toString()}
            isToday={isSameDay(day, new Date())}
            isSelected={!isSameDay(day, new Date()) && isSameDay(day, selectedDate)}
            isSameMonth={isSameMonth(day, monthStart)}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <DateContent>
              <span>{formattedDate}</span>
            </DateContent>
            {interviewForDate && <InterviewDot />}
          </DateCell>,
        );
        day = addDays(day, 1);
      }
      rows.push(<Row key={day.toString()}>{days}</Row>);
      days = [];
    }
    return <Body>{rows}</Body>;
  };

  const interviewForSelectedDate = getInterviewByDate(selectedDate);

  return (
    <Container>
      <LeftSection>
        <DateInfo>
          {interviewForSelectedDate && (
            <>
              <DateText>{format(selectedDate, 'yyyy / MM / dd')}</DateText>
              <TimeText>{getTotalTime(interviewForSelectedDate.questions)}</TimeText>
            </>
          )}
        </DateInfo>
        {interviewForSelectedDate ? (
          <QuestionList>
            {interviewForSelectedDate.questions.map((q, index) => (
              <QuestionItem key={q.id}>
                <QuestionTitle>
                  <div>Q{index + 1}.</div>
                  <QuestionText>{q.question}</QuestionText>
                </QuestionTitle>
                <QuestionFooter>
                  <QuestionTime>{q.time}</QuestionTime>
                  <MultiCaption type={`${q.status}-small`} />
                </QuestionFooter>
              </QuestionItem>
            ))}
          </QuestionList>
        ) : (
          <NoResultMessage>
            {overallHasData ? (
              <>
                해당 날짜에 진행된
                <br /> 모의면접 결과가 없습니다
              </>
            ) : (
              <>
                현재까지 진행된
                <br /> 모의면접 결과가 없습니다
              </>
            )}
          </NoResultMessage>
        )}
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
`;

const LeftSection = styled.div`
  flex: 1;
  width: 242px;
  height: 321px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e6efff;
  box-sizing: border-box;
`;

// [Left Section: Date & Question List]
const DateInfo = styled.div`
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
  box-sizing: border-box;
`;

const QuestionList = styled.div`
  flex: 1;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-sizing: border-box;
`;

const QuestionItem = styled.div`
  width: 245px;
  min-height: 108px;
  border-bottom: 1px solid #e6efff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 30px;
  box-sizing: border-box;
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
  width: 150px;
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

const NoResultMessage = styled.div`
  padding-top: 90.5px;
  text-align: center;
  color: #747474;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.35px;
`;

// [Right Section: Calendar Header & Body]

const RightSection = styled.div`
  width: 311px;
  height: 321px;
`;

const CalendarHeader = styled.div`
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

const CalendarStroke = styled.div`
  width: 260px;
  height: 0.8px;
  background: #e6efff;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const NavButton = styled.button`
  cursor: pointer;
`;

// [Calendar Days Header]
const DaysRow = styled.div`
  display: flex;
  padding: 0px 24px;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  align-self: stretch;
  box-sizing: border-box;
`;

const Day = styled.div<{ isSunday?: boolean; isSaturday?: boolean }>`
  width: 24px;
  height: 28px;
  font-size: 13px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.325px;
  color: ${({ isSaturday, isSunday }) => (isSaturday ? '#3277ED' : isSunday ? '#FF6B6B' : '#747474')};
`;

// [Calendar Body: Dates]
const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Row = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DateCell = styled.div<{ isToday?: boolean; isSelected?: boolean; isSameMonth?: boolean }>`
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

const DateContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InterviewDot = styled.div`
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #85b2ff;
`;

export default HistoryCalendar;
