import { BeforeVideo } from './BeforeVideo';
import { Buttons } from './Buttons';
import { AnswerVideo } from './AnswerVideo';
import {
  QuestionBox,
  QuestionTail,
  Record,
  RecordContent,
  SessionContentBody,
  SessionContentNumber,
  SessionContentTop,
  SessionContentWrapper,
} from './SessionContentStyle';
import { useRecoilValue } from 'recoil';
import { isRecordingState } from '../../store/record/Record';
import { QuestionsState } from '../../store/question/Question';

interface Props {
  start: boolean;
  currentPage: number;
  page: number;
  startRecording: () => void;
  stopRecording: () => void;
  nextPage: () => void;
}

export const SessionContent = ({ start, currentPage, page, startRecording, stopRecording, nextPage }: Props) => {
  const isRecording = useRecoilValue(isRecordingState);
  const Questions = useRecoilValue(QuestionsState);
  const lastQuestion = page === currentPage;
  return (
    <SessionContentWrapper>
      <SessionContentTop>
        <SessionContentNumber>
          {currentPage}/{page}
        </SessionContentNumber>

        {start && (
          <Record $isRecord={isRecording}>
            <RecordContent $isRecord={isRecording}>{isRecording ? 'ON' : 'OFF'}</RecordContent>
          </Record>
        )}
      </SessionContentTop>

      <SessionContentBody>
        <QuestionBox>
          {Questions[currentPage - 1].content}
          <QuestionTail src="/images/QuestionTail.svg" alt="questionTail" />
        </QuestionBox>

        {start ? <AnswerVideo /> : <BeforeVideo />}

        <Buttons
          start={start}
          startRecording={startRecording}
          stopRecording={stopRecording}
          nextPage={nextPage}
          currentPage={currentPage}
          lastQuestion={lastQuestion}
        />
      </SessionContentBody>
    </SessionContentWrapper>
  );
};
