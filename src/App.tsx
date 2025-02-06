import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/interview" />
      <Route path="/history" />
      <Route path="/interview/intro" />
      <Route path="/interview/session" />
      <Route path="/interview/result" />
      <Route path="/mypage" />
      <Route path="/contact" />
    </Routes>
  );
}

export default App;
