import { BlurBackground } from '../../components/common/background/BlurBackground';
import { InterviewResult } from '../../components/InterviewResult/InterviewResult';
import { useLocation } from 'react-router-dom';
export const ResultPage = () => {
  const location = useLocation();
  const { answerData, interviewId, questions } = location.state || {};

  return (
    <BlurBackground>
      <InterviewResult
        interviewId={interviewId}
        questions={questions}
        initialAnswerData={answerData}
        onClose={() => {}}
        isAfterInterview
      />
    </BlurBackground>
  );
};
