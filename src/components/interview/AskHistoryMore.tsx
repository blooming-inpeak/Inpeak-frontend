import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const AskHistoryMore = () => {
  const navigate = useNavigate();

  const onClickHistory = () => {
    navigate('/history');
  };
  return (
    <AskHistoryMoreWrapper>
      <AskHistoryMoreIcon>
        <img src="/images/More.svg" alt="more icon" />
        <img src="/images/More.svg" alt="more icon" />
        <img src="/images/More.svg" alt="more icon" />
      </AskHistoryMoreIcon>

      <AskHistroyMoreButton onClick={onClickHistory}>전체 히스토리 보러가기</AskHistroyMoreButton>
    </AskHistoryMoreWrapper>
  );
};

export const AskHistoryMoreWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AskHistoryMoreIcon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const AskHistroyMoreButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  color: #747474;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.3px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;

  cursor: pointer;
`;
