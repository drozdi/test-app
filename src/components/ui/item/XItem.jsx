import classNames from 'classnames';
import PropTypes from 'prop-types';
import { forwardRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
const clickableTag = ['a', 'label'];
const disRoleTag = ['label'];
const disDisabledTag = ['div', 'span', 'a', 'label'];

export const XItem = forwardRef(function XItem(
	{
		tag = 'div',
		className,
		children,
		tabIndex = 0,
		vertical,
		dense,
		active,
		activeClass,
		disabled,
		role,
		onClick,
		LinkComponent = Link,
		hoverable,
		to,
		href,
		target = '_self',
	},
	ref,
) {
	const TagProp = useMemo(
		() => (to || href ? LinkComponent : tag),
		[to, href, LinkComponent, tag],
	);
	const isActionable = useMemo(
		() =>
			clickableTag.includes(TagProp) ||
			TagProp === LinkComponent ||
			typeof onClick === 'function',
		[TagProp, onClick],
	);
	const isClickable = !disabled && isActionable;
	const isHoverable = isClickable || hoverable;
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
					'x-item--hoverable': isHoverable,
					'x-item--vertical': vertical,
				},
				active && !disabled ? activeClass : '',
			),
			role: disRoleTag.includes(TagProp) ? undefined : (role ?? 'listitem'),
			disabled: disabled,
		};
		if (isActionable) {
			attrs['aria-disabled'] = disabled;
		}
		if (isClickable) {
			attrs.tabIndex = disabled ? -1 : (tabIndex ?? -1);
		}
		if (disDisabledTag.includes(TagProp)) {
			delete attrs.disabled;
		}
		if (TagProp === LinkComponent) {
			if (!disabled) {
				attrs.to = to;
				attrs.href = href || to;
				attrs.target = target;
			}
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
		TagProp,
		LinkComponent,
	]);
	return (
		<TagProp {...attrs}>
			<span className="x-item__underlay" />
			{children}
		</TagProp>
	);
});

XItem.propTypes = {
	tag: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	dense: PropTypes.bool,
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	vertical: PropTypes.bool,
	hoverable: PropTypes.bool,
	activeClass: PropTypes.string,
	tabIndex: PropTypes.number,
	role: PropTypes.string,
	onClick: PropTypes.func,
	LinkComponent: PropTypes.any,
	to: PropTypes.string,
	href: PropTypes.string,
	target: PropTypes.string,
};
