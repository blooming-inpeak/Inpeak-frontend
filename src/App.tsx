import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage, InterviewPage, HistoryPage, IntroPage, SessionPage, ResultPage, MyPage, ContactPage } from './pages';
import { Header } from './components/common/header/Header';

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/interview/intro" element={<IntroPage />} />
        <Route path="/interview/session" element={<SessionPage />} />
        <Route path="/interview/result" element={<ResultPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;
