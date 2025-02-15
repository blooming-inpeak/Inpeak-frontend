import {
  CorrectAnswerWrapper,
  MyCorrectAnswer,
  MyCorrectAnswerPercent,
  MyCorrectAnswerTitle,
  OterhCorrectAnswerPercent,
  OtherCorrectAnswer,
  OtherCorrectAnswerTitle,
} from './CorrectAnswerStyle';

export const CorrectAnswer = () => {
  return (
    <CorrectAnswerWrapper>
      <MyCorrectAnswer>
        <MyCorrectAnswerTitle>누적 정답률</MyCorrectAnswerTitle>
        <MyCorrectAnswerPercent data-content="70%">70%</MyCorrectAnswerPercent>
      </MyCorrectAnswer>

      <img src="/images/AnswerSign.png" alt="Sign" />

      <OtherCorrectAnswer>
        <OtherCorrectAnswerTitle>평균 정답률</OtherCorrectAnswerTitle>
        <OterhCorrectAnswerPercent>65%</OterhCorrectAnswerPercent>
      </OtherCorrectAnswer>
    </CorrectAnswerWrapper>
  );
};
