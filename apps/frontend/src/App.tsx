import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Switch, Button } from '@mui/material';
import { getTheme } from './theme';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import './i18n';

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [page, setPage] = useState<'dashboard' | 'settings'>('dashboard');

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>Train Simulator UI</Typography>
          <Button color="inherit" onClick={() => setPage('dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => setPage('settings')}>Settings</Button>
          <Switch checked={mode === 'dark'} onChange={() => setMode(mode === 'light' ? 'dark' : 'light')} />
        </Toolbar>
      </AppBar>
      {page === 'dashboard' ? <DashboardPage /> : <SettingsPage />}
    </ThemeProvider>
  );
};

export default App;