import styled from 'styled-components';

interface Props {
  name: string;
  setCurrentMic: (mic: string) => void;
  isClose: () => void;
}

export const MicList = ({ name, setCurrentMic, isClose }: Props) => {
  const onClickMic = () => {
    setCurrentMic(name);
    isClose();
  };
  return <MicListWrapper onClick={onClickMic}>{name}</MicListWrapper>;
};

export const MicListWrapper = styled.div`
  width: 232px;
  padding: 4px 10px;

  color: #3277ed;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.3px;

  background-color: rgba(214, 230, 255, 0.2);
  cursor: pointer;
`;
