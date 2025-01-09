import classNames from 'classnames';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import { useBtn } from '../../../hooks/useBtn';
import { XIcon } from '../icon';
import { XBtnGroup } from './Group';
import './style.css';

import { forwardRefWithAs, render } from '../../../utils/render';

function XBtnFn(params = {}, ref) {
	//const ctx = useXBtnGroupContext();
	const props = { /*...ctx?.btnProps,*/ ...params };

	/*if (ctx) {
		props.onClick = (event, value) => {
			ctx.onChange?.(props.value);
			params.onClick?.(event, value);
		};
		props.active = ctx.isActive?.(props.value) || params.active;
		props.disabled = ctx.isDisabled?.(props.value) || params.disabled;
	}*/

	const { children, className, active, icon, iconRight, color, size, value } = props;

	const { isLink, attrs, TagProp } = useBtn({ ...props, ref });

	const isIcon = useMemo(
		() =>
			(!!icon != !!iconRight && !children) ||
			(children?.type === XIcon && !icon && !iconRight),
		[children, icon, iconRight],
	);

	return render({
		...props,
		...attrs,
		as: TagProp,
		className: classNames(
			'x-btn',
			{
				'x-btn--flat': props.flat,
				'x-btn--text': props.text,
				'x-btn--tonal': props.tonal,
				'x-btn--plain': props.plain,
				'x-btn--outline': props.outline,
				'x-btn--block': props.block,
				'x-btn--square': props.square,
				'x-btn--round': props.round,
				'x-btn--rounded': props.rounded,
				'x-btn--dimmed': props.dimmed,
				'x-btn--link': props.link,
				'x-btn--icon': isIcon,
				'x-btn--active': props.active,
				[`x-btn--${color}`]: color,
				[`x-btn--${size}`]: size,
			},
			className,
		),
		children: (
			<>
				<div className="x-btn-underlay"></div>
				<div className="x-btn-outline"></div>
				{icon && <XIcon className={!isIcon ? '-ml-2 mr-2' : ''}>{icon}</XIcon>}
				{children && <span className="x-btn-content">{children}</span>}
				{iconRight && (
					<XIcon className={!isIcon ? 'ml-2 -mr-2' : ''}>{iconRight}</XIcon>
				)}
			</>
		),
	});
}

const XBtnRoot = forwardRefWithAs(XBtnFn);

XBtnRoot.defaultProps = {
	LinkComponent: 'a',
	target: '_self',
};
XBtnRoot.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.string]),
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
	LinkComponent: PropTypes.any,
	target: PropTypes.string,
	to: PropTypes.any,
	href: PropTypes.any,
}; //*/

export const XBtn = memo(XBtnRoot);

XBtn.Group = XBtnGroup;
