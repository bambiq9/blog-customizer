import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SyntheticEvent, useState } from 'react';

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
	state: ArticleStateType;
	isOpen: boolean;
	onStateChange: (newState: ArticleStateType) => void;
	onArrowClick: () => void;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
	// const [isOpen, setIsOpen] = useState(false);
	const [tempState, setTempState] = useState(props.state);

	const handleSettingsApply = (e: SyntheticEvent) => {
		e.preventDefault();
		props.onStateChange(tempState);
	};

	const handleSettingsReset = () => {
		setTempState(defaultArticleState);
		props.onStateChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={props.isOpen}
				onClick={() => {
					props.onArrowClick();
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: props.isOpen,
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
						selected={tempState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) =>
							setTempState({ ...tempState, fontFamilyOption: selected })
						}
					/>
					<RadioGroup
						title='размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={tempState.fontSizeOption}
						onChange={(value: OptionType) =>
							setTempState({ ...tempState, fontSizeOption: value })
						}
					/>
					<Select
						title='цвет шрифта'
						selected={tempState.fontColor}
						options={fontColors}
						onChange={(selected: OptionType) =>
							setTempState({ ...tempState, fontColor: selected })
						}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={tempState.backgroundColor}
						options={backgroundColors}
						onChange={(selected: OptionType) =>
							setTempState({ ...tempState, backgroundColor: selected })
						}
					/>
					<Select
						title='ширина контента'
						selected={tempState.contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) =>
							setTempState({ ...tempState, contentWidth: selected })
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
