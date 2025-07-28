import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './index.css';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.ts';

// if (import.meta.env.DEV) {
//   const { worker } = await import('./mocks/browser');
//   await worker.start();
// }
if (import.meta.env.MODE === 'production') {
  const empty = () => {};
  console.log = empty;
  console.error = empty;
  console.debug = empty;
  console.warn = empty;
  console.info = empty;
}

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeProvider>
    </BrowserRouter>
  </RecoilRoot>,
);
