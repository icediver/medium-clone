import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './components/top-bar/TopBar';
import { CurrentUserContext } from './context/current-user';
import HomeRoutes from './routes/routes';

function App() {
	const [currentUserState, setCurrentUserState] =
		useContext(CurrentUserContext);
	// console.log(currentUserState);
	return (
		<div className='App'>
			<BrowserRouter>
				<TopBar />

				<HomeRoutes />
			</BrowserRouter>
		</div>
	);
}

export default App;
