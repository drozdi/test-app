import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mdi/font/scss/materialdesignicons.scss';
import './components/app.scss';
import App from './App';

//import 'primereact/resources/themes/vela-blue/theme.css';
//import './style/mytheme/theme.scss';
//import 'primeicons/primeicons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);