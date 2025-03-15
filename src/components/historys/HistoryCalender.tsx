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

// 예시 모의면접 데이터
const sampleInterviewData: InterviewData[] = [
  {
    date: '2025-02-05',
    interviewId: 101,
    questions: [
      {
        id: 1,
        question: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠어요?',
        time: '01:25',
        status: '정답',
      },
      {
        id: 2,
        question: '이전 프로젝트에서 팀워크 경험을 공유해 주세요.',
        time: '00:45',
        status: '오답',
      },
    ],
  },
  {
    date: '2025-02-10',
    interviewId: 102,
    questions: [
      {
        id: 3,
        question: '본인의 강점과 약점에 대해 설명해 주세요.',
        time: '00:50',
        status: '포기',
      },
      {
        id: 4,
        question: '최근에 해결한 문제에 대해 말씀해 주세요.',
        time: '01:05',
        status: '정답',
      },
    ],
  },
  {
    date: '2025-02-15',
    interviewId: 103,
    questions: [
      {
        id: 5,
        question: '프로젝트 관리 경험에 대해 설명해 주세요.',
        time: '01:15',
        status: '오답',
      },
      {
        id: 6,
        question: '문제 해결 과정을 설명해 주세요.',
        time: '00:40',
        status: '정답',
      },
    ],
  },
  {
    date: '2025-02-20',
    interviewId: 104,
    questions: [
      {
        id: 7,
        question: '협업 경험에 대해 구체적으로 설명해 주세요.',
        time: '01:10',
        status: '포기',
      },
    ],
  },
  {
    date: '2025-02-25',
    interviewId: 105,
    questions: [
      {
        id: 8,
        question: '업무 중 발생한 갈등을 어떻게 해결했는지 설명해 주세요.',
        time: '00:55',
        status: '오답',
      },
      {
        id: 9,
        question: '자신의 경력 목표에 대해 말씀해 주세요.',
        time: '01:20',
        status: '정답',
      },
      {
        id: 10,
        question: '최근 읽은 책에 대해 공유해 주세요.',
        time: '00:35',
        status: '포기',
      },
    ],
  },
];

export const HistoryCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 선택된 날짜에 해당하는 인터뷰 데이터 조회 (날짜 형식: yyyy-MM-dd)
  const getInterviewByDate = (date: Date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    return sampleInterviewData.find(item => item.date === formatted);
  };

  // 선택된 인터뷰의 질문들을 기준으로 총 소요시간 계산
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
          <DateText>{format(selectedDate, 'yyyy / MM / dd')}</DateText>
          <TimeText>{interviewForSelectedDate ? getTotalTime(interviewForSelectedDate.questions) : '00:00'}</TimeText>
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
            해당 날짜에 진행된
            <br /> 모의면접 결과가 없습니다
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

const NoResultMessage = styled.div`
  padding-top: 90.5px;
  font-size: 14px;
  text-align: center;
  color: #747474;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.35px;
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
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 50%;
  background: ${({ isToday, isSelected }) => {
    if (isToday) return '#3277ED';
    if (isSelected) return '#C3DAFF';
    return 'none';
  }};
  color: ${({ isToday, isSelected }) => {
    if (isToday) return '#fff';
    if (isSelected) return '#0050d8';
    return '#747474';
  }};
  font-weight: ${({ isToday, isSelected }) => (isToday || isSelected ? '500' : '400')};
  cursor: pointer;
  &:hover {
    background: #e6efff;
    color: ${({ isToday, isSelected }) => {
      if (isToday) return '#fff';
      if (isSelected) return '#fff';
      return '#0050d8';
    }};
  }
`;

const DateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InterviewDot = styled.div`
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #0050d8;
`;

export default HistoryCalendar;
