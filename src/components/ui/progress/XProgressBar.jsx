import classNames from 'classnames';
import { useMemo } from 'react';
import './style.scss';
export function XProgressBar({
	className,
	value,
	buffer,
	trackColor,
	color,
	stripe,
	animation,
	indeterminate,
}) {
	const attrs = useMemo(() => ({
		role: 'progressbar',
		'aria-valuemin': 0,
		'aria-valuemax': 100,
		'aria-valuenow': indeterminate === true ? void 0 : value,
	}));
	const trackAttrs = useMemo(() => ({
		style: { width: buffer ? `${buffer}%` : '' },
	}));
	const valueAttrs = useMemo(() => ({
		style: { width: value ? `${value}%` : '' },
	}));
	return (
		<div
			{...attrs}
			className={classNames('x-progress-bar', className, {
				'x-progress-bar--stripe': stripe,
				'x-progress-bar--animation': animation,
			})}
		>
			<div {...trackAttrs} className="x-progress-bar__track"></div>
			<div {...valueAttrs} className="x-progress-bar__value"></div>
		</div>
	);
}
