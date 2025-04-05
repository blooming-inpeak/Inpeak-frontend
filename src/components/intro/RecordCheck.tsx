import styled from 'styled-components';
import { ToggleSwitch } from '../common/ToggleSwitch';

interface Props {
  Record: boolean;
  setIsRecord: (check: boolean) => void;
}

export const RecordCheck = ({ Record, setIsRecord }: Props) => {
  return (
    <RecordCheckWrapper>
      <RecordCheckTitle>모의면접 영상 녹화</RecordCheckTitle>
      <ToggleSwitch isChecked={Record} onClick={() => setIsRecord(!Record)} />
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
