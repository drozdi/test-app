import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../../../App';
import { Movies } from '../../../pages/Movies';
import { routesName, routesPath } from '../../../shared/const';

export const router = createBrowserRouter([
	{
		path: routesPath[routesName.HOME],
		element: <App />,
		children: [
			{
				path: routesPath[routesName.HOME],
				element: <Navigate to="/movies" />,
			},
			{
				path: routesPath[routesName.ALL_MOVIES],
				element: <Movies isFavorite={false} title="All movies" />,
			},
			{
				path: routesPath[routesName.FAVORITES],
				element: <Movies isFavorite={true} title="Favorites" />,
			},
		],
	},
]);
