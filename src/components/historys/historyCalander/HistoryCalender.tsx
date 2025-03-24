import { useState, useEffect } from 'react';
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
import LeftArrow from '../../../assets/img/LeftArrow.svg';
import RightArrow from '../../../assets/img/RightArrow.svg';
import { MultiCaption } from '../../common/caption/Caption';
import { fetchInterviewCalendarData } from '../../../api/historyCalander/calanderAPI';
import { fetchAnswerDataByDate } from '../../../api/historyCalander/answerAPI';
import {
  Container,
  LeftSection,
  DateInfo,
  DateText,
  TimeText,
  QuestionList,
  QuestionItem,
  QuestionTitle,
  QuestionText,
  QuestionFooter,
  QuestionTime,
  NoResultMessage,
  RightSection,
  CalendarHeader,
  CalendarStroke,
  NavButton,
  DaysRow,
  Day,
  Body,
  Row,
  DateCell,
  DateContent,
  InterviewDot,
} from './HistoryCalendarStyles';
import { CaptionType } from '../../common/caption/CaptionType';

interface CalendarQuestion {
  id: number;
  question: string;
  time: string;
  status: '정답' | '오답' | '포기';
}

interface InterviewData {
  date: string;
  interviewId: number;
  questions: CalendarQuestion[];
}

// API /answer/date response 타입
interface Answer {
  dateTime: string;
  questionContent: string;
  runningTime: number; // 초 단위
  answerStatus: 'CORRECT' | 'INCORRECT' | 'SKIPPED';
  isUnderstood: boolean;
}

interface AnswerResponse {
  createdAt: string;
  startDate: string;
  answers: Answer[];
}

export const HistoryCalendar = () => {
  const initialDate = new Date();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [interviewData, setInterviewData] = useState<InterviewData[]>([]);
  const [answerData, setAnswerData] = useState<AnswerResponse | null>(null);

  const captionMapping: Record<'CORRECT' | 'INCORRECT' | 'SKIPPED', CaptionType> = {
    CORRECT: '정답-small',
    INCORRECT: '오답-small',
    SKIPPED: '포기-small',
  };

  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      const month = format(currentDate, 'M');
      const year = format(currentDate, 'yyyy');
      try {
        const data = await fetchInterviewCalendarData(month, year, accessToken);
        setInterviewData(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setInterviewData([]);
      }
    };
    fetchData();
  }, [accessToken, currentDate]);

  // 선택된 날짜에 대한 상세 답변 데이터를 가져오는 API 호출 (/api/answer/date)
  useEffect(() => {
    const fetchAnswer = async () => {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      try {
        const data = await fetchAnswerDataByDate(formattedDate, accessToken);
        setAnswerData(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setAnswerData(null);
      }
    };
    fetchAnswer();
  }, [accessToken, selectedDate]);

  // 달력 상에 기록이 있는 날짜를 표시하기 위한 헬퍼 함수
  const getInterviewByDate = (date: Date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    return interviewData.find(item => item.date === formatted);
  };

  // 좌측 영역 상단에 전체 진행 시간을 표시 (총 runningTime의 합을 HH:MM 형식으로 변환)
  const getTotalTime = (answers: Answer[]) => {
    const totalSeconds = answers.reduce((acc, a) => acc + a.runningTime, 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // 개별 질문의 runningTime을 mm:ss 형식으로 포맷
  const formatRunningTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const overallHasData = interviewData.length > 0;

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

  return (
    <Container>
      <LeftSection>
        <DateInfo>
          {answerData && answerData.answers.length > 0 && (
            <>
              <DateText>{format(selectedDate, 'yyyy / MM / dd')}</DateText>
              <TimeText>{getTotalTime(answerData.answers)}</TimeText>
            </>
          )}
        </DateInfo>
        {answerData && answerData.answers.length > 0 ? (
          <QuestionList>
            {answerData.answers.map((answer, index) => (
              <QuestionItem key={index}>
                <QuestionTitle>
                  <div>Q{index + 1}.</div>
                  <QuestionText>{answer.questionContent}</QuestionText>
                </QuestionTitle>
                <QuestionFooter>
                  <QuestionTime>{formatRunningTime(answer.runningTime)}</QuestionTime>
                  <MultiCaption type={captionMapping[answer.answerStatus]} />
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

export default HistoryCalendar;
