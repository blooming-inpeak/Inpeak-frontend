import React from 'react';
import styled from 'styled-components';

interface AdjustedProps {
  adjusted?: 'small' | 'large';
  isGray?: boolean;
  isBlue?: boolean;
  strokeGray?: boolean;
  heading?: boolean;
}

interface CorrectAnswerProps {
  cumulative?: number;
  average?: number;
}

interface CorrectAnswerWrapperProps {
  onlyAverage?: boolean;
}

export const CorrectAnswer: React.FC<CorrectAnswerProps> = ({ cumulative = 0, average = 0 }) => {
  if (!cumulative) {
    return (
      <CorrectAnswerWrapper onlyAverage>
        <OtherCorrectAnswer>
          <OtherCorrectAnswerTitle>평균 정답률</OtherCorrectAnswerTitle>
          <OtherCorrectAnswerPercent
            adjusted="small"
            strokeGray
            data-content={`${average}%`} // data-content를 stroke 및 fill 모두에서 사용
          >
            {average}%
          </OtherCorrectAnswerPercent>
        </OtherCorrectAnswer>
      </CorrectAnswerWrapper>
    );
  } else if (cumulative < average) {
    // 평균 정답률이 누적 정답률보다 클 때 -> heading prop을 전달하여 stroke 효과와 32px 크기 적용
    return (
      <CorrectAnswerWrapper>
        <MyCorrectAnswer>
          <MyCorrectAnswerTitle>누적 정답률</MyCorrectAnswerTitle>
          <MyCorrectAnswerPercent data-content={`${cumulative}%`} adjusted="small" isBlue>
            {cumulative}%
          </MyCorrectAnswerPercent>
        </MyCorrectAnswer>

        <img src="/src/assets/img/AnswersignGray.svg" alt="Sign" />

        <OtherCorrectAnswer>
          <OtherCorrectAnswerTitle>평균 정답률</OtherCorrectAnswerTitle>
          <OtherCorrectAnswerPercent
            adjusted="small" // adjusted prop는 전달되지만 heading prop 오버라이드됨
            heading // heading prop을 전달하여 stroke 효과 및 크기 강제 적용
            isBlue
            data-content={`${average}%`} // 가상 요소와 fill 모두에 동일 텍스트 전달
          >
            {average}%
          </OtherCorrectAnswerPercent>
        </OtherCorrectAnswer>
      </CorrectAnswerWrapper>
    );
  } else if (cumulative > average) {
    return (
      <CorrectAnswerWrapper>
        <MyCorrectAnswer>
          <MyCorrectAnswerTitle>누적 정답률</MyCorrectAnswerTitle>
          <MyCorrectAnswerPercent data-content={`${cumulative}%`}>{cumulative}%</MyCorrectAnswerPercent>
        </MyCorrectAnswer>

        <img src="/src/assets/img/AnswersignBlue.svg" alt="Sign" />

        <OtherCorrectAnswer>
          <OtherCorrectAnswerTitle>평균 정답률</OtherCorrectAnswerTitle>
          <OtherCorrectAnswerPercent adjusted="small" strokeGray data-content={`${average}%`}>
            {average}%
          </OtherCorrectAnswerPercent>
        </OtherCorrectAnswer>
      </CorrectAnswerWrapper>
    );
  } else {
    return (
      <CorrectAnswerWrapper>
        <MyCorrectAnswer>
          <MyCorrectAnswerTitle>누적 정답률</MyCorrectAnswerTitle>
          <MyCorrectAnswerPercent data-content={`${cumulative}%`}>{cumulative}%</MyCorrectAnswerPercent>
        </MyCorrectAnswer>

        <img src="/src/assets/img/AnswersignBlue.svg" alt="Sign" />

        <OtherCorrectAnswer>
          <OtherCorrectAnswerTitle isBlue>평균 정답률</OtherCorrectAnswerTitle>
          <OtherCorrectAnswerPercent isBlue data-content={`${average}%`}>
            {average}%
          </OtherCorrectAnswerPercent>
        </OtherCorrectAnswer>
      </CorrectAnswerWrapper>
    );
  }
};

export const CorrectAnswerWrapper = styled.div<CorrectAnswerWrapperProps>`
  width: ${props => (props.onlyAverage ? '144px' : '259px')};
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

export const MyCorrectAnswerTitle = styled.div<AdjustedProps>`
  color: ${props => (props.isGray ? '#9a9a9a' : '#3277ed')};
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  line-height: 150%;
`;

export const MyCorrectAnswerPercent = styled.div<AdjustedProps>`
  color: ${props => (props.isBlue ? '#3277ed' : props.isGray ? '#9a9a9a' : '#ffffff')};
  text-align: center;
  font-size: ${props => (props.adjusted === 'small' ? '24px' : '32px')};
  font-weight: 700;
  position: relative;
  &::before {
    content: attr(data-content);
    position: absolute;
    z-index: -1;
    -webkit-text-stroke: ${props =>
      props.isBlue
        ? '0px transparent'
        : props.isGray
        ? props.adjusted === 'small'
          ? '8px #9a9a9a'
          : '11px #9a9a9a'
        : props.adjusted === 'small'
        ? '8px #3277ed'
        : '11px #3277ed'};
  }
`;

export const OtherCorrectAnswer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OtherCorrectAnswerTitle = styled.div<AdjustedProps>`
  color: ${props => (props.isBlue ? '#3277ed' : '#9a9a9a')};
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
`;

export const OtherCorrectAnswerPercent = styled.div<AdjustedProps>`
  position: relative;
  display: inline-block;
  text-align: center;
  font-size: ${props => (props.heading ? '32px' : props.adjusted === 'small' ? '24px' : '32px')};
  font-weight: 700;
  color: ${props => (props.heading ? '#ffffff' : props.isBlue ? '#3277ed' : '#9a9a9a')};

  &::before {
    content: attr(data-content);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    ${props =>
      props.heading &&
      `
        -webkit-text-stroke: 11px rgb(135, 135, 135);
        -webkit-text-fill-color: transparent;
      `}
  }
`;
