import { FC, FormEvent, useContext, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useMatch } from 'react-router-dom';
import BackendErrorMessages from '../../components/errors/BackendErrorMessages';
import { CurrentUserContext } from '../../context/current-user';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';

const Authentication: FC = props => {
	const location = useLocation();

	const match = useMatch('/login');
	const isLogin = !!match;

	const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
	const descriptionLink = isLogin ? '/register' : '/login';
	const descriptionText = isLogin ? 'Need an account?' : 'Have an account?';
	const apiUrl = isLogin ? '/login' : '/users';

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl);
	const [username, setUsername] = useState<string>('');
	const [isSuccessfullySubmit, setIsSuccessfullySubmit] = useState(false);
	const [, setToken] = useLocalStorage('token');
	// const emailRef = useRef<HTMLInputElement>(null);

	const [, dispatch] = useContext(CurrentUserContext);
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// console.log('ref', emailRef?.current?.value);
		const user = isLogin ? { email, password } : { email, password, username };

		doFetch({
			method: 'post',
			data: {
				user
			}
		});
	};
	// console.log('token', token);
	useEffect(() => {
		if (!response) {
			return;
		}
		setToken(response.user.token);
		setIsSuccessfullySubmit(true);
		dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
	}, [response, setToken, dispatch]);

	if (isSuccessfullySubmit) {
		return <Navigate to={'/'} />;
	}

	return (
		<div className={'auth-page'}>
			<div className={'container page'}>
				<div className='row'>
					<div className='col-md-6 offset-md-3 col-xs-12'>
						<h1 className={'text-xs-center'}>{pageTitle}</h1>
						<p className='text-xs-center'>
							<Link to={descriptionLink}>{descriptionText}</Link>
						</p>
						<form onSubmit={handleSubmit}>
							{error && <BackendErrorMessages backendErrors={error.errors} />}
							<fieldset>
								{!isLogin && (
									<fieldset className={'form-group'}>
										<input
											type='text'
											className={'form-control form-control-lg'}
											placeholder={'Username'}
											value={username}
											// ref={emailRef}
											onChange={e => setUsername(e.target.value)}
										/>
									</fieldset>
								)}
								<fieldset className={'form-group'}>
									<input
										type='email'
										className={'form-control form-control-lg'}
										placeholder={'Email'}
										value={email}
										// ref={emailRef}
										onChange={e => setEmail(e.target.value)}
									/>
								</fieldset>
								<fieldset className={'form-group'}>
									<input
										type='password'
										autoComplete='true'
										className={'form-control form-control-lg'}
										placeholder={'Password'}
										onChange={e => setPassword(e.target.value)}
									/>
								</fieldset>
								<button
									className={'btn btn-lg btn-primary pull-xs-right'}
									type={'submit'}
									disabled={isLoading}
								>
									{pageTitle}
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Authentication;
