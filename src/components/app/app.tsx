import { CSSProperties, useEffect, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	useEffect(() => {
		if (isFormOpen) {
			setFormState(articleState);
		}
	}, [articleState, isFormOpen]);

	const handleOpenChange = (isOpen: boolean) => {
		if (isOpen) {
			setFormState(articleState);
		}

		setIsFormOpen(isOpen);
	};

	const handleApply = () => {
		setArticleState(formState);
		setIsFormOpen(false);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	const handleFormChange = (nextState: ArticleStateType) => {
		setFormState(nextState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isFormOpen}
				formState={formState}
				onOpenChange={handleOpenChange}
				onFormChange={handleFormChange}
				onReset={handleReset}
				onApply={handleApply}
			/>
			<Article />
		</main>
	);
};
