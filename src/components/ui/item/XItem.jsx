import classNames from 'classnames';
import { createElement, memo, useMemo } from 'react';
import './style.scss';
const clickableTag = ['a', 'label'];

export const XItem = memo(function XItem({
	tag = 'li',
	className,
	children,
	tabIndex = 0,
	dense = false,
	active = false,
	activeClass,
	disabled = false,
	role = null,
	onClick = null,
}) {
	const isActionable = useMemo(
		() => clickableTag.includes(tag) || typeof onClick === 'function',
		[tag, onClick],
	);
	const isClickable = useMemo(() => !disabled && isActionable, [tag, isActionable]);
	const attrs = useMemo(() => {
		const attrs = {
			className: classNames(
				'x-item',
				className,
				{
					'x-item--dense': dense,
					'x-item--active': active,
					'x-item--disabled': disabled,
					'x-item--clickable': isClickable,
				},
				active && !disabled ? activeClass : '',
			),
			role: role ?? 'listitem',
			disabled: disabled,
		};
		if (isActionable) {
			attrs['aria-disabled'] = disabled;
		}
		if (isClickable) {
			attrs.tabIndex = disabled ? -1 : (tabIndex ?? -1);
		}
		return attrs;
	}, [
		disabled,
		tabIndex,
		role,
		dense,
		active,
		className,
		activeClass,
		isClickable,
		isActionable,
	]);

	return createElement(
		tag,
		attrs,
		[<div className="x-item__backdor" key={-1} tabIndex={-1} />].concat(children),
	);
});
