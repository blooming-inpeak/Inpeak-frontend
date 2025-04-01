import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/common/header/Header';
import styled from 'styled-components';
import { FloatingContactButton } from '../components/common/FloatingContactButton';
import { useEffect, useState } from 'react';

const Layout = () => {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);

  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > 555) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      window.addEventListener('scroll', controlHeader);
    }

    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [location.pathname]);

  return (
    <LayoutContainer>
      <Header isState={showHeader ? 'show' : 'hidden'} />
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
