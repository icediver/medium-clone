import { FC, MouseEvent, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import classNames from 'classnames';

const AddToFavorites: FC<{
	isFavorited: boolean;
	favoritesCount: number;
	articleSlug: string;
}> = ({ isFavorited, favoritesCount, articleSlug }) => {
	const apiUrl = `/articles/${articleSlug}/favorite`;
	const [{ response }, doFetch] = useFetch(apiUrl);
	const [favorited, setFavorited] = useState(isFavorited);

	const favoritesCountWithResponse = response
		? response.article.favoriteCount
		: favoritesCount;

	const handleLike = (event: MouseEvent) => {
		event.preventDefault();
		doFetch({
			method: favorited ? 'delete' : 'post'
		});
		setFavorited(!favorited);
	};

	const buttonClasses = classNames({
		btn: true,
		'btn-sm': true,
		'btn-primary': favorited,
		'btn-outline-primary': !favorited,
		'.btn-outline-primary:focus': false,
		'.btn-outline-primary.focus': false
	});

	return (
		<button className={buttonClasses} onClick={handleLike}>
			<i className='ion-heart'></i>
			<span>&nbsp; {favoritesCountWithResponse}</span>
		</button>
	);
};

export default AddToFavorites;
