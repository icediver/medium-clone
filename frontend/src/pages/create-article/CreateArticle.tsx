import { FC, useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ArticleForm from '../../components/article-form/ArticleForm';
import { CurrentUserContext } from '../../context/current-user';
import useFetch from '../../hooks/useFetch';
import { IArticleBase } from '../../types/article.interface';

const CreateArticle: FC = () => {
	const apiUrl = '/articles';
	const [{ response, error }, doFetch] = useFetch(apiUrl);
	const [currentUserState] = useContext(CurrentUserContext);
	const initialValues = {
		title: '',
		description: '',
		body: '',
		tagList: []
	};
	const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (article: IArticleBase) => {
		// console.log('handleSubmit', article);
		doFetch({
			method: 'post',
			data: {
				article
			}
		});
	};
	useEffect(() => {
		if (!response) {
			return;
		}
		console.log('response', `/articles/${response.article.slug}`);
		setIsSuccessfullSubmit(true);
		// if (true) {
	}, [response]);

	if (currentUserState.isLoggedIn === false) {
		return <Navigate to={'/'} />;
	}

	if (isSuccessfullSubmit) {
		return <Navigate replace to={`/articles/${response.article.slug}`} />;
	}

	return (
		<div>
			<ArticleForm
				errors={(error && error.errors) || []}
				initialValues={initialValues}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default CreateArticle;
