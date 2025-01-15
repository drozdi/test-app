import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useMemo, useRef } from 'react';
import { isFunction } from '../../../utils/is';
import { useForkRef } from '../../hooks/useForkRef';
import { forwardRefWithAs, render } from '../../internal/render';
import { XLink } from '../link';
import './style.css';
const clickableTag = ['a', 'label', 'A', 'LABEL'];
const disRoleTag = ['label'];
const disDisabledTag = ['div', 'span', 'a', 'label'];

export const XItem = forwardRefWithAs(function XItemFn(
	{
		as = 'div',
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
		hoverable,
		...props
	},
	ref,
) {
	const elementRef = useRef();
	const handleRef = useForkRef(ref, elementRef);
	const isActionable = useMemo(() => {
		return (
			as?.type === XLink ||
			clickableTag.includes(elementRef.current?.nodeName.toLowerCase() ?? as) ||
			isFunction(onClick)
		);
	}, [onClick, elementRef.current]);
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
			role: disRoleTag.includes(as) ? undefined : (role ?? 'listitem'),
			disabled: disabled,
		};
		if (isActionable) {
			attrs['aria-disabled'] = disabled;
		}
		if (isClickable) {
			attrs.tabIndex = disabled ? -1 : (tabIndex ?? -1);
		}
		if (disDisabledTag.includes(as)) {
			delete attrs.disabled;
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
	return render(
		'div',
		{
			as,
			ref: handleRef,
			...props,
			...attrs,
			children: isFunction(children) ? (
				children
			) : (
				<>
					<span className="x-item__underlay" />
					{children}
				</>
			),
		},
		{
			active,
			disabled,
		},
	);
});

XItem.propTypes = {
	as: PropTypes.any,
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
};
