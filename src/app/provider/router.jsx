import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';

import { routersName, routersPath } from '../../shared/const';

import { Movies } from '../../pages/ui/Movies';

export default createBrowserRouter([
	{
		path: routersPath[routersName.HOME],
		element: <App />,
		children: [
			{ path: routersPath[routersName.HOME], element: 'AllMovies' },
			{ path: routersPath[routersName.ALL_MOVIES], element: <Movies /> },
			{
				path: routersPath[routersName.FAVORITES],
				element: <Movies isFavorite={true} />,
			},
		],
	},
]);
