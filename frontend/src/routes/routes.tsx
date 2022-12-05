import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Article from '../pages/article/Article';
import Authentication from '../pages/authentication/Authentication';
import CreateArticle from '../pages/create-article/CreateArticle';
import EditArticle from '../pages/edit-article/EditArticle';
import GlobalFeed from '../pages/global-feed/GlobalFeed';
import TagFeed from '../pages/tag-feed/TagFeed';
import YourFeed from '../pages/your-feed/YourFeed';
import Settings from '../pages/settings/Settings';
import UserProfile from '../pages/user-profile/UserProfile';

const HomeRoutes: FC = () => {
	return (
		<Routes>
			<Route path='/' element={<GlobalFeed />} />
			<Route path='/profiles/:slug' element={<UserProfile />} />
			<Route path='/profiles/:slug/favorites' element={<UserProfile />} />
			<Route path='/settings' element={<Settings />} />
			<Route path='/settings' element={<Settings />} />
			<Route path='/settings' element={<Settings />} />
			<Route path='/articles/new' element={<CreateArticle />} />
			<Route path='/articles/:slug/edit' element={<EditArticle />} />
			<Route path='/feed' element={<YourFeed />} />
			<Route path='/tags/:slug' element={<TagFeed />} />

			<Route path='/login' element={<Authentication />} />
			<Route path='/register' element={<Authentication />} />

			<Route path='/articles/:slug' element={<Article />} />
		</Routes>
	);
};

export default HomeRoutes;
