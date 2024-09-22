import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from './app/provider/router/router';
import './index.css';

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
