import { stringify } from 'query-string';
import { FC, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import FeedToggler from '../../components/feed-toggler/FeedToggler';
import Feed from '../../components/feed/Feed';
import Loading from '../../components/loading/Loading';
import Pagination from '../../components/pagination/Pagination';
import PopularTags from '../../components/popular-tags/PopularTags';
import useFetch from '../../hooks/useFetch';
import { getPaginator, limit } from '../../utils/utils';

const TagFeed: FC = () => {
	const location = useLocation();
	const params = useParams();
	const tagName = params.slug;
	const { offset, currentPage } = getPaginator(location.search);

	const stringifiedParams = stringify({
		limit,
		offset,
		tag: tagName
	});
	const apiUrl = `/articles?${stringifiedParams}`;
	const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
	const url = location.pathname;

	useEffect(() => {
		doFetch();
	}, [doFetch, currentPage, tagName]);

	return (
		<div className={'home-page'}>
			<div className='banner'>
				<div className='container'>
					<h1>Medium clone</h1>
					<p>A place to share knowledge</p>
				</div>
			</div>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-9'>
						<FeedToggler tagName={tagName ? tagName : ''} />
						{isLoading && <Loading />}
						{error && <ErrorMessage />}
						{!isLoading && response && (
							<>
								<Feed articles={response.articles} />
								<Pagination
									total={response.articlesCount}
									limit={limit}
									url={url}
									currentPage={currentPage}
								/>
							</>
						)}
					</div>
					<div className='col-md-3'>
						<PopularTags />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TagFeed;
