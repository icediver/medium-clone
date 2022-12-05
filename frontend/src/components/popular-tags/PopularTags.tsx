import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ErrorMessage from '../error-message/ErrorMessage';
import Loading from '../loading/Loading';

const PopularTags: FC = () => {
	const [{ response, isLoading, error }, doFetch] = useFetch('/tags');

	useEffect(() => {
		doFetch();
	}, [doFetch]);

	if (isLoading || !response) return <Loading />;

	if (error) return <ErrorMessage />;

	return (
		<div className={'sidebar'}>
			<p>Popular tags</p>
			<div className='tag-list'>
				{response.tags.map((tag: string) => (
					<Link
						to={`/tags/${tag}`}
						className={'tag-default tag-pill'}
						key={tag}
					>
						{tag}
					</Link>
				))}
			</div>
		</div>
	);
};

export default PopularTags;
