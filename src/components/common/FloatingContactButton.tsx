import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContactIcon from '/images/contacticon.svg';
import { useState } from 'react';
import ContactSvg from './ContactSvg';

export const FloatingContactButton = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      onClick={() => navigate('/contact')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <Tooltip>
          <ContactSvg />
        </Tooltip>
      )}
      <img src={ContactIcon} alt="Contact" />
    </Button>
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 50px;
  right: 40px;
  width: 70px;
  height: 70px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.brand.main};
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  padding: 15px;
  z-index: 9999;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  z-index: 10000;
`;
