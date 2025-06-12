import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/common/header/Header';
import styled from 'styled-components';
import { FloatingContactButton } from '../components/common/FloatingContactButton';
import { useEffect, useState } from 'react';

const Layout = () => {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState<true | false | null>(null);

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
      controlHeader(); // 진입 직후 바로 판단
    } else {
      setShowHeader(true); // 다른 페이지는 무조건 헤더 보이기
    }

    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [location.pathname]);

  if (showHeader === null) return null;

  return (
    <LayoutContainer>
      <Header isState={showHeader ? 'show' : 'hidden'} />
      <MainContent>
        <Outlet />
        {location.pathname !== '/contact' && <FloatingContactButton />}
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
