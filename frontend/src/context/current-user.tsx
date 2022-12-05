import React, {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useReducer
} from 'react';

export interface ICurrentUser {
	bio: string;
	email: string;
	id: number;
	image: string;
	token: string;
	username: string;
}

type ICurrentUserContext = [
	IStateInterface,
	Dispatch<SetStateAction<IStateInterface>>
];

export interface IStateInterface {
	isLoading: boolean;
	isLoggedIn: boolean | null;
	currentUser: ICurrentUser | null;
}

const initialState = {
	isLoading: false,
	isLoggedIn: null,
	currentUser: null
};

type ActionType = {
	type: 'LOADING' | 'SET_AUTHORIZED' | 'SET_UNAUTHORIZED' | 'LOGOUT';
	payload: ICurrentUser;
};

const reducer = (
	state: IStateInterface,
	action: ActionType
): IStateInterface => {
	switch (action.type) {
		case 'LOADING':
			return { ...state, isLoading: true };
		case 'SET_AUTHORIZED':
			return {
				...state,
				isLoading: false,
				isLoggedIn: true,
				currentUser: action.payload
			};
		case 'SET_UNAUTHORIZED':
			return { ...state, isLoggedIn: false };
		case 'LOGOUT':
			return {
				...initialState,
				isLoggedIn: false
			};
		default:
			return state;
	}
};

export const CurrentUserContext = createContext<
	[IStateInterface, React.Dispatch<any>]
>([initialState, () => {}]);

export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
	const value = useReducer(reducer, initialState);

	return (
		<CurrentUserContext.Provider value={value}>
			{children}
		</CurrentUserContext.Provider>
	);
};
