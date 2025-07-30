import styled from 'styled-components';

interface ToggleProps {
  isChecked: boolean;
  onClick: () => void;
  disabled?: boolean;
  shouldAnimate: boolean;
}

export const ToggleSwitch = ({ isChecked, onClick, disabled, shouldAnimate }: ToggleProps) => {
  return (
    <ToggleWrapper
      $isChecked={isChecked}
      $disabled={disabled}
      $animate={shouldAnimate}
      onClick={!disabled ? onClick : undefined}
    >
      <Slider $isChecked={isChecked} $animate={shouldAnimate} />
    </ToggleWrapper>
  );
};

const ToggleWrapper = styled.div<{ $isChecked: boolean; $disabled?: boolean; $animate: boolean }>`
  width: 36px;
  height: 22px;
  background-color: ${({ $isChecked, theme }) => ($isChecked ? theme.colors.blue800 : theme.colors.sementic.light400)};
  box-shadow: 0px 2px 4px 0px rgba(0, 80, 216, 0.08) inset;
  border-radius: 30px;
  position: relative;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: ${({ $animate }) => ($animate ? 'background-color 0.3s ease-in-out' : 'none')};
`;

const Slider = styled.div<{ $isChecked: boolean; $animate: boolean }>`
  position: absolute;
  top: 50%;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: white;
  transition: ${({ $animate }) => ($animate ? 'transform 0.3s ease-in-out' : 'none')};
  transform: ${({ $isChecked }) => ($isChecked ? 'translate(16px, -50%)' : 'translate(2px, -50%)')};
  filter: drop-shadow(0px 2px 4px rgba(0, 80, 216, 0.08));
`;
