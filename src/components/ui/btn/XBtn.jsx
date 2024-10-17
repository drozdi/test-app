import classNames from 'classnames';
import './XBtn.scss';

import { memo, useMemo } from 'react';
import { useBtn } from '../../../hooks/useBtn';
import { XIcon } from '../icon';
let i = 0;
export const XBtn = memo(function XBtn(parametrs = {}) {
	const {
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
	} = parametrs;

	console.log(i++);

	const isIcon = useMemo(
		() =>
			(!!icon != !!iconRight && !children) ||
			(children?.type === XIcon && !icon && !iconRight),
		[children, icon, iconRight],
	);
	const attrs = {
		...useBtn(parametrs),
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
			'x-btn--disabled': disabled,
			'x-btn--icon': isIcon,
			[`x-btn--${color}`]: color,
			[`x-btn--${size}`]: size,
		}),
	};

	return (
		<button {...attrs} onClick={(e) => console.log(e)}>
			<div className="x-btn-outline"></div>
			<div className="x-btn-backdor"></div>
			{icon && <XIcon className={!isIcon && '-ml-2 mr-2'}>{icon}</XIcon>}
			{children && (
				<span className={classNames('x-btn-content', className)}>{children}</span>
			)}
			{iconRight && <XIcon className={!isIcon && 'ml-2 -mr-2'}>{iconRight}</XIcon>}
		</button>
	);
});

/*XBtn.defaultProps = {
	children: null,
	className: null,
	dimmed: false,
	flat: false,
	text: false,
	tonal: false,
	plain: false,
	outline: false,

	round: false,
	block: false,
	square: false,
	rounded: false,
	disabled: false,
	icon: '',
	iconRight: '',
	color: '',
	size: '',
	onClick: () => {},
};
XBtn.propTypes = {
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

	icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	iconRight: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	size: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	onClick: PropTypes.func, 
};*/
