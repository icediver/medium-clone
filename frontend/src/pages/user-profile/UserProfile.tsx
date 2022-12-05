import { FC, useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import UserArticles from '../../components/user-articles/UserArticles';

const UserProfile: FC = () => {
	const slug = useParams().slug;
	const location = useLocation();
	const isFavorites = location.pathname.includes('favorites');
	const apiUrl = `/profiles/${slug}`;
	const [{ response }, doFetch] = useFetch(apiUrl);

	useEffect(() => {
		doFetch();
	}, [doFetch]);
	if (!response) {
		return null;
	}
	console.log('response', response);
	return (
		<div className={'profile-page'}>
			<div className='user-info'>
				<div className='container'>
					<div className='row'>
						<div className='col-xs-12 col-md-10 offset-md-1'>
							<img src={response.profile.image} alt='' className='user-img' />
							<h4>{response.profile.username}</h4>
							<p>{response.profile.bio}</p>
						</div>
					</div>
				</div>
			</div>
			<div className='container'>
				<div className='row'>
					<div className='col-xs-12 col-md-10 offset-md-1'>
						<div className='articles-toggle'>
							<ul className='nav nav-pills outline-active'>
								<li className='nav-item'>
									<NavLink
										end
										to={`/profiles/${response.profile.username}`}
										className={'nav-link'}
									>
										My posts
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink
										to={`/profiles/${response.profile.username}/favorites`}
										className={'nav-link'}
									>
										Favorites posts
									</NavLink>
								</li>
							</ul>
						</div>
						<UserArticles
							username={response.profile.username}
							location={location}
							isFavorites={isFavorites}
							// url={location.pathname}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
