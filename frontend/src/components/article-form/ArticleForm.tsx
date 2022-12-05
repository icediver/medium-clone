import { FC, FormEvent, useEffect, useState } from 'react';
import { IArticleBase } from '../../types/article.interface';
import BackendErrorMessages from '../errors/BackendErrorMessages';

const ArticleForm: FC<{
	onSubmit: (article: IArticleBase) => void;
	errors: any;
	initialValues?: IArticleBase;
}> = ({ onSubmit, errors, initialValues }) => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [description, setDescription] = useState('');
	const [taglist, setTaglist] = useState('');

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const tags = taglist.split(' ');
		onSubmit({ title, body, description, tagList: tags });
	};
	useEffect(() => {
		if (!initialValues) {
			return;
		}
		setTitle(initialValues.title);
		setDescription(initialValues.description);
		setBody(initialValues.body);
		setTaglist(initialValues.tagList.join(' '));
	}, [initialValues]);

	return (
		<div className={'editor-page'}>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-10 offset-md-1 col-xs-12'>
						{errors && <BackendErrorMessages backendErrors={errors} />}
						<form onSubmit={handleSubmit}>
							<fieldset>
								<fieldset className={'form-group'}>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder={'Article title'}
										value={title}
										onChange={e => setTitle(e.target.value)}
									/>
								</fieldset>
								<fieldset className={'form-group'}>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder={'What is this article about?'}
										value={description}
										onChange={e => setDescription(e.target.value)}
									/>
								</fieldset>
								<fieldset className={'form-group'}>
									<textarea
										className='form-control'
										rows={8}
										placeholder={'Write your article in markdown'}
										value={body}
										onChange={e => setBody(e.target.value)}
									></textarea>
								</fieldset>
								<fieldset className={'form-group'}>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder={'Enter tags'}
										value={taglist}
										onChange={e => setTaglist(e.target.value)}
									/>
								</fieldset>
								<fieldset className={'form-group'}>
									<button
										type={'submit'}
										className={'btn btn-lg pull-xs-right btn-primary '}
									>
										Publish Article
									</button>
								</fieldset>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArticleForm;
