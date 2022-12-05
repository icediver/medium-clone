import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CurrentUserProvider} from './context/current-user';
import CurrentUserChecker from './current-user-checker/CurrentUserChecker';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<CurrentUserProvider>
			<CurrentUserChecker>
				<App/>
			</CurrentUserChecker>
		</CurrentUserProvider>
	</React.StrictMode>
);
