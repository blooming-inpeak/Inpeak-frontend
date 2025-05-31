import React from 'react';
import styled from 'styled-components';
import LevelModalClose from '../../../assets/img/LevelModalClose.svg';

// 레벨 데이터 정의
const levelImages = [
  {
    src: '/src/assets/img/level/level_mono/Lv.0.png',
    prefix: 'Lv.',
    suffix: '0',
    height: 6,
    platformColor: '#FFE6E8',
  },
  {
    src: '/src/assets/img/level/level_mono/Lv.1~2.png',
    prefix: 'Lv.',
    suffix: '1~2',
    height: 18,
    platformColor: '#FFD0D4',
  },
  {
    src: '/src/assets/img/level/level_mono/Lv.3~4.png',
    prefix: 'Lv.',
    suffix: '3~4',
    height: 30,
    platformColor: '#FFBAC8',
  },
  {
    src: '/src/assets/img/level/level_mono/Lv.5~7.png',
    prefix: 'Lv.',
    suffix: '5~7',
    height: 42,
    platformColor: '#FFA1B9',
  },
  {
    src: '/src/assets/img/level/level_mono/Lv.8~10.png',
    prefix: 'Lv.',
    suffix: '8~10',
    height: 54,
    platformColor: '#FF90B3',
  },
];

interface Props {
  onClose: () => void;
}

interface LevelItemProps {
  src: string;
  prefix: string;
  suffix: string;
  height: number;
  platformColor: string;
}

const LevelItem: React.FC<LevelItemProps> = ({ src, prefix, suffix, height, platformColor }) => {
  return (
    <LevelItemWrapper>
      <Character src={src} alt={`${prefix} ${suffix}`} loading="eager" />
      <Platform height={height} platformColor={platformColor}></Platform>
      <LevelLabel>
        <Blue>{prefix}</Blue>
        <Black>{suffix}</Black>
      </LevelLabel>
    </LevelItemWrapper>
  );
};

export const LevelModal: React.FC<Props> = ({ onClose }) => {
  return (
    <Overlay>
      <ModalWrapper>
        <ModalBox>
          <CloseButton onClick={onClose}>
            <img src={LevelModalClose} alt="닫기" />
          </CloseButton>

          <LevelsWrapper>
            {levelImages.map((item, idx) => (
              <LevelItem
                key={idx}
                src={item.src}
                prefix={item.prefix}
                suffix={item.suffix}
                height={item.height}
                platformColor={item.platformColor}
              />
            ))}
          </LevelsWrapper>

          <TextBox>
            <ul>
              <li>본 서비스는 0레벨(0 XP)부터 10레벨(1350 XP)까지의 경험치 기반 레벨링 시스템을 적용합니다.</li>
              <li>정답을 맞출 경우 10점 및 해당 점수에 비례한 경험치가 부여됩니다.</li>
              <li>오답을 제출할 경우 5점 및 해당 점수에 비례한 경험치가 부여됩니다.</li>
              <li>포기(답변 미제출) 시 점수 및 경험치가 부여되지 않습니다.</li>
              <li>최대 레벨 10 도달 이후에는 경험치가 누적됩니다.</li>
            </ul>
          </TextBox>
        </ModalBox>
      </ModalWrapper>
    </Overlay>
  );
};

export default LevelModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  display: flex;
  width: 500px;
  height: 340.59px;
  padding: 24px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0px 0px 24px 0px rgba(50, 59, 84, 0.24);
  position: relative;
  box-sizing: border-box;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  box-sizing: border-box;
  position: relative;
`;

const LevelsWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const LevelItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const Character = styled.img`
  width: 80px;
  height: auto;
`;

const Platform = styled.div<{ height: number; platformColor: string }>`
  width: 80px;
  height: ${({ height }) => height}px;
  background: ${({ platformColor }) => platformColor};
`;

const LevelLabel = styled.div`
  font-weight: 500;
  margin-top: 8px;
`;

const Blue = styled.span`
  font-size: 10px;
  color: #1e4ce9;
`;

const Black = styled.span`
  font-size: 14px;
  color: #212121;
`;

const TextBox = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;

  ul {
    padding-left: 12px;
    margin: 0;
  }

  li {
    color: var(--text-100, #212121);
    font-size: 10px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.25px;
  }
`;

const CloseButton = styled.button`
  cursor: pointer;
  padding: 0;
  margin-bottom: 2.59px;
`;
