import classNames from 'classnames';
import { useMemo } from 'react';
import './style.scss';
export function XProgressBar({
	children,
	className,
	value,
	buffer,
	trackColor,
	color,
	label,
	stripe,
	animation,
	indeterminate,
	reverse,
	...props
}) {
	const attrs = useMemo(() => ({
		role: 'progressbar',
		'aria-valuemin': 0,
		'aria-valuemax': 100,
		'aria-valuenow': indeterminate === true ? void 0 : value,
	}));
	const trackAttrs = useMemo(
		() => ({
			style: { width: buffer && !indeterminate ? `${buffer}%` : '' },
		}),
		[buffer, indeterminate],
	);
	const valueAttrs = useMemo(
		() => ({
			style: { width: value && !indeterminate ? `${value}%` : '' },
		}),
		[value, indeterminate],
	);

	return (
		<div
			{...props}
			{...attrs}
			className={classNames('x-progress-bar', className, {
				'x-progress-bar--stripe': !indeterminate && stripe,
				'x-progress-bar--animation': !indeterminate && animation,
				'x-progress-bar--indeterminate': indeterminate,
				'x-progress-bar--reverse': reverse,
				[`x-progress-bar--${color}`]: color,
			})}
		>
			<div {...trackAttrs} className="x-progress-bar__track"></div>
			<div {...valueAttrs} className="x-progress-bar__value"></div>
			{!indeterminate && children && (
				<div className="x-progress-bar__label">{children}</div>
			)}
			{!indeterminate && !children && label && (
				<div className="x-progress-bar__label">{value}%</div>
			)}
		</div>
	);
}
