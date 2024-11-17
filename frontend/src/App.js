import React, { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes, useNavigate } from 'react-router-dom';
import Router from './routes/Router';
import { baselightTheme } from './theme/DefaultColors';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './styles/custom.css';

function App() {
  const navigate = useNavigate();
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      navigate('/auth/login');
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
      <ToastContainer autoClose={2000} />
    </ThemeProvider>
  );
}

export default App;

export const BASE_PART = 'http://localhost:9090';
