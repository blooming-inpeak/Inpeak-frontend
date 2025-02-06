import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage } from './pages/MainPage';
import { InterviewPage } from './pages/InterviewPage';
import { HistoryPage } from './pages/HistoryPage';
import { IntroPage } from './pages/interview/IntroPage';
import { SessionPage } from './pages/interview/SessionPage';
import { ResultPage } from './pages/interview/ResultPage';
import { MyPage } from './pages/MyPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/interview" element={<InterviewPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/interview/intro" element={<IntroPage />} />
      <Route path="/interview/session" element={<SessionPage />} />
      <Route path="/interview/result" element={<ResultPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
