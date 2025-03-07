import styled from 'styled-components';

interface InterviewChanceProps {
  chance: number;
}

export const InterviewChance: React.FC<InterviewChanceProps> = ({ chance }) => {
  return (
    <InterviewChanceWrapper>
      <InterviewChanceTitle>남은 면접 기회</InterviewChanceTitle>
      <InterviewChanceNumber>{chance}회</InterviewChanceNumber>
    </InterviewChanceWrapper>
  );
};

const InterviewChanceWrapper = styled.div`
  display: flex;
  width: 140px;
  height: 91px;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  padding-right: 30px;
  border-radius: 12px;
  border: 1px solid #ffffff;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
`;

const InterviewChanceTitle = styled.div`
  color: #212121;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
`;

const InterviewChanceNumber = styled.div`
  color: #0050db;
  font-size: 20px;
  font-weight: 600;
  line-height: 150%;
`;
