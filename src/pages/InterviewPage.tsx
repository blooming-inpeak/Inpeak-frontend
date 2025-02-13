import styled from 'styled-components';

export const InterviewPage = () => {
  return <InterviewWrapper></InterviewWrapper>;
};

export const InterviewWrapper = styled.div`
  width: 100%;
  height: 544px;

  position: fixed;
  top: 0;

  display: flex;
  flex-direction: column;

  background: conic-gradient(
      from 249deg at 62.92% 24.08%,
      rgba(214, 230, 255, 0.2) 0deg,
      rgba(214, 230, 255, 0.37) 184.7779369354248deg,
      rgba(214, 230, 255, 0.5) 360deg
    ),
    var(--system-info-subtle, #72a6ff);
`;
