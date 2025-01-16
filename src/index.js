import '@mdi/font/css/materialdesignicons.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, NavLink } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './components/hooks/useTheme';
import { RenderProvider } from './components/internal/render';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<ThemeProvider>
		<BrowserRouter>
			<RenderProvider
				render={({ as, to }) => (as === 'navLink' || !!to ? NavLink : as)}
			>
				<App />
			</RenderProvider>
		</BrowserRouter>
	</ThemeProvider>,
);
