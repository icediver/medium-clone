import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IPaginationInterface } from '../../types/pagination.interface';
import { range } from '../../utils/utils';

const PaginationItem: FC<Omit<IPaginationInterface, 'total' | 'limit'>> = ({
	page,
	currentPage,
	url
}) => {
	return (
		<li
			className={cn({
				'page-item': true,
				active: currentPage === page
			})}
		>
			<Link to={`${url}?page=${page}`} className={'page-link'}>
				{page}
			</Link>
		</li>
	);
};

const Pagination: FC<IPaginationInterface> = ({
	total,
	limit,
	url,
	currentPage
}) => {
	const pagesCount = Math.ceil(total / limit);
	const pages = range(1, pagesCount);
	return (
		<ul className={'pagination'}>
			{pages.map(page => (
				<PaginationItem
					page={page}
					currentPage={currentPage}
					url={url}
					key={page}
				/>
			))}
		</ul>
	);
};

export default Pagination;
