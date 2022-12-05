import { FC, PropsWithChildren, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/current-user';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';

const CurrentUserChecker: FC<PropsWithChildren> = ({ children }) => {
	const [{ response }, doFetch] = useFetch('/user');
	const [, dispatch] = useContext(CurrentUserContext);
	const [token] = useLocalStorage('token');

	useEffect(() => {
		if (!token) {
			dispatch({ type: 'SET_UNAUTHORIZED' });
			return;
		}
		doFetch();
		dispatch({ type: 'LOADING' });
	}, [token, dispatch, doFetch]);

	useEffect(() => {
		if (!response) {
			return;
		}

		dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
	}, [response, dispatch]);
	return <>{children}</>;
};

export default CurrentUserChecker;
