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
import { loginModalState } from './store/loginModal/loginModalState';
import { LoginModal } from './components/login/LoginModal';
import { useRecoilState } from 'recoil';
import { HistoryDetailPage } from './pages/HistoryDetailPage';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  const location = useLocation();
  const [isLoginModalOpen, setLoginModalOpen] = useRecoilState(loginModalState);

  return (
    <>
      <AppInitializer />
      <ScrollToTop />
      {isLoginModalOpen && <LoginModal setOpenLogin={setLoginModalOpen} />}
      {location.search.includes('status=NEED_MORE_INFO') && <SelectStack autoVisible method="post" />}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/history" element={<HistoryPage />} />

          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/history/detail/:answerId"
            element={
              <PrivateRoute>
                <HistoryDetailPage />
              </PrivateRoute>
            }
          />
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
