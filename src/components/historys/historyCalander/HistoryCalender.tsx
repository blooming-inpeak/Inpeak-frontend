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
  CaptionBox,
} from './HistoryCalendarStyles';
import { CaptionType } from '../../common/caption/CaptionType';
import { BlurBackground } from '../../common/background/BlurBackground';
import { InterviewResult } from '../../InterviewResult/InterviewResult';

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

interface Answer {
  answerId: number;
  dateTime: string;
  questionContent: string;
  runningTime: number;
  answerStatus: 'CORRECT' | 'INCORRECT' | 'SKIPPED';
  isUnderstood: boolean;
}

interface AnswerResponse {
  createdAt: string;
  startDate: string;
  answers: Answer[];
  status?: number;
}

const HistoryCalendar = () => {
  const initialDate = new Date();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [interviewData, setInterviewData] = useState<InterviewData[]>([]);
  const [answerData, setAnswerData] = useState<AnswerResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | undefined>(undefined);
  const [interviewExists, setInterviewExists] = useState<boolean>(true);

  const captionMapping: Record<'CORRECT' | 'INCORRECT' | 'SKIPPED', CaptionType> = {
    CORRECT: '정답-small',
    INCORRECT: '오답-small',
    SKIPPED: '포기-small',
  };

  useEffect(() => {
    const fetchData = async () => {
      const month = format(currentDate, 'M');
      const year = format(currentDate, 'yyyy');
      try {
        const data = await fetchInterviewCalendarData(month, year);
        setInterviewData(data.calendarList);
        setInterviewExists(data.exists !== false);
      } catch (error) {
        console.error('인터뷰 캘린더 데이터를 불러오는데 실패했습니다.', error);
        setInterviewData([]);
        setInterviewExists(false);
      }
    };
    fetchData();
  }, [currentDate]);

  useEffect(() => {
    const fetchAnswer = async () => {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      try {
        const data = await fetchAnswerDataByDate(formattedDate);
        setAnswerData(data);
      } catch (error) {
        console.error('답변 데이터를 불러오는데 실패했습니다.', error);
        setAnswerData(null);
      }
    };
    fetchAnswer();
  }, [selectedDate]);

  const getInterviewByDate = (date: Date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    return interviewData.find(item => item.date === formatted) || null;
  };

  const getTotalTime = (answers: Answer[]) => {
    const totalSeconds = answers.reduce((acc, a) => acc + a.runningTime, 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatRunningTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleQuestionClick = (answerId: number, index: number) => {
    setSelectedAnswerId(answerId);
    setClickedIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && selectedAnswerId && (
        <BlurBackground>
          <InterviewResult
            answerId={selectedAnswerId}
            showQuestionIndex={true}
            currentIndex={clickedIndex}
            onClose={() => setIsModalOpen(false)}
            isCalendar
          />
        </BlurBackground>
      )}
      <Container>
        <LeftSection>
          <DateInfo>
            {interviewExists && answerData && (
              <>
                <DateText>{format(selectedDate, 'yyyy / MM / dd')}</DateText>
                {answerData.answers.length > 0 && <TimeText>{getTotalTime(answerData.answers)}</TimeText>}
              </>
            )}
          </DateInfo>

          {/* 답변이 있는 경우 */}
          {answerData && answerData.answers.length > 0 ? (
            <QuestionList>
              {answerData.answers.map((answer, index) => (
                <QuestionItem key={index} onClick={() => handleQuestionClick(answer.answerId, index)}>
                  <QuestionTitle>
                    <div>Q{index + 1}.</div>
                    <QuestionText>{answer.questionContent}</QuestionText>
                  </QuestionTitle>
                  <QuestionFooter>
                    <QuestionTime>{formatRunningTime(answer.runningTime)}</QuestionTime>
                    <CaptionBox>
                      {answer.isUnderstood && <MultiCaption type="이해완료-small" />}
                      <MultiCaption type={captionMapping[answer.answerStatus]} />
                    </CaptionBox>
                  </QuestionFooter>
                </QuestionItem>
              ))}
            </QuestionList>
          ) : (
            // 답변 없을 경우 메시지 분기
            <NoResultMessage>
              {!interviewExists ? (
                <>
                  현재까지 진행된 <br /> 모의면접 결과가 없습니다
                </>
              ) : answerData?.status === 404 ? (
                <>
                  해당 날짜에 진행된 <br /> 모의면접 결과가 없습니다
                </>
              ) : answerData?.status === 409 ? (
                <>
                  해당 날짜에 진행된
                  <br />
                  인터뷰의 답변이 없습니다
                </>
              ) : null}
            </NoResultMessage>
          )}
        </LeftSection>

        <RightSection>
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
          <DaysRow>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <Day key={index} isSunday={index === 0} isSaturday={index === 6}>
                {day}
              </Day>
            ))}
          </DaysRow>
          <Body>
            {/* 날짜 셀 렌더링 */}
            {(() => {
              const monthStart = startOfMonth(currentDate);
              const monthEnd = endOfMonth(monthStart);
              const startDate = startOfWeek(monthStart);
              const endDate = endOfWeek(monthEnd);

              const rows = [];
              let days = [];
              let day = startDate;

              while (day <= endDate) {
                for (let i = 0; i < 7; i++) {
                  const formattedDate = format(day, 'd');
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
              return rows;
            })()}
          </Body>
        </RightSection>
      </Container>
    </>
  );
};

export default HistoryCalendar;
