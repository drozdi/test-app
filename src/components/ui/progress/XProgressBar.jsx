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
	stripe,
	animation,
	indeterminate,
	reverse,
}) {
	const attrs = useMemo(() => ({
		role: 'progressbar',
		'aria-valuemin': 0,
		'aria-valuemax': 100,
		'aria-valuenow': indeterminate === true ? void 0 : value,
	}));
	const trackAttrs = useMemo(() => ({
		style: { width: buffer && !indeterminate ? `${buffer}%` : '' },
	}));
	const valueAttrs = useMemo(() => ({
		style: { width: value && !indeterminate ? `${value}%` : '' },
	}));
	return (
		<div
			{...attrs}
			className={classNames('x-progress-bar', className, {
				'x-progress-bar--stripe': !indeterminate && stripe,
				'x-progress-bar--animation': !indeterminate && animation,
				'x-progress-bar--indeterminate': indeterminate,
				'x-progress-bar--reverse': reverse,
			})}
		>
			<div {...trackAttrs} className="x-progress-bar__track"></div>
			<div {...valueAttrs} className="x-progress-bar__value"></div>
			{children && <div className="x-progress-bar__label">{children}</div>}
		</div>
	);
}
