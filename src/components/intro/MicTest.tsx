import styled from 'styled-components';
import { MicLevel } from './MicLevel';
import { MicVolumeSlide } from './MicVolumeSlide';

interface Props {
  volume: number;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  audioLevel: number;
  closeMicTest: () => void;
}

export const MicTest = ({ volume, handleVolumeChange, audioLevel, closeMicTest }: Props) => {
  return (
    <MicTestWrapper>
      <MicTestTitle>적정한 입력 레벨이 나올때까지 입력 볼륨을 조절해주세요</MicTestTitle>

      <MicTestLevel>
        입력 레벨 <MicLevel audioLevel={audioLevel} />
      </MicTestLevel>

      <MicTestVolume>
        입력 볼륨 <MicVolumeSlide volume={volume} handleVolumeChange={handleVolumeChange} />
      </MicTestVolume>

      <MicTestComplete onClick={closeMicTest}>완료</MicTestComplete>
    </MicTestWrapper>
  );
};

export const MicTestWrapper = styled.div`
  width: 236px;
  height: 134px;

  padding: 32px 32px 24px 32px;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  background-color: #ffffff;
  box-shadow: 100px 100px 100px 0px rgba(0, 0, 0, 0.02), 2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 100px 0px rgba(0, 80, 216, 0.08);
`;

export const MicTestTitle = styled.div`
  color: #212121;

  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.35px;

  margin-bottom: 12px;
`;

export const MicTestLevel = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;

  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.3px;

  margin-bottom: 4px;
`;

export const MicTestVolume = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;

  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.3px;

  margin-bottom: 16px;
`;

export const MicTestComplete = styled.div`
  width: 34px;
  height: 24px;
  padding: 0 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100px;
  background-color: #3277ed;

  color: #ffffff;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.25px;
`;
