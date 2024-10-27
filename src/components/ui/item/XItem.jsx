import classNames from 'classnames';
import { memo, useMemo } from 'react';
import './style.scss';
const clickableTag = ['a', 'label'];

export const XItem = memo(function XItem({
	tag = 'div',
	className,
	children,
	tabIndex = 0,
	dense = false,
	active = false,
	activeClass,
	disabled = false,
	role = null,
	onClick = null,
	to,
}) {
	const TagProp = useMemo(() => (to ? 'a' : tag), [to, tag]);
	const isActionable = useMemo(
		() => clickableTag.includes(TagProp) || typeof onClick === 'function',
		[TagProp, onClick],
	);
	const isClickable = useMemo(
		() => !disabled && isActionable,
		[disabled, isActionable],
	);
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

	return (
		<TagProp {...attrs}>
			<div className="x-item__backdor" tabIndex={-1} />
			{children}
		</TagProp>
	);
});
