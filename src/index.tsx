import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [state, setState] = useState(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);

	const handleStateChange = (newState: ArticleStateType) => setState(newState);
	const handleSidebarClose = () => setIsOpen(false);
	const handleSidebarToggle = () => setIsOpen(!isOpen);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				state={state}
				onStateChange={handleStateChange}
				onArrowClick={handleSidebarToggle}
				isOpen={isOpen}
			/>
			<Article onClick={handleSidebarClose} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
