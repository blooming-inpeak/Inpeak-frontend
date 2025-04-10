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
import { ResultPage } from './pages/interview/ResultPage';
import { SelectStack } from './components/common/selectStack/SelectStack';
import AppInitializer from './AppInitializer';
import PrivateRoute from './routes/PrivateRoute';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginModalState } from './store/loginModal/loginModalState';
import { LoginModal } from './components/login/LoginModal';
import { useEffect } from 'react';
import { userState } from './store/auth/userState';

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
      {isLoginModalOpen && !user && <LoginModal setOpenLogin={setLoginModalOpen} />}
      <SelectStack />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/interview"
            element={
              <PrivateRoute>
                <InterviewPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <HistoryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <ContactPage />
              </PrivateRoute>
            }
          />
        </Route>
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
        <Route
          path="/interview/result"
          element={
            <PrivateRoute>
              <ResultPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
