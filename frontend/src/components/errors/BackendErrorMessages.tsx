import { FC } from 'react';

export type ErrorMessageType = {
	[key: string]: string[];
};

const BackendErrorMessages: FC<ErrorMessageType> = ({ backendErrors }) => {
	const errorMessages = Object.keys(backendErrors).map(name => {
		const messages =
			backendErrors[name as keyof typeof backendErrors].toString();

		return messages;
	});
	return (
		<ul className={'error-messages'}>
			{errorMessages.map(str => (
				<li key={str}>{str}</li>
			))}
		</ul>
	);
};

export default BackendErrorMessages;
