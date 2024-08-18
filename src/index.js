import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mdi/font/scss/materialdesignicons.scss';
import './components/app.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);