import { useState, useEffect, useMemo, useCallback, JSX } from 'react';
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
  getDay,
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
import { InterviewResult } from '../../InterviewResult/InterviewResult';

interface CalendarQuestion {
  id: number;
  question: string;
  time: string;
  status: '정답' | '오답' | '포기';
}

interface InterviewData {
  date: string; // yyyy-MM-dd
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

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

const mergeUniqueByDate = (lists: InterviewData[][]): InterviewData[] => {
  const map = new Map<string, InterviewData>();
  for (const list of lists) for (const item of list) map.set(item.date, item);
  return Array.from(map.values());
};

const toMMSS = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

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
    const load = async () => {
      try {
        const targets = [subMonths(currentDate, 1), currentDate, addMonths(currentDate, 1)];
        const results = await Promise.all(
          targets.map(d => fetchInterviewCalendarData(format(d, 'M'), format(d, 'yyyy'))),
        );
        const monthLists = results.map(r => r?.calendarList ?? []);
        setInterviewData(mergeUniqueByDate(monthLists));
        setInterviewExists(results.some(r => r && r.exists !== false && (r.calendarList?.length ?? 0) > 0));
      } catch (e) {
        console.error('인터뷰 캘린더 데이터를 불러오는데 실패했습니다.', e);
        setInterviewData([]);
        setInterviewExists(false);
      }
    };
    load();
  }, [currentDate]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAnswerDataByDate(format(selectedDate, 'yyyy-MM-dd'));
        setAnswerData(data);
      } catch (e) {
        console.error('답변 데이터를 불러오는데 실패했습니다.', e);
        setAnswerData(null);
      }
    };
    load();
  }, [selectedDate]);

  const interviewDateSet = useMemo(() => new Set(interviewData.map(d => d.date)), [interviewData]);

  const hasInterviewOn = useCallback(
    (date: Date) => interviewDateSet.has(format(date, 'yyyy-MM-dd')),
    [interviewDateSet],
  );

  const totalTimeMMSS = useMemo(() => {
    if (!answerData?.answers?.length) return null;
    const total = answerData.answers.reduce((acc, a) => acc + a.runningTime, 0);
    return toMMSS(total);
  }, [answerData]);

  const prevMonth = useCallback(() => setCurrentDate(d => subMonths(d, 1)), []);
  const nextMonth = useCallback(() => setCurrentDate(d => addMonths(d, 1)), []);
  const onQuestionClick = useCallback((answerId: number, index: number) => {
    setSelectedAnswerId(answerId);
    setClickedIndex(index);
    setIsModalOpen(true);
  }, []);

  return (
    <>
      {isModalOpen && selectedAnswerId && (
        <InterviewResult
          answerId={selectedAnswerId}
          showQuestionIndex
          currentIndex={clickedIndex}
          onClose={() => setIsModalOpen(false)}
          isCalendar
        />
      )}

      <Container>
        <LeftSection>
          <DateInfo>
            <DateText>{format(selectedDate, 'yyyy / MM / dd')}</DateText>
            {interviewExists && answerData && totalTimeMMSS && <TimeText>{totalTimeMMSS}</TimeText>}
          </DateInfo>

          {answerData?.answers?.length ? (
            <QuestionList>
              {answerData.answers.map((answer, index) => (
                <QuestionItem key={answer.answerId} onClick={() => onQuestionClick(answer.answerId, index)}>
                  <QuestionTitle>
                    <div>Q{index + 1}.</div>
                    <QuestionText>{answer.questionContent}</QuestionText>
                  </QuestionTitle>
                  <QuestionFooter>
                    <QuestionTime>{toMMSS(answer.runningTime)}</QuestionTime>
                    <CaptionBox>
                      {answer.isUnderstood && <MultiCaption type="이해완료-small" />}
                      <MultiCaption type={captionMapping[answer.answerStatus]} />
                    </CaptionBox>
                  </QuestionFooter>
                </QuestionItem>
              ))}
            </QuestionList>
          ) : (
            <NoResultMessage>
              {!interviewExists ? (
                <>
                  현재까지 진행된 <br /> 모의면접 결과가 없습니다
                </>
              ) : answerData?.status === 204 ? (
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
            {WEEKDAYS.map((d, i) => (
              <Day key={d} $isSunday={i === 0} $isSaturday={i === 6}>
                {d}
              </Day>
            ))}
          </DaysRow>

          <Body>
            {(() => {
              const monthStart = startOfMonth(currentDate);
              const monthEnd = endOfMonth(monthStart);
              const startDate = startOfWeek(monthStart);
              const endDate = endOfWeek(monthEnd);

              const rows: JSX.Element[] = [];
              let day = startDate;

              while (day <= endDate) {
                const weekStart = day;
                const cells: JSX.Element[] = [];

                for (let i = 0; i < 7; i++) {
                  const cloneDay = day;
                  cells.push(
                    <DateCell
                      key={format(cloneDay, 'yyyy-MM-dd')}
                      $isToday={isSameDay(cloneDay, new Date())}
                      $isSelected={!isSameDay(cloneDay, new Date()) && isSameDay(cloneDay, selectedDate)}
                      $isSameMonth={isSameMonth(cloneDay, monthStart)}
                      $isSunday={getDay(cloneDay) === 0}
                      onClick={() => setSelectedDate(cloneDay)}
                    >
                      <DateContent>
                        <span>{format(cloneDay, 'd')}</span>
                      </DateContent>
                      {hasInterviewOn(cloneDay) && <InterviewDot />}
                    </DateCell>,
                  );
                  day = addDays(day, 1);
                }

                rows.push(<Row key={`week-${format(weekStart, 'yyyy-MM-dd')}`}>{cells}</Row>);
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
