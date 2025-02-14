import styled from 'styled-components';

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

export const CorrectAnswerWrapper = styled.div`
  width: 259px;
  height: 120px;
  gap: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;
  border: 1px solid #ffffff;
  background: rgba(255, 255, 255, 0.8);

  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04);
  backdrop-filter: blur(10px);
`;

export const MyCorrectAnswer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MyCorrectAnswerTitle = styled.div`
  color: #3277ed;
  text-align: center;

  font-size: 15px;
  font-weight: 600;
  line-height: 150%;
`;

export const MyCorrectAnswerPercent = styled.div`
  color: #ffffff;
  text-align: center;

  font-size: 32px;
  font-weight: 700;
  position: relative;

  &::before {
    content: attr(data-content);
    position: absolute;
    z-index: -1;
    -webkit-text-stroke: 11px #3277ed;
  }
`;

export const OtherCorrectAnswer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OtherCorrectAnswerTitle = styled.div`
  color: #9a9a9a;

  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
`;

export const OterhCorrectAnswerPercent = styled.div`
  color: #9a9a9a;
  text-align: center;

  font-size: 24px;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.12px;
`;
