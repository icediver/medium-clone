import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

type TypeAxios = {
	isLoading: boolean;
	response: any;
	error: any;
};

type TypeOut = {
	data: TypeAxios;
	doFetch: any;
};

interface IUserAuth {
	email: string;
	password: string;
	username?: string;
}

interface IFetchOption {
	method: string;
	data: {
		user: IUserAuth;
	};
}

export default (url: string): [TypeAxios, (option?: object) => void] => {
	const baseUrl = 'http://localhost:4200/api';
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [options, setOptions] = useState({});
	const [token] = useLocalStorage('token');
	// console.log(token);

	const doFetch = useCallback((options: object = {}): void => {
		setOptions(options);
		setIsLoading(true);
	}, []);

	useEffect(() => {
		let skipGetResponseAfterDestroy = false;
		const requestOptions = {
			...options,
			...{
				headers: {
					authorization: token ? `Token ${token}` : ''
				}
			}
		};
		if (!isLoading) {
			return;
		}
		axios(baseUrl + url, requestOptions)
			.then(res => {
				if (!skipGetResponseAfterDestroy) {
					setIsLoading(false);
					setResponse(res.data);
				}
			})
			.catch(error => {
				if (!skipGetResponseAfterDestroy) {
					setIsLoading(false);
					// console.log(error.response.data);
					setError(error.response.data);
				}
			});
		return () => {
			skipGetResponseAfterDestroy = true
		}

	}, [isLoading, options, url, token]);

	return [{isLoading, response, error}, doFetch];
};
