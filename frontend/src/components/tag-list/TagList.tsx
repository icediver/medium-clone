import { FC } from 'react';

const TagList: FC<{ tags: string[] }> = ({ tags }) => {
	return (
		<ul className='tag-list'>
			{tags.map(tag => {
				return (
					<li key={tag} className='tag-default tag-pill tag-outline'>
						{tag}
					</li>
				);
			})}
		</ul>
	);
};

export default TagList;
