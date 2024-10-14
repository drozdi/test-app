import classNames from 'classnames';
import './XBtn.scss';

import { useMemo } from 'react';
import { XIcon } from '../icon';

export function XBtn({
	children,
	className,
	dimmed = false,
	flat = false,
	text = false,
	tonal = false,
	plain = false,
	outline = false,

	round = false,
	block = false,
	square = false,
	rounded = false,
	disabled = false,

	icon,
	iconRight,
	color,
	size,
	...props
}) {
	const isIcon = useMemo(
		() =>
			(!!icon != !!iconRight && !children) ||
			(children?.type === XIcon && !icon && !iconRight),
		[children, icon, iconRight],
	);
	const attrs = {
		type: 'button',
		tabindex: 0,
		...props,
		className: classNames('x-btn', {
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
			'x-btn--icon': isIcon,
			[`x-btn--${color}`]: color,
			[`x-btn--${size}`]: size,
		}),
	};

	if (disabled) {
		attrs.disabled = true;
		attrs.tabindex = -1;
		attrs['aria-disabled'] = 'true';
	}
	if (props.href === void 0) {
		attrs.role = 'button';
	}

	return (
		<button {...attrs}>
			<div className="x-btn-outline"></div>
			<div className="x-btn-backdor"></div>
			{icon && <XIcon className={!isIcon && '-ml-2 mr-2'}>{icon}</XIcon>}
			{children && (
				<span className={classNames('x-btn-content', className)}>{children}</span>
			)}
			{iconRight && <XIcon className={!isIcon && 'ml-2 -mr-2'}>{iconRight}</XIcon>}
		</button>
	);
}

/*XBtn.defaultProps = {
    icon: null,
    iconRight: null,
    flat: false,
    tonal: false,
    text: false,
    square: false,
    outline: false,
    rounded: false,
    disabled: false,
    block: false,
    type: 'button',
    color: '',
    textColor: '',
    onClick: () => {}
};
/*XBtn.propTypes = {
    icon: PropTypes.string,
    iconRight: PropTypes.string,
    flat: PropTypes.bool,
    tonal: PropTypes.bool,
    text: PropTypes.bool,
    square: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    type: PropTypes.string,
    color: PropTypes.string,
    textColor: PropTypes.string,
    onClick: PropTypes.func
}//*/
