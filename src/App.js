import { Outlet } from 'react-router-dom';
import { RootLayout } from './shared/layout/rootLayout';
import { NavBar } from './widgets/NavBar/NavBar';

function App() {
	return (
		<>
			<RootLayout
				content={<Outlet />}
				header={<NavBar />}
				footer={<h1>Footer</h1>}
			/>
		</>
	);
}

export default App;
