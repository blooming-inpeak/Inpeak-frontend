import { Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/interview/intro" element={<IntroPage />} />
      <Route path="/interview/session" element={<SessionPage />} />
      <Route path="/interview/progressresult" element={<ProgessResultPage />} />
      <Route path="/interview/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
