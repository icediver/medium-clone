import { FC, useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ArticleForm from '../../components/article-form/ArticleForm';
import { CurrentUserContext } from '../../context/current-user';
import useFetch from '../../hooks/useFetch';
import { IArticleBase } from '../../types/article.interface';

const EditArticle: FC = () => {
	const params = useParams();
	const slug = params.slug;
	const apiUrl = `/articles/${slug}`;

	const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);

	const [
		{ response: updateArticleResponse, error: updateArticleError },
		doUpdateArticle
	] = useFetch(apiUrl);

	const [initialValues, setInitialValues] = useState<IArticleBase>();
	const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
	const [currentUserState] = useContext(CurrentUserContext);

	const handleSubmit = (article: IArticleBase) => {
		doUpdateArticle({
			method: 'put',
			data: { article }
		});
	};

	useEffect(() => {
		doFetchArticle();
	}, [doFetchArticle]);

	useEffect(() => {
		if (!fetchArticleResponse) return;

		const oldArticles: IArticleBase = {
			title: fetchArticleResponse.article.title,
			description: fetchArticleResponse.article.description,
			body: fetchArticleResponse.article.body,
			tagList: fetchArticleResponse.article.tagList
		};
		setInitialValues(oldArticles);
	}, [fetchArticleResponse]);

	useEffect(() => {
		if (!updateArticleResponse) {
			return;
		}
		setIsSuccessfullSubmit(true);
	}, [updateArticleResponse]);

	if (currentUserState.isLoggedIn === false) {
		return <Navigate to={'/'} />;
	}

	if (isSuccessfullSubmit) {
		return <Navigate replace to={`/articles/${slug}`} />;
	}
	return (
		<ArticleForm
			onSubmit={handleSubmit}
			errors={(updateArticleError && [updateArticleError.message]) || []}
			initialValues={initialValues}
		/>
	);
};

export default EditArticle;
