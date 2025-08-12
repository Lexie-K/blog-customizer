import { useState, useEffect, useRef } from 'react';
import { Button } from 'src/ui/button';
import { ArrowButton } from 'src/ui/arrow-button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	OptionType,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

interface IArticleParamsForm {
	initialSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm: React.FC<IArticleParamsForm> = ({
	initialSettings,
	onApply,
	onReset,
}) => {
	const [currentFontFamily, setCurrentFontFamily] = useState<OptionType>(
		initialSettings.fontFamilyOption
	);
	const [currentFontSize, setCurrentFontSize] = useState<OptionType>(
		initialSettings.fontSizeOption
	);
	const [currentFontColor, setCurrentFontColor] = useState<OptionType>(
		initialSettings.fontColor
	);
	const [currentBackgroundColor, setCurrentBackgroundColor] =
		useState<OptionType>(initialSettings.backgroundColor);
	const [currentContentWidth, setCurrentContentWidth] = useState<OptionType>(
		initialSettings.contentWidth
	);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const sidebarRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (!isSidebarOpen) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsSidebarOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClickOutside);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isSidebarOpen]);
	const toggleSidebar = () => {
		setIsSidebarOpen(true);
	};

	useEffect(() => {
		setCurrentFontFamily(initialSettings.fontFamilyOption);
		setCurrentFontSize(initialSettings.fontSizeOption);
		setCurrentFontColor(initialSettings.fontColor);
		setCurrentBackgroundColor(initialSettings.backgroundColor);
		setCurrentContentWidth(initialSettings.contentWidth);
	}, [initialSettings]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const newAppliedSettings: ArticleStateType = {
			fontFamilyOption: currentFontFamily,
			fontSizeOption: currentFontSize,
			fontColor: currentFontColor,
			backgroundColor: currentBackgroundColor,
			contentWidth: currentContentWidth,
		};
		onApply(newAppliedSettings);
	};

	const handleReset = () => {
		onReset();
	};

	return (
		<>
			<ArrowButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
			<aside
				className={`${styles.container} ${
					isSidebarOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
					ref={sidebarRef}>
					<h2 className={styles.sidebarTitle}>Задайте параметры</h2>
					<div className={styles.paramGroup}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={currentFontFamily}
							onChange={setCurrentFontFamily}
							placeholder='Выберите шрифт'
						/>
					</div>

					<div className={styles.paramGroup}>
						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							options={fontSizeOptions}
							selected={currentFontSize}
							onChange={setCurrentFontSize}
						/>
					</div>

					<div className={styles.paramGroup}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={currentFontColor}
							onChange={setCurrentFontColor}
							placeholder='Выберите цвет шрифта'
						/>
					</div>

					<div className={styles.paramGroup}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={currentBackgroundColor}
							onChange={setCurrentBackgroundColor}
							placeholder='Выберите цвет фона'
						/>
					</div>

					<div className={styles.paramGroup}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={currentContentWidth}
							onChange={setCurrentContentWidth}
							placeholder='Выберите ширину контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
