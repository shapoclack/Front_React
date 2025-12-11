import React, { createContext, useContext, useState } from 'react';
import './NotificationSnackbar.css';

const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => {
      setSnackbar({ open: false, message: '', severity: 'info' });
    }, 3000);
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'info' });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.open && (
        <div className={`snackbar snackbar-${snackbar.severity}`}>
          <span>{snackbar.message}</span>
          <button onClick={closeSnackbar} className="snackbar-close">✕</button>
        </div>
      )}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar должен использоваться внутри SnackbarProvider');
  }
  return context;
}
