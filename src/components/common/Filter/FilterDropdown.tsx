import { useState } from 'react';
import styled from 'styled-components';

export const FilterDropdown = ({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        <span>{label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
        >
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#3277ED" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          <SelectedOption>{value}</SelectedOption>
          <OptionsDivider />
          <OptionsContainer>
            {options.map(option => (
              <DropdownItem
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                isSelected={value === option}
              >
                {option}
              </DropdownItem>
            ))}
          </OptionsContainer>
          <BottomDivider />
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  width: 83px;
  padding: 4px 6px 4px 10px;
  justify-content: space-between;
  align-items: center;
  background: #fbfdff;
  border: 1px solid #3277ed;
  border-radius: 4px;
  cursor: pointer;

  span {
    color: var(--brand-main, #3277ed);
    font-family: 'Pretendard Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.3px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #e6efff;
  border: 1px solid var(--brand-main, #3277ed);
  border-radius: 4px;
  margin-top: 4px;
  z-index: 1000;
  overflow: hidden;
`;

const SelectedOption = styled.div`
  width: 100%;
  padding: 6px 10px;
  color: var(--brand-main, #3277ed);
  font-family: 'Pretendard Variable';
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.3px;
  background: var(--sementic-standard-400, #e6efff);
`;

const OptionsDivider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--brand-subtle, #c3daff);
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: 6px 10px;
  text-align: left;
  border: none;
  background: #fbfdff;
  color: var(--brand-main, #3277ed);
  font-family: 'Pretendard Variable';
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.3px;
  cursor: pointer;
`;

const BottomDivider = styled.div`
  width: 70px;
  height: 1px;
  margin: 0 auto;
  background: var(--sementic-standard-100, #e6efff);
`;
