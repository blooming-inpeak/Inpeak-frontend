import styled from 'styled-components';

interface Props {
  Record: boolean;
  setIsRecord: (check: boolean) => void;
}

export const RecordCheck = ({ Record, setIsRecord }: Props) => {
  return (
    <RecordCheckWrapper>
      <RecordCheckTitle>모의면접 영상 녹화</RecordCheckTitle>
      <RecordCheckToggle $isRecord={Record} onClick={() => setIsRecord(!Record)}>
        <RecordToggleIcon src="/images/ToggleButton.svg" alt="toggle Button" $isRecord={Record} />
      </RecordCheckToggle>
    </RecordCheckWrapper>
  );
};

export const RecordCheckWrapper = styled.div`
  width: 100%;
  padding: 12px 0;

  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ededed;
`;

export const RecordCheckTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.35px;
`;

export const RecordCheckToggle = styled.div.attrs<{ $isRecord: boolean }>(({ $isRecord }) => ({
  style: { backgroundColor: $isRecord ? '#72a6ff' : '#e6efff' },
}))`
  width: 32px;
  height: 18px;
  padding: 2px;
  border-radius: 100px;
  box-shadow: 0px 2px 4px 0px rgba(0, 80, 216, 0.08) inset;

  position: relative;
  transition: all 0.3s ease-out;
`;

export const RecordToggleIcon = styled.img.attrs<{ $isRecord: boolean }>(({ $isRecord }) => ({
  style: { [$isRecord ? 'right' : 'left']: '-1px' },
}))`
  position: absolute;
  bottom: -4px;
  cursor: pointer;
`;
