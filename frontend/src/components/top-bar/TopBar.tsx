import { FC, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../context/current-user';

const TopBar: FC = () => {
	const [currentUserState] = useContext(CurrentUserContext);
	const imageUrl =
		'http://localhost:4200' + currentUserState.currentUser?.image;
	return (
		<nav className='navbar navbar-light'>
			<div className='container'>
				<Link to='/' className='navbar-brand'>
					Medium
				</Link>
				<ul className='nav navbar-nav pull-xs-right'>
					<li className='nav-item'>
						<NavLink end to='/' className={'nav-link'}>
							Home
						</NavLink>
					</li>
					{currentUserState.isLoggedIn === false && (
						<>
							<li className='nav-item'>
								<NavLink to='/login' className={'nav-link'}>
									Login
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink to='/register' className={'nav-link'}>
									Sign up
								</NavLink>
							</li>
						</>
					)}
					{currentUserState.isLoggedIn && (
						<>
							<li className='nav-item'>
								<NavLink to='/articles/new' className={'nav-link'}>
									<i className='ion-compose'></i>&nbsp; New Post
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink to='/settings' className={'nav-link'}>
									<i className='ion-gear-a'></i>&nbsp; Settings
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									to={`/profiles/${currentUserState.currentUser?.username}`}
									className={'nav-link'}
								>
									<img src={imageUrl} alt='' className='user-pic' />
									&nbsp; {currentUserState.currentUser!.username}
								</NavLink>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default TopBar;
