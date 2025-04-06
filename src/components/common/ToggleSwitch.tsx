import styled from 'styled-components';

interface ToggleProps {
  isChecked: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const ToggleSwitch = ({ isChecked, onClick, disabled = false }: ToggleProps) => {
  return (
    <ToggleWrapper $isChecked={isChecked} $disabled={disabled} onClick={!disabled ? onClick : undefined}>
      <Slider $isChecked={isChecked} />
    </ToggleWrapper>
  );
};

const ToggleWrapper = styled.div<{ $isChecked: boolean; $disabled?: boolean }>`
  width: 36px;
  height: 22px;
  background-color: ${({ $isChecked }) => ($isChecked ? '#72a6ff' : '#fafafa')};
  box-shadow: 0px 2px 4px 0px rgba(0, 80, 216, 0.08) inset;
  border-radius: 30px;
  position: relative;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: background-color 0.3s ease-in-out;
`;

const Slider = styled.div<{ $isChecked: boolean }>`
  position: absolute;
  top: 50%;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isChecked }) => ($isChecked ? 'translate(16px, -50%)' : 'translate(2px, -50%)')};
  filter: drop-shadow(0px 2px 4px rgba(0, 80, 216, 0.08));
`;
