import '@mdi/font/css/materialdesignicons.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './hooks/useTheme';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<ThemeProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ThemeProvider>,
);
