import '@mdi/font/css/materialdesignicons.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './components/hooks/useTheme';
import { RenderProvider } from './components/internal/render';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<ThemeProvider>
		<BrowserRouter>
			<RenderProvider link="a1" link2="a3">
				<App />
			</RenderProvider>
		</BrowserRouter>
	</ThemeProvider>,
);
