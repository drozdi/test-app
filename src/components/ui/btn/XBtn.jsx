import classNames from 'classnames';
import './XBtn.css';

import { XIcon } from '../icon';

// todo add icon support for iconRight
export function XBtn({
	children,
	size,
	className,
	icon,
	iconRight,
	disabled,
	flat,
	outline,
	rounded,
	block,
	square,
	tonal,
	text,
	color,
	textColor,
	...props
}) {
	const attrs = {
		type: 'button',
		...props,
		className: classNames(className, 'x-btn', {
			[`x-btn--${color}`]: !!color,
			[`x-btn--${size}`]: !!size,
			'x-btn--rounded': !!rounded,
			'x-btn--block': !!block,
			'x-btn--disabled': !!disabled,
			'x-btn--flat': !!flat,
			'x-btn--text': !!text,
			'x-btn--tonal': !!tonal,
			'x-btn--square': !!square,
			'x-btn--outline': !!outline,
			'x-btn--icon': !!icon,
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
			<XIcon>{icon}</XIcon>
			{children && <span className="x-btn__content">{children}</span>}
			<XIcon>{iconRight}</XIcon>
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
