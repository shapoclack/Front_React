import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProviderWrapper } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from './components/NotificationSnackbar';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProviderWrapper>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeProviderWrapper>
    </AuthProvider>
  </React.StrictMode>
);
