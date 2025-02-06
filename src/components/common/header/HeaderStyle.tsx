import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;
  height: 6%;
  max-height: 62px;
  min-height: 50px;

  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  padding-top: 2px;

  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
`;

export const NavBar = styled.div`
  max-width: 1128px;
  max-height: 50px;
  width: 59%;
  height: 83%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderRight = styled.div`
  height: 100%;
  width: 63%;
  gap: 14%;

  display: flex;
`;

export const Logo = styled.img`
  width: 30%;
  cursor: pointer;
`;

export const MenuItems = styled.div`
  width: 34%;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;
  margin: 5px 0;
`;

export const Divider = styled.div`
  width: 1px;
  height: 16px;

  background-color: #e6efff;
  background-blend-mode: multiply;
`;

export const MenuItem = styled.div`
  width: 44%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: clamp(13px, 1vw, 16px);
  font-weight: 500;
  line-height: 130%;
  letter-spacing: -0.4px;

  cursor: pointer;
`;

export const HeaderLeft = styled.div`
  width: 13%;
  height: 72%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
