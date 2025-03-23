import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowIcon from '/images/Arrow.svg';

interface SortDropdownProps {
  options: string[];
  defaultOption?: string;
  onChange?: (selectedOption: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ options, defaultOption = '최신순', onChange }) => {
  const [selected, setSelected] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <DropdownContainer>
      <DropdownButton isOpen={isOpen} onClick={handleToggle}>
        <span>{selected}</span>
        <ArrowIconWrapper isOpen={isOpen}>
          <img src={ArrowIcon} alt="arrow icon" />
        </ArrowIconWrapper>
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {options.map(option => (
            <DropdownMenuItem key={option} onClick={() => handleSelect(option)} isSelected={option === selected}>
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  width: 80px;
`;

interface DropdownButtonProps {
  isOpen: boolean;
}

const DropdownButton = styled.button<DropdownButtonProps>`
  width: 80px;
  height: 26px;
  padding: 0 8px;
  background: #fbfdff;
  border: 1px solid #3277ed;
  border-bottom: ${({ isOpen }) => (isOpen ? 'none' : '1px solid #3277ed')};
  border-radius: ${({ isOpen }) => (isOpen ? '4px 4px 0 0' : '4px')};

  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  outline: none;

  color: var(--brand-main, #3277ed);
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.3px;
`;

interface ArrowIconWrapperProps {
  isOpen: boolean;
}

const ArrowIconWrapper = styled.div<ArrowIconWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
  transition: transform 0.3s ease-in-out;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 24px;
  left: 0;
  width: 80px;

  margin: 0;
  padding: 4px 0;
  list-style: none;

  border: 1px solid #3277ed;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-sizing: border-box;

  background: #fbfdff;
`;

interface DropdownMenuItemProps {
  isSelected: boolean;
}

const DropdownMenuItem = styled.li<DropdownMenuItemProps>`
  width: 100%;
  padding: 4px 8px;
  box-sizing: border-box;

  font-size: 12px;
  font-weight: 500;
  color: ${({ isSelected }) => (isSelected ? '#3277ed' : '#212121')};
  background: ${({ isSelected }) => (isSelected ? '#e6efff' : 'transparent')};
  color: #3277ed;
  cursor: pointer;

  &:hover {
    background: #e6efff;
    color: #3277ed;
  }
`;
