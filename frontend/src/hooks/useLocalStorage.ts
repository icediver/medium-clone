import { useEffect, useState } from 'react';

export default (key: string, initialValue: any = '') => {
	const [value, setValue] = useState(() => {
		return localStorage.getItem(key) || initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, value);
	}, [key, value]);

	return [value, setValue];
};
