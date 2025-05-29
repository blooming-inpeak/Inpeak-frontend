import React from 'react';
import styled from 'styled-components';
import AnswerSignGray from '../../assets/img/AnswersignGray.svg';
import AnswerSignBlue from '../../assets/img/AnswersignBlue.svg';
import AnswerSignEqual from '../../assets/img/AnswersignEqual.svg';

interface AdjustedProps {
  adjusted?: 'small' | 'large';
  isGray?: boolean;
  isBlue?: boolean;
  strokeGray?: boolean;
  heading?: boolean;
  isOnlyAverage?: boolean;
}

interface CorrectAnswerProps {
  cumulative?: number;
  average?: number;
}

interface CorrectAnswerWrapperProps {
  onlyAverage?: boolean;
  averageGreater?: boolean;
}

export const CorrectAnswer: React.FC<CorrectAnswerProps> = ({ cumulative = 0, average = 0 }) => {
  if (!cumulative) {
    return (
      <CorrectAnswerWrapper onlyAverage>
        <OtherCorrectAnswer>
          <OtherCorrectAnswerTitle>평균 정답률</OtherCorrectAnswerTitle>
          <OtherCorrectAnswerPercent isOnlyAverage data-content={`${average}%`}>
            {average}%
          </OtherCorrectAnswerPercent>
        </OtherCorrectAnswer>
      </CorrectAnswerWrapper>
    );
  } else if (cumulative < average) {
    return (
      <CorrectAnswerWrapper averageGreater={true}>
        <MyCorrectAnswer>
          <MyCorrectAnswerTitle>누적 정답률</MyCorrectAnswerTitle>
          <MyCorrectAnswerPercent data-content={`${cumulative}%`} adjusted="small" isBlue>
            {cumulative}%
          </MyCorrectAnswerPercent>
        </MyCorrectAnswer>

        <img src={AnswerSignGray} alt="Sign" />

        <OtherCorrectAnswer>
          <OtherCorrectAnswerTitle>평균 정답률</OtherCorrectAnswerTitle>
          <OtherCorrectAnswerPercent adjusted="small" heading isBlue data-content={`${average}%`}>
            {average}%
          </OtherCorrectAnswerPercent>
        </OtherCorrectAnswer>
      </CorrectAnswerWrapper>
    );
  } else if (cumulative > average) {
    return (
      <CorrectAnswerWrapper averageGreater={false}>
        <MyCorrectAnswer>
          <MyCorrectAnswerTitle>누적 정답률</MyCorrectAnswerTitle>
          <MyCorrectAnswerPercent data-content={`${cumulative}%`}>{cumulative}%</MyCorrectAnswerPercent>
        </MyCorrectAnswer>

        <img src={AnswerSignBlue} alt="Sign" />

        <OtherCorrectAnswer>
          <OtherCorrectAnswerTitle>평균 정답률</OtherCorrectAnswerTitle>
          <OtherCorrectAnswerPercent adjusted="small" data-content={`${average}%`}>
            {average}%
          </OtherCorrectAnswerPercent>
        </OtherCorrectAnswer>
      </CorrectAnswerWrapper>
    );
  } else if (cumulative === average) {
    return (
      <CorrectAnswerWrapper averageGreater={false}>
        <MyCorrectAnswer>
          <MyCorrectAnswerTitle>누적 정답률</MyCorrectAnswerTitle>
          <MyCorrectAnswerPercent data-content={`${cumulative}%`}>{cumulative}%</MyCorrectAnswerPercent>
        </MyCorrectAnswer>

        <img src={AnswerSignEqual} alt="Sign" />

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
      <CorrectAnswerWrapper averageGreater={false}>
        <MyCorrectAnswer>
          <MyCorrectAnswerTitle>누적 정답률</MyCorrectAnswerTitle>
          <MyCorrectAnswerPercent data-content={`${cumulative}%`}>{cumulative}%</MyCorrectAnswerPercent>
        </MyCorrectAnswer>

        <img src={AnswerSignBlue} alt="Sign" />

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
  width: ${props => (props.onlyAverage ? '150px' : props.averageGreater ? '310px' : '310px')}; // 임의로 넓힘
  height: 120px;
  gap: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid #ffffff;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  padding: ${props => (props.onlyAverage ? '20px 40px' : '20px 35px 20px 45px')};
`;

export const MyCorrectAnswer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
        ? '6px #3277ed'
        : '6px #3277ed'};
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
  display: ${props => (props.isOnlyAverage ? 'flex' : 'inline-block')};
  align-items: ${props => (props.isOnlyAverage ? 'center' : 'initial')};
  justify-content: ${props => (props.isOnlyAverage ? 'center' : 'initial')};
  text-align: center;
  font-size: ${props =>
    props.isOnlyAverage ? '32px' : props.heading ? '32px' : props.adjusted === 'small' ? '24px' : '32px'};
  font-weight: 700;
  color: ${props => (props.isOnlyAverage ? '#FFF' : props.heading ? '#ffffff' : props.isBlue ? '#3277ed' : '#9a9a9a')};

  &::before {
    content: attr(data-content);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    ${props =>
      props.isOnlyAverage
        ? `
          color: transparent;
          -webkit-text-stroke: 6px #9A9A9A;
        `
        : props.heading || props.strokeGray
        ? `
          -webkit-text-stroke: 6px #9A9A9A;
          -webkit-text-fill-color: transparent;
        `
        : ''}
  }
`;
