import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
interface EmptyStateProps {
  type: 'wrong' | 'answered';
}

export const EmptyState = ({ type }: EmptyStateProps) => {
  const naviagte = useNavigate();
  const onClickInterview = () => {
    naviagte('/interview/intro');
  };
  return (
    <Container>
      <EmptyImage src="/images/empty.svg" alt="빈 리스트" />
      <EmptyText>
        {type === 'wrong'
          ? `현재까지 진행된 모의면접 결과가 없습니다\n모의면접 연습하고 나만의 히스토리를 쌓아보세요`
          : `현재까지 진행된 모의면접 결과가 없습니다`}
      </EmptyText>
      {type === 'wrong' && <StartButton onClick={onClickInterview}>모의면접 시작하기</StartButton>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmptyImage = styled.img`
  width: 200px;
  height: 120px;
`;

const EmptyText = styled.p`
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  color: #747474;
  white-space: pre-line;
`;

const StartButton = styled.button`
  margin-top: 24px;
  width: 150px;
  height: 36px;
  border-radius: 100px;
  background: #3277ed;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.35px;
  border: none;
  cursor: pointer;
`;
