import { FormEvent, useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
} from './../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	formState: ArticleStateType;
	onOpenChange: (isOpen: boolean) => void;
	onFormChange: (nextState: ArticleStateType) => void;
	onReset: () => void;
	onApply: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	formState,
	onOpenChange,
	onFormChange,
	onReset,
	onApply,
}: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		onChange: onOpenChange,
		rootRef: formRef,
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply();
	};

	const handleReset = () => {
		onReset();
	};

	const handleChange = (nextState: Partial<ArticleStateType>) => {
		onFormChange({
			...formState,
			...nextState,
		});
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => onOpenChange(!isOpen)} />
			<aside
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.header}>
						<Text size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
					</div>
					<div className={styles.section}>
						<Select
							title='ШРИФТ'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(value) => handleChange({ fontFamilyOption: value })}
						/>
					</div>
					<div className={styles.section}>
						<RadioGroup
							name='font-size'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(value) => handleChange({ fontSizeOption: value })}
							title='РАЗМЕР ШРИФТА'
						/>
					</div>
					<div className={styles.section}>
						<Select
							title='ЦВЕТ ШРИФТА'
							selected={formState.fontColor}
							options={fontColors}
							onChange={(value) => handleChange({ fontColor: value })}
						/>
					</div>
					<div className={styles.divider} />
					<div className={styles.section}>
						<Select
							title='ЦВЕТ ФОНА'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={(value) => handleChange({ backgroundColor: value })}
						/>
					</div>
					<div className={styles.section}>
						<Select
							title='ШИРИНА КОНТЕНТА'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={(value) => handleChange({ contentWidth: value })}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
