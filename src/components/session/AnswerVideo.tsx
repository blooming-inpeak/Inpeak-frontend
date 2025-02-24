import styled from 'styled-components';

export const AnswerVideo = () => {
  return (
    <BeforeVideoWrapper>
      <video muted autoPlay loop style={{ width: '100%', height: '100%' }}>
        <source src={`/images/answerInpeak.mp4`} type="video/mp4" />
      </video>
    </BeforeVideoWrapper>
  );
};

export const BeforeVideoWrapper = styled.div`
  width: 160px;
  height: 160px;

  margin-top: 50px;
`;
