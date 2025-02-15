import styled from 'styled-components';

export const AskHistory = () => {
  return <AskHistoryWrapper></AskHistoryWrapper>;
};

export const AskHistoryWrapper = styled.div`
  width: 549px;
  height: 422px;
  padding: 40px 50px;

  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04);
  backdrop-filter: blur(10px);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
