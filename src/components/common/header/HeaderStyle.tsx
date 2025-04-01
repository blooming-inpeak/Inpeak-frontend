import styled from 'styled-components';

export const HeaderContainer = styled.div<{ $isState: string }>`
  width: 100%;
  height: 60px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  padding-top: 2px;

  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(10px);

  transition: all 0.3s ease-in-out;

  transform: ${({ $isState }) => ($isState === 'show' ? 'translateY(0)' : 'translateY(-100%)')};
  opacity: ${({ $isState }) => ($isState === 'show' ? 1 : 0)};
`;

export const NavBar = styled.div`
  width: 1128px;
  height: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderRight = styled.div`
  height: 100%;
  width: 714px;
  gap: 90px;

  display: flex;
`;

export const Logo = styled.img`
  width: 152.245px;
  cursor: pointer;
`;

export const MenuItems = styled.div`
  height: 100%;

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
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 25px;
  margin: 0 10px;

  font-size: 16px;
  font-weight: 500;
  line-height: 130%;
  letter-spacing: -0.4px;

  cursor: pointer;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
