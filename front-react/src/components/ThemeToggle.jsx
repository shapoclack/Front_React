import React from 'react';
import { useTheme } from '../context/ThemeContext';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <IconButton 
      onClick={toggleTheme} 
      color="inherit"
      aria-label="переключить тему"
      sx={{ ml: 1 }}
    >
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default ThemeToggle;
