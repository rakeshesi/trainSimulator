import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      error: { main: '#d32f2f' },
      warning: { main: '#ffa000' },
      background: {
        default: mode === 'light' ? '#f8f9fb' : '#222',
        paper: mode === 'light' ? '#fff' : '#333',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
    },
  });