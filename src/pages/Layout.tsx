import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/header/Header';
import styled from 'styled-components';
import { FloatingContactButton } from '../components/common/FloatingContactButton';

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Outlet />
        <FloatingContactButton />
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 62px;

  position: relative;
`;
