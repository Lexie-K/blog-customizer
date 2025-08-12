import { CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import styles from './styles/index.module.scss';
import './styles/index.scss';

export const App = () => {
	const [articleStyles, setArticleStyles] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApplyArticleParams = (newSettings: ArticleStateType) => {
		setArticleStyles(newSettings);
	};

	const handleResetArticleParams = () => {
		setArticleStyles(defaultArticleState);
	};
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialSettings={articleStyles}
				onApply={handleApplyArticleParams}
				onReset={handleResetArticleParams}
			/>
			<Article currentArticleStyles={articleStyles} />
		</main>
	);
};
