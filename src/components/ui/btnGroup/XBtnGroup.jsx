import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import './XBtnGroup.scss';
import { XBtnGroupContext } from './XBtnGroupContext';

export function XBtnGroup(props = {}) {
	const {
		children,
		className,
		vertical,
		selected,
		multiple,
		value,
		color,
		flat = false,
		dimmed = false,
		outline = false,
		tonal = false,
		plain = false,
		text = false,
		square = false,
		rounded = false,
		round = false,
		disabled = false,
		onChange = () => {},
	} = props;

	const [current, setCurrent] = useState(value ?? (multiple ? [] : undefined));

	const handleClick = useCallback(
		(e, value) => {
			if (!selected) {
				return;
			}
			if (multiple) {
				setCurrent((current) => {
					if (!current.includes(value)) return [...current, value];
					return current.filter((v) => v !== value);
				});
			} else {
				setCurrent((v) => (v === value ? undefined : value));
			}
		},
		[selected, multiple],
	);
	useEffect(() => {
		if (Array.isArray(current) && !multiple) {
			setCurrent(current[0] ?? undefined);
		} else if (!Array.isArray(current) && multiple) {
			setCurrent(current ? [current] : []);
		} else {
			setCurrent(multiple ? [] : undefined);
		}
	}, [multiple]);
	useEffect(() => onChange(current), [current]);

	const context = {
		selected,
		multiple,
		current,
		color,
		flat,
		dimmed,
		outline,
		tonal,
		plain,
		text,
		square,
		rounded,
		round,
		disabled,
		onClick: handleClick,
	};
	return (
		<div
			className={classNames('x-btn-group', className, {
				'x-btn-group--vertical': vertical,
				'x-btn-group--round': round,
			})}
		>
			<XBtnGroupContext.Provider value={context}>
				{children}
			</XBtnGroupContext.Provider>
		</div>
	);
}
