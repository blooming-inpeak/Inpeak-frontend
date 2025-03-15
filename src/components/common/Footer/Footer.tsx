import styled from 'styled-components';

interface FooterProps {
  variant?: string;
}

function Footer({ variant }: FooterProps) {
  return <FooterContainer variant={variant}>© 2025 Team Blooming All rights reserved.</FooterContainer>;
}

export default Footer;

const FooterContainer = styled.div<FooterProps>`
  width: 100%;
  min-height: 300px;
  padding: 70px 190px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  background: ${({ variant }) => (variant === 'white' ? '#ffffff' : '#f2f2f2')};
  color: #747474;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.4px;
`;
