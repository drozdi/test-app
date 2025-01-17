import classNames from 'classnames';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import { useBtn } from '../../hooks/useBtn';
import { XIcon } from '../icon';
import { XBtnGroup, useXBtnGroupContext } from './group';
import './style.css';

import { isFunction } from '../../../utils/is';
import { useDisabled } from '../../internal/disabled';
import { forwardRefWithAs, render } from '../../internal/render';

function XBtnFn(params, ref) {
	const providedDisabled = useDisabled();
	const ctx = useXBtnGroupContext();
	const props = { ...ctx?.btnProps, ...params };
	if (ctx) {
		props.onClick = (event, value) => {
			ctx.onChange?.(event, props.value);
			params.onClick?.(event, value);
		};
		props.active = ctx.isActive?.(props.value) || params.active;
		props.disabled = ctx.isDisabled?.(props.value) || params.disabled;
	}

	const {
		color,
		size,
		flat,
		text,
		tonal,
		plain,
		outline,
		block,
		square,
		round,
		rounded,
		dimmed,
		link,
		active: propsActive,
		icon,
		iconRight,
		...rest
	} = props;

	const { disabled = providedDisabled || false, children, className } = props;
	const { active, focusVisible, buttonRef, attrs } = useBtn({ ...props, ref });
	const isIcon = useMemo(
		() =>
			(!!icon != !!iconRight && !children) ||
			(children?.type === XIcon && !icon && !iconRight),
		[children, icon, iconRight],
	);

	return render(
		'button',
		{
			...rest,
			...attrs,
			className: classNames(
				'x-btn',
				{
					'x-btn--flat': flat,
					'x-btn--text': text,
					'x-btn--tonal': tonal,
					'x-btn--plain': plain,
					'x-btn--outline': outline,
					'x-btn--block': block,
					'x-btn--square': square,
					'x-btn--round': round,
					'x-btn--rounded': rounded,
					'x-btn--dimmed': dimmed,
					'x-btn--link': link,
					'x-btn--icon': isIcon,
					'x-btn--active': propsActive,
					[`x-btn--${color}`]: color,
					[`x-btn--${size}`]: size,
				},
				className,
			),
			children: isFunction(children) ? (
				children
			) : (
				<>
					<div className="x-btn-underlay"></div>
					<div className="x-btn-outline"></div>
					{icon && (
						<XIcon className={!isIcon ? '-ml-2 mr-2' : ''}>{icon}</XIcon>
					)}
					{children && <span className="x-btn-content">{children}</span>}
					{iconRight && (
						<XIcon className={!isIcon ? 'ml-2 -mr-2' : ''}>{iconRight}</XIcon>
					)}
				</>
			),
		},
		{
			disabled,
			active,
			focusVisible,
		},
	);
}

const XBtnRoot = forwardRefWithAs(XBtnFn);
XBtnRoot.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
	className: PropTypes.string,
	dimmed: PropTypes.bool,
	flat: PropTypes.bool,
	text: PropTypes.bool,
	tonal: PropTypes.bool,
	plain: PropTypes.bool,
	outline: PropTypes.bool,

	round: PropTypes.bool,
	block: PropTypes.bool,
	square: PropTypes.bool,
	rounded: PropTypes.bool,
	disabled: PropTypes.bool,
	active: PropTypes.bool,
	link: PropTypes.bool,

	icon: PropTypes.string,
	iconRight: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.PropTypes.string,
	onClick: PropTypes.func,

	value: PropTypes.any,
}; //*/

export const XBtn = memo(XBtnRoot);

XBtn.Group = XBtnGroup;
