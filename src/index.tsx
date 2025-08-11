import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from './ui/arrow-button';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import { SideBar } from './components/sidebar';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [articleStyles, setArticleStyles] =
		useState<ArticleStateType>(defaultArticleState);

	const toggleSidebar = () => {
		setIsSidebarOpen(true);
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	const handleApplyArticleParams = (newSettings: ArticleStateType) => {
		setArticleStyles(newSettings);
	};

	const handleResetArticleParams = () => {
		setArticleStyles(defaultArticleState);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArrowButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
			<SideBar isOpen={isSidebarOpen} onClose={closeSidebar}>
				<ArticleParamsForm
					initialSettings={articleStyles}
					onApply={handleApplyArticleParams}
					onReset={handleResetArticleParams}
				/>
			</SideBar>
			<Article currentArticleStyles={articleStyles} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
