import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './index.css';

if (import.meta.env.MODE === 'development') {
  const noop = () => {};
  console.log = noop;
  console.error = noop;
  console.debug = noop;
  console.warn = noop;
  console.info = noop;
}

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </RecoilRoot>,
);
