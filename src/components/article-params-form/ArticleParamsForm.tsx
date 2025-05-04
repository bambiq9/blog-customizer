import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type TArticleParamsFormProps = {
	articleSettings: ArticleStateType;
	onSettingsUpdate: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
	const [formIsOpen, setFormIsOpen] = useState(false);
	const [tempArticleSetting, setTempArticleSettings] = useState(
		props.articleSettings
	);

	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscapePress = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setFormIsOpen(false);
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(e.target as Node)) {
				setFormIsOpen(false);
			}
		};

		if (formIsOpen) {
			document.addEventListener('keydown', handleEscapePress);
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('keydown', handleEscapePress);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [formIsOpen]);

	const handleSettingsApply = (e: SyntheticEvent) => {
		e.preventDefault();
		props.onSettingsUpdate(tempArticleSetting);
	};

	const handleSettingsReset = () => {
		setTempArticleSettings(defaultArticleState);
		props.onSettingsUpdate(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={formIsOpen}
				onClick={() => setFormIsOpen(!formIsOpen)}
			/>
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSettingsApply}
					onReset={handleSettingsReset}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={tempArticleSetting.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) =>
							setTempArticleSettings({
								...tempArticleSetting,
								fontFamilyOption: selected,
							})
						}
					/>
					<RadioGroup
						title='размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={tempArticleSetting.fontSizeOption}
						onChange={(value: OptionType) =>
							setTempArticleSettings({
								...tempArticleSetting,
								fontSizeOption: value,
							})
						}
					/>
					<Select
						title='цвет шрифта'
						selected={tempArticleSetting.fontColor}
						options={fontColors}
						onChange={(selected: OptionType) =>
							setTempArticleSettings({
								...tempArticleSetting,
								fontColor: selected,
							})
						}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={tempArticleSetting.backgroundColor}
						options={backgroundColors}
						onChange={(selected: OptionType) =>
							setTempArticleSettings({
								...tempArticleSetting,
								backgroundColor: selected,
							})
						}
					/>
					<Select
						title='ширина контента'
						selected={tempArticleSetting.contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) =>
							setTempArticleSettings({
								...tempArticleSetting,
								contentWidth: selected,
							})
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
