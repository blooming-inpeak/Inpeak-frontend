import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import {
  MainPage,
  InterviewPage,
  HistoryPage,
  IntroPage,
  SessionPage,
  ProgessResultPage,
  MyPage,
  ContactPage,
} from './pages';
import Layout from './pages/Layout';
import { SelectStack } from './components/common/selectStack/SelectStack';
import AppInitializer from './AppInitializer';
import PrivateRoute from './routes/PrivateRoute';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginModalState } from './store/loginModal/loginModalState';
import { LoginModal } from './components/login/LoginModal';
import { useEffect } from 'react';
import { userState } from './store/auth/userState';
import { HistoryDetailPage } from './pages/HistoryDetailPage';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  const location = useLocation();
  const [isLoginModalOpen, setLoginModalOpen] = useRecoilState(loginModalState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (location.pathname === '/') {
      setLoginModalOpen(false);
    }
  }, [location.pathname, setLoginModalOpen]);

  return (
    <>
      <AppInitializer />
      <ScrollToTop />
      {isLoginModalOpen && !user && <LoginModal setOpenLogin={setLoginModalOpen} />}
      {location.search.includes('status=NEED_MORE_INFO') && <SelectStack autoVisible method="post" />}
      <Routes>
        <Route element={<Layout />}>
          {/* 비로그인 접근 가능 페이지 */}
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/detail/:answerId" element={<HistoryDetailPage />} />

          {/* 로그인시 접근 가능 페이지 */}
          <Route
            path="/interview/intro"
            element={
              <PrivateRoute>
                <IntroPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/interview/session/:id"
            element={
              <PrivateRoute>
                <SessionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/interview/progressresult"
            element={
              <PrivateRoute>
                <ProgessResultPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
