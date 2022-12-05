import { FC, useEffect } from 'react';
import { getPaginator, limit } from '../../utils/utils';
import { stringify } from 'query-string';
import useFetch from '../../hooks/useFetch';
import Loading from '../loading/Loading';
import ErrorMessage from '../error-message/ErrorMessage';
import Feed from '../feed/Feed';
import Pagination from '../pagination/Pagination';

export interface ILocation {
	pathname: string;
	search: string;
	hash: string;
	state?: any;
	key: string;
}

const getApiUrl = (username: string, offset: number, isFavorites: boolean) => {
	const params = isFavorites
		? { limit, offset, favorited: username }
		: { limit, offset, author: username };
	return `/articles?${stringify(params)}`;
};

const UserArticles: FC<{
	username: string;
	location: ILocation;
	isFavorites: boolean;
}> = ({ username, location, isFavorites }) => {
	const { offset, currentPage } = getPaginator(location.search);
	const apiUrl = getApiUrl(username, offset, isFavorites);
	const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

	useEffect(() => {
		doFetch();
	}, [doFetch, isFavorites, currentPage]);

	console.log('response articles', response);

	return (
		<div>
			{isLoading && <Loading />}
			{error && <ErrorMessage />}
			{!isLoading && response && (
				<>
					<Feed articles={response.articles} />
					<Pagination
						total={response.articlesCount}
						limit={limit}
						url={location.pathname}
						currentPage={currentPage}
					/>
				</>
			)}
		</div>
	);
};

export default UserArticles;
