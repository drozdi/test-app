import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@mdi/font/scss/materialdesignicons.scss';
import './components/app.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
      primary: {
          main: '#1976D2',
      },
      secondary: {
          main: '#5cbbf6',
      },
      accent: {
          main: '#9C27B0',
      },
      positive: {
          main: '#4caf50',
      },
      negative: {
          main: '#dc3545',
      },
      info: {
          main: '#2196f3',
      },
      warning: {
          main: '#fb8c00',
      },
      divider: 'rgba(255, 255, 255, .15)',
      background: {
          default: '#002650',
      },
      text: {
          default: 'rgba(255,255,255,0.7)'
      }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
