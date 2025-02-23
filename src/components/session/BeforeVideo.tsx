import styled from 'styled-components';

interface Props {
  start: boolean;
}

export const BeforeVideo = ({ start }: Props) => {
  return (
    <BeforeVideoWrapper>
      <video key={start ? 'answerInpeak' : 'inpeak'} muted autoPlay loop style={{ width: '100%', height: '100%' }}>
        <source src={`/images/${start ? 'answerInpeak' : 'inpeak'}.mp4`} type="video/mp4" />
      </video>
    </BeforeVideoWrapper>
  );
};

export const BeforeVideoWrapper = styled.div`
  width: 160px;
  height: 160px;

  margin-top: 50px;
`;
