import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProviderWrapper } from './context/ThemeContext';
import { SnackbarProvider } from './components/NotificationSnackbar';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ThemeProviderWrapper>
  </React.StrictMode>
);
