import styled from 'styled-components';

export const InterviewChance = () => {
  return (
    <InterviewChanceWrapper>
      <InterviewChanceTitle>남은 면접 기회</InterviewChanceTitle>
      <InterviewChanceNumber>1회</InterviewChanceNumber>
    </InterviewChanceWrapper>
  );
};

export const InterviewChanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 12px 20px 10px 20px;

  border-radius: 12px;
  border: 1px solid #ffffff;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04);
  backdrop-filter: blur(10px);
`;

export const InterviewChanceTitle = styled.div`
  color: #212121;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
`;

export const InterviewChanceNumber = styled.div`
  color: #0050db;
  font-size: 20px;
  font-weight: 600;
  line-height: 150%;
`;
