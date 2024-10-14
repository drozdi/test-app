import classNames from 'classnames';
import './XBtn.scss';

import { useMemo } from 'react';
import { XIcon } from '../icon';

/** todo
 * flat - Removes button shadow
 * tonal - Background color is a lowered opacity of the current text color
 * outlined	- Applies a thin border with the current text color
 * text - Removes the background and removes shadow
 * plain - Removes the background and lowers the opacity until hovered
 */

// todo add icon support for iconRight
export function XBtn({
	children,
	className,
	flat = false,
	text = false,
	tonal = false,
	plain = false,
	outline = false,

	block = false,
	square = false,
	rounded = false,
	disabled = false,

	size,
	icon,
	iconRight,
	color,
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
		...props,
		className: classNames('x-btn', {
			'x-btn--flat': flat,
			'x-btn--text': text,
			'x-btn--tonal': tonal,
			'x-btn--plain': plain,
			'x-btn--outline': outline,
			'x-btn--block': block,
			'x-btn--square': square,
			'x-btn--rounded': rounded,
			'x-btn--disabled': disabled,

			[`x-btn--${color}`]: !!color,
			[`x-btn--${size}`]: !!size,
			'x-btn--icon': isIcon,
		}),
	};

	if (disabled) {
		attrs.disabled = true;
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
				<span className={classNames('x-btn__content', className)}>
					{children}
				</span>
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
